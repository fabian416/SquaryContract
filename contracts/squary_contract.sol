// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Squary {
  IERC20 public immutable usdcToken;

  // Struct to represent a group, including its Gnosis Safe, members, and individual balances.
  struct Group {
    address gnosisSafe; // The Gnosis Safe associated with the group.
    address[] members; // List of member addresses in the group.
    mapping(address => int256) balances; // Mapping to track each member's balance.
  }

  // Struct for representing a debt between two members.
  struct Debt {
    address debtor; // Address of the member who owes money.
    address creditor; // Address of the member who is owed money.
    uint256 amount; // Amount of debt.
  }

  // Mapping from a Gnosis Safe address to the corresponding group.
  mapping(address => Group) public groups;

  // Events to log various actions within the contract.
  event GroupCreated(address indexed gnosisSafe, address[] members);
  event DepositMade(
    address indexed gnosisSafe,
    address indexed member,
    uint256 amount
  );
  event WithdrawalMade(
    address indexed gnosisSafe,
    address indexed member,
    uint256 amount
  );
  event SettleCompleted(
    address indexed gnosisSafe,
    address indexed debtor,
    address indexed creditor,
    uint256 amount
  );

  // Modifier to ensure that only the associated Gnosis Safe can call certain functions.
  modifier onlyGnosisSafe(address gnosisSafe) {
    require(
      msg.sender == gnosisSafe,
      'Only Gnosis Safe can call this function'
    );
    _;
  }

  // Modifier to check if the caller is a member of the group.
  modifier onlyMember(address gnosisSafe) {
    require(
      isMember(gnosisSafe, msg.sender),
      'Only group member can perform this action'
    );
    _;
  }

  // Constructor to set the token used for transactions.
  constructor(address _usdcTokenAddress) {
    usdcToken = IERC20(_usdcTokenAddress);
  }

  // Function to create a new group with a Gnosis Safe and members.
  function createGroup(
    address _gnosisSafe,
    address[] memory _members
  ) external {
    require(
      groups[_gnosisSafe].gnosisSafe == address(0),
      'Group already exists'
    );

    Group storage group = groups[_gnosisSafe];
    group.gnosisSafe = _gnosisSafe;
    group.members = _members;

    emit GroupCreated(_gnosisSafe, _members);
  }

  // Allows a member to deposit funds into their group balance.
  function depositFunds(
    address gnosisSafe,
    uint256 amount
  ) external onlyMember(gnosisSafe) {
    require(amount > 0, 'You need to deposit some funds');
    require(
      usdcToken.transferFrom(msg.sender, address(this), amount),
      'Token transfer failed'
    );
    // Here we assume that the amount deposited exceeds any debt of the member.
    // and update the member's credit balance if it exceeds it
    int256 memberDebt = -groups[gnosisSafe].balances[msg.sender];
    int256 depositAmount = int256(amount);

    if (depositAmount > memberDebt) {
      //  If the member had debt, their credit is paid and updated
      groups[gnosisSafe].balances[msg.sender] = depositAmount - memberDebt;
    } else {
      // If not only reduces the debt
      groups[gnosisSafe].balances[msg.sender] += depositAmount;
    }
    emit DepositMade(gnosisSafe, msg.sender, amount);
  }

  // Allows a member to withdraw funds from their group balance.
  function withdrawFunds(
    address gnosisSafe,
    uint256 amount
  ) external onlyMember(gnosisSafe) {
    require(
      groups[gnosisSafe].balances[msg.sender] >= int256(amount),
      'Insufficient funds to withdraw'
    );
    require(usdcToken.transfer(msg.sender, amount), 'USDC transfer failed');
    groups[gnosisSafe].balances[msg.sender] -= int256(amount);
    emit WithdrawalMade(gnosisSafe, msg.sender, amount);
  }

  // Function to settle debts within the group. Only callable by the group's Gnosis Safe.
  function settleGroup(
    address gnosisSafe,
    Debt[] calldata simplifiedDebts
  ) external onlyGnosisSafe(gnosisSafe) {
    for (uint256 i = 0; i < simplifiedDebts.length; i++) {
      Debt memory debt = simplifiedDebts[i];
      groups[gnosisSafe].balances[debt.debtor] -= int256(debt.amount);
      groups[gnosisSafe].balances[debt.creditor] += int256(debt.amount);
      emit SettleCompleted(gnosisSafe, debt.debtor, debt.creditor, debt.amount);
    }
  }

  // Internal function to check if an address is a member of a given group.
  function isMember(
    address gnosisSafe,
    address member
  ) internal view returns (bool) {
    for (uint256 i = 0; i < groups[gnosisSafe].members.length; i++) {
      if (groups[gnosisSafe].members[i] == member) {
        return true;
      }
    }
    return false;
  }

  function getGroupDetails(
    address gnosisSafe
  ) public view returns (address[] memory members) {
    Group storage group = groups[gnosisSafe];
    return (group.members);
  }

  // Public function to get the balance of a member in a group
  function getMemberBalance(
    address gnosisSafe,
    address member
  ) public view returns (int256) {
    return groups[gnosisSafe].balances[member];
  }
}

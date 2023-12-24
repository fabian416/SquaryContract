"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Configura el proveedor y las direcciones
const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const squaryAddress = '0xe499dd05FeFeE4aAFd30437171A67b90de2c350D'; // Dirección de tu contrato Squary
// Función para verificar si el asentamiento se completó exitosamente
async function checkSettlementCompletion() {
    // Crea un filtro para eventos 'SettleCompleted' emitidos por tu contrato Squary
    const filterSettleCompleted = {
        address: squaryAddress,
        topics: [
            ethers_1.ethers.utils.id("SettleCompleted(address)"),
            null // Puedes filtrar por la dirección específica de Gnosis Safe si lo deseas
        ]
    };
    // Obtén los eventos 'SettleCompleted'
    const settleCompletedEvents = await provider.getLogs(filterSettleCompleted);
    // Verifica si hay algún evento que corresponda a tu transacción de asentamiento
    if (settleCompletedEvents.length > 0) {
        console.log("Asentamiento completado exitosamente.");
        // Aquí puedes procesar los eventos según sea necesario
    }
    else {
        console.log("No se encontró un evento de asentamiento completado.");
    }
}
checkSettlementCompletion().catch(console.error);
//# sourceMappingURL=check_settle.js.map
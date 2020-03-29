"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_worker_register_1 = require("./lib/electron-worker-register");
exports.electronWorkers = [];
var electron_worker_register_2 = require("./lib/electron-worker-register");
exports.ThreadRegister = electron_worker_register_2.ThreadRegister;
var electron_worker_service_1 = require("./lib/electron-worker-service");
exports.ElectronWorkerService = electron_worker_service_1.ElectronWorkerService;
var electron_worker_1 = require("./lib/electron-worker");
exports.ElectronWorker = electron_worker_1.ElectronWorker;
if (electron_1.app) {
    electron_1.app.on('ready', () => {
        electron_worker_register_1.ThreadRegister.register();
    });
}
if (electron_1.ipcRenderer) {
    electron_1.ipcRenderer.on('worker:console.log', (e, args) => {
        console.log(args);
    });
    electron_1.ipcRenderer.on('worker:console.error', (e, args) => {
        console.error(args);
    });
}
//# sourceMappingURL=index.js.map
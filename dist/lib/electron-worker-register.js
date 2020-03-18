"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const index_1 = require("../index");
const electron_worker_service_1 = require("./electron-worker-service");
class ThreadRegister {
    static register() {
        electron_1.ipcMain.handle('electron-worker:register', (event, options) => {
            let electronWorker = new electron_worker_service_1.ElectronWorkerService(options);
            index_1.electronWorkers.push(electronWorker);
            return electronWorker.channel;
        });
    }
}
exports.ThreadRegister = ThreadRegister;
//# sourceMappingURL=electron-worker-register.js.map
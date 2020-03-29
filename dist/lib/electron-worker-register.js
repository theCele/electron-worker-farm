"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const index_1 = require("../index");
const electron_worker_service_1 = require("./electron-worker-service");
const child_process = require("child_process");
child_process.fork('', []);
class ThreadRegister {
    static register() {
        if (electron_1.ipcMain) {
            electron_1.ipcMain.handle('electron-worker:register', (event, options) => {
                var _a;
                // set child console listener
                if (!options.farmOptions) {
                    options.farmOptions = {};
                }
                ;
                //if (!options.farmOptions.workerOptions) { options.farmOptions.workerOptions = {} }
                (_a = options.farmOptions.workerOptions) === null || _a === void 0 ? void 0 : _a.stdio;
                options.farmOptions.workerOptions = {
                    stdio: 'pipe'
                };
                options.farmOptions.onChild = (child) => {
                    child.stdout.on('data', (e) => {
                        event.sender.send('worker:console.log', e.toString());
                    });
                    child.stderr.on('data', (e) => {
                        event.sender.send('worker:console.error', e.toString());
                    });
                    // child.on('message', (args) => {
                    //     event.sender.send('worker:console', args);
                    // });
                };
                let electronWorker = new electron_worker_service_1.ElectronWorkerService(options);
                index_1.electronWorkers.push(electronWorker);
                return electronWorker.channel;
            });
        }
    }
}
exports.ThreadRegister = ThreadRegister;
//# sourceMappingURL=electron-worker-register.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class ElectronWorker {
    constructor(options) {
        this.options = options;
    }
    run(options) {
        return new Promise((resolve, reject) => {
            if (electron_1.ipcRenderer) {
                electron_1.ipcRenderer.invoke('electron-worker:register', this.options)
                    .then((channel) => {
                    this.channel = channel;
                    electron_1.ipcRenderer.invoke(`${channel}:work`, options)
                        .then((result) => {
                        resolve(result);
                    })
                        .catch(err => reject(err));
                })
                    .catch(err => reject(err));
            }
            else {
                resolve();
            }
        });
    }
    end() {
        return new Promise(resolve => {
            if (electron_1.ipcRenderer) {
                electron_1.ipcRenderer.invoke(`${this.channel}:end`)
                    .then(() => {
                    resolve();
                })
                    .catch(() => {
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    }
}
exports.ElectronWorker = ElectronWorker;
//# sourceMappingURL=electron-worker.js.map
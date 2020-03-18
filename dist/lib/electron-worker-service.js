"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workerFarm = require("worker-farm");
const electron_1 = require("electron");
class ElectronWorkerService {
    constructor(options) {
        this.id = ((Date.now() * Math.random()) / Math.random()) * Math.random();
        this.options = options;
        this.channel = `${options.module}:${this.id}`;
        this.handle();
    }
    get workers() {
        if (!this._workers) {
            if (this.options.farmOptions) {
                this._workers = workerFarm(this.options.farmOptions, this.options.module, this.options.methods);
            }
            else {
                this._workers = workerFarm(this.options.module, this.options.methods);
            }
        }
        return this._workers;
    }
    handle() {
        electron_1.ipcMain.handle(`${this.channel}:work`, async (_event, runOptions) => {
            this.runOptions = runOptions;
            return this.work(this.runOptions);
        });
        electron_1.ipcMain.handleOnce(`${this.channel}:end`, async () => {
            workerFarm.end(this.workers);
            electron_1.ipcMain.removeHandler(`${this.channel}:work`);
            return true;
        });
    }
    async work(input) {
        return new Promise((resolve, reject) => {
            if (!input.parameters) {
                this.workers[input.method]((err, outp) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(outp);
                    }
                });
            }
            else if (input.parameters.length === 0) {
                this.workers[input.method]((err, outp) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(outp);
                    }
                });
            }
            else if (input.parameters.length === 1) {
                this.workers[input.method](input.parameters[0], (err, outp) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(outp);
                    }
                });
            }
            else if (input.parameters.length === 2) {
                this.workers[input.method](input.parameters[0], input.parameters[1], (err, outp) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(outp);
                    }
                });
            }
            else if (input.parameters.length === 3) {
                this.workers[input.method](input.parameters[0], input.parameters[1], input.parameters[2], (err, outp) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(outp);
                    }
                });
            }
            else if (input.parameters.length === 4) {
                this.workers[input.method](input.parameters[0], input.parameters[1], input.parameters[2], input.parameters[2], (err, outp) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(outp);
                    }
                });
            }
            else {
                reject(new Error('Invalid nuber of parameters'));
            }
        });
    }
}
exports.ElectronWorkerService = ElectronWorkerService;
//# sourceMappingURL=electron-worker-service.js.map
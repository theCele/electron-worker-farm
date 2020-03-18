import * as workerFarm from 'worker-farm';
import { ipcMain } from 'electron';
import { IWorkerLaunchOptions, IWorkerRunOptions } from './ielectron-worker-options';

export class ElectronWorkerService {
    public id: number;
    private options: IWorkerLaunchOptions;
    private runOptions: IWorkerRunOptions;
    public channel: string;
    private _workers: workerFarm.Workers;
    public get workers() : workerFarm.Workers {
        if (!this._workers) {
            if (this.options.farmOptions) {
                this._workers = workerFarm(this.options.farmOptions, this.options.module, this.options.methods); 
            } else {
                this._workers = workerFarm(this.options.module, this.options.methods); 
            }
        }
        return this._workers;
    }
    
    constructor(options: IWorkerLaunchOptions) {
        this.id = ((Date.now() * Math.random()) / Math.random()) * Math.random();
        this.options = options;
        this.channel = `${options.module}:${this.id}`;
        this.handle();
    }

    handle() {
        ipcMain.handle(`${this.channel}:work`, async (_event, runOptions: IWorkerRunOptions): Promise<any> => {
            this.runOptions = runOptions;
            return this.work(this.runOptions);
        });
        ipcMain.handleOnce(`${this.channel}:end`, async () => {
            workerFarm.end(this.workers);
            ipcMain.removeHandler(`${this.channel}:work`);
            return true;
        });
    }

    async work(input: IWorkerRunOptions): Promise<any> {
        return new Promise( (resolve, reject) => {
            if (!input.parameters) {
                this.workers[input.method]((err: any, outp: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(outp);
                    }
                });
            } else if (input.parameters.length === 0) {
                this.workers[input.method]((err: any, outp: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(outp);
                    }
                });
            } else if (input.parameters.length === 1) {
                this.workers[input.method](input.parameters[0], (err: any, outp: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(outp);
                    }
                });
            } else if (input.parameters.length === 2) {
                this.workers[input.method](input.parameters[0], input.parameters[1], (err: any, outp: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(outp);
                    }
                });
            } else if (input.parameters.length === 3) {
                this.workers[input.method](input.parameters[0], input.parameters[1], input.parameters[2], (err: any, outp: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(outp);
                    }
                });
            } else if (input.parameters.length === 4) {
                this.workers[input.method](input.parameters[0], input.parameters[1], input.parameters[2], input.parameters[2], (err: any, outp: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(outp);
                    }
                });
            } else {
                reject(new Error('Invalid nuber of parameters'));
            }
        });
    }
}
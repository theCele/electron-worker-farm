import { ipcRenderer } from 'electron';
import { IWorkerLaunchOptions, IWorkerRunOptions } from './ielectron-worker-options';

export class ElectronWorker {
    private options: IWorkerLaunchOptions;
    private channel: string;
    constructor(options: IWorkerLaunchOptions) {
        this.options = options;
    }

    run<T>(options: IWorkerRunOptions): Promise<T> {
        return new Promise((resolve, reject) => {
            if (ipcRenderer) {
                ipcRenderer.invoke('electron-worker:register', this.options)
                .then((channel: string) => {
                    this.channel = channel;
                    ipcRenderer.invoke(`${channel}:work`, options)
                    .then((result: T) => {
                        resolve(result);
                    })
                    .catch(err => reject(err));
                })
                .catch(err => reject(err));
            } else {
                resolve();
            }
        });
    }

    end(): Promise<void> {
        return new Promise(resolve => {
            if (ipcRenderer) {
                ipcRenderer.invoke(`${this.channel}:end`)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
}
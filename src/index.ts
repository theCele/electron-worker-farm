import { app, ipcRenderer } from 'electron';
import { ElectronWorkerService } from "./lib/electron-worker-service";
import { ThreadRegister } from "./lib/electron-worker-register";

export let electronWorkers: ElectronWorkerService[] = [];
export { ThreadRegister } from './lib/electron-worker-register';
export { ElectronWorkerService } from './lib/electron-worker-service';
export { IWorkerLaunchOptions, IWorkerRunOptions } from './lib/ielectron-worker-options';
export { ElectronWorker } from './lib/electron-worker';

if (app) {
    app.on('ready', () => {
        ThreadRegister.register();
    });
}

if (ipcRenderer) {
    ipcRenderer.on('worker:console.log', (e, args) => {
        console.log(args)
    });
    ipcRenderer.on('worker:console.error', (e, args) => {
        console.error(args)
    });
}
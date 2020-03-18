import { app } from 'electron';
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
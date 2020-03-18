import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { electronWorkers } from '../index';
import { ElectronWorkerService } from './electron-worker-service';
import { IWorkerLaunchOptions } from './ielectron-worker-options';

export class ThreadRegister {
    static register(): void {
        if (ipcMain) {
            ipcMain.handle('electron-worker:register', (event: IpcMainInvokeEvent, options: IWorkerLaunchOptions) => {
                let electronWorker = new ElectronWorkerService(options);
                electronWorkers.push(electronWorker);
                return electronWorker.channel;
            });
        }
    }
}
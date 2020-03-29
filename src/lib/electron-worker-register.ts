import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { electronWorkers } from '../index';
import { ElectronWorkerService } from './electron-worker-service';
import { IWorkerLaunchOptions } from './ielectron-worker-options';

import * as child_process from 'child_process';
import { ForkOptions } from 'child_process';

child_process.fork('', [], )

export class ThreadRegister {
    static register(): void {
        if (ipcMain) {
            ipcMain.handle('electron-worker:register', (event: IpcMainInvokeEvent, options: IWorkerLaunchOptions) => {
                if (!options.farmOptions) { options.farmOptions = {} };

                // set stdio to pipe
                if (options.farmOptions.workerOptions) {
                    options.farmOptions.workerOptions.stdio = 'pipe';
                } else {
                    options.farmOptions.workerOptions = {
                        stdio: 'pipe'
                    } as ForkOptions 
                }

                // send stdio data to caller window
                (options.farmOptions as any).onChild = (child: NodeJS.Process) => {
                    child.stdout.on('data', (e: Buffer) => {
                        event.sender.send('worker:console.log', e.toString());
                    });
                    child.stderr.on('data', (e: Buffer) => {
                        event.sender.send('worker:console.error', e.toString());
                    });
                }
                
                // create worker
                let electronWorker = new ElectronWorkerService(options);
                electronWorkers.push(electronWorker);
                return electronWorker.channel;
            });
        }
    }
}
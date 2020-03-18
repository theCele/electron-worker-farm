import * as workerFarm from 'worker-farm';
import { IWorkerLaunchOptions, IWorkerRunOptions } from './ielectron-worker-options';
export declare class ElectronWorkerService {
    id: number;
    private options;
    private runOptions;
    channel: string;
    private _workers;
    get workers(): workerFarm.Workers;
    constructor(options: IWorkerLaunchOptions);
    handle(): void;
    work(input: IWorkerRunOptions): Promise<any>;
}

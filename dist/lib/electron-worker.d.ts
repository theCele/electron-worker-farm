import { IWorkerLaunchOptions, IWorkerRunOptions } from './ielectron-worker-options';
export declare class ElectronWorker {
    private options;
    private channel;
    constructor(options: IWorkerLaunchOptions);
    run<T>(options: IWorkerRunOptions): Promise<T>;
    end(): Promise<void>;
}

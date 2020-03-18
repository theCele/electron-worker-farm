import { FarmOptions } from "worker-farm";

export interface IWorkerRunOptions {
    method: string;
    parameters?: any [];
}

export interface IWorkerLaunchOptions {
    module: string;
    methods: string[];
    farmOptions?: FarmOptions;
}
import { execSync } from 'child_process';

export function getProcessId(inp: string, inp2: number, callback: Function) {
    callback(null, `${inp}${inp2} BAR (${process.pid})`);
}

export function getSystemInfo(callback: Function) {
    let result = execSync('systeminfo').toString();
    callback(null, result);
}
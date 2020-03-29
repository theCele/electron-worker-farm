import { execSync } from 'child_process';

export function getProcessId(inp: string, inp2: number, callback: Function) {
    if (process.send) { process.send('hello from the other side') };
    console.log('function name: '+'getProcessId');
    console.error(new Error('wronnggg'));
    callback(null, `${inp}${inp2} BAR (${process.pid})`);
}

export function getSystemInfo(callback: Function) {
    console.log('function name: '+'getSystemInfo');
    let result = execSync('systeminfo').toString();
    callback(null, result);
}
// VERY IMPORTANT
// The console output is used in the teminal not in the parent window browser console
// Make sure that the all code called here do not use any of the Electron API nor an Electorn mpdule is iported

import { execSync } from 'child_process';

export function getProcessId(inp: string, inp2: number, callback: Function) {
    if (process.send) { process.send('hello from the other side') };
    callback(null, `${inp}${inp2} BAR (${process.pid})`);
}

export function getSystemInfo(callback: Function) {
    let result = execSync('systeminfo').toString();
    callback(null, result);
}
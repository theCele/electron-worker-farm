"use strict";
// VERY IMPORTANT
// The console output is used in the teminal not in the parent window browser console
// Make sure that the all code called here do not use any of the Electron API nor an Electorn mpdule is iported
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function getProcessId(inp, inp2, callback) {
    if (process.send) {
        process.send('hello from the other side');
    }
    ;
    callback(null, `${inp}${inp2} BAR (${process.pid})`);
}
exports.getProcessId = getProcessId;
function getSystemInfo(callback) {
    let result = child_process_1.execSync('systeminfo').toString();
    callback(null, result);
}
exports.getSystemInfo = getSystemInfo;
//# sourceMappingURL=renderer.worker.js.map
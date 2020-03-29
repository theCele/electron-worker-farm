"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function getProcessId(inp, inp2, callback) {
    if (process.send) {
        process.send('hello from the other side');
    }
    ;
    console.log('function name: ' + 'getProcessId');
    console.error(new Error('wronnggg'));
    callback(null, `${inp}${inp2} BAR (${process.pid})`);
}
exports.getProcessId = getProcessId;
function getSystemInfo(callback) {
    console.log('function name: ' + 'getSystemInfo');
    let result = child_process_1.execSync('systeminfo').toString();
    callback(null, result);
}
exports.getSystemInfo = getSystemInfo;
//# sourceMappingURL=renderer.worker.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const workerFarm = require("./index");
let workers = workerFarm(require.resolve('./renderer.worker'), ['getProcessId', 'getSystemInfo']);
let ret = 0;
for (var i = 0; i < 10; i++) {
    workers.getProcessId('#', i, function (err, outp) {
        console.log(outp);
        if (++ret == 10)
            workerFarm.end(workers);
    });
}
//# sourceMappingURL=renderer.js.map
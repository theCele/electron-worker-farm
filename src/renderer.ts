// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import * as workerFarm from './index';
let workers = workerFarm(require.resolve('./renderer.worker'), ['getProcessId', 'getSystemInfo']);
let ret = 0;

let start = new Date();
console.log(start.getMilliseconds());
for (var i = 0; i < 50; i++) {
    workers.getProcessId('#', i, function (err: any, outp: any) {
      console.log(outp)
      if (++ret == 10) {
        workerFarm.end(workers);
        console.log((new Date).getMilliseconds());
      }
    })
  }


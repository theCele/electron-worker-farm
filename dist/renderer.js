"use strict";
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
Object.defineProperty(exports, "__esModule", { value: true });
const electron_worker_1 = require("./lib/electron-worker");
let electronWorker = new electron_worker_1.ElectronWorker({
    module: require.resolve('./renderer.worker'),
    methods: ['getProcessId', 'getSystemInfo']
});
let test = async () => {
    return new Promise((resolve, reject) => {
        let promises = [];
        for (var i = 0; i < 10; i++) {
            let r = electronWorker.run({
                method: 'getProcessId',
                parameters: ['#', i + 1]
            });
            promises.push(r);
        }
        console.log(promises);
        Promise.all(promises)
            .then(r => resolve(r))
            .catch(e => reject(e));
    });
};
test()
    .then((e) => {
    electronWorker.end()
        .then(() => console.log(e))
        .catch(err => console.log(err));
})
    .catch(err => console.log(err));
//# sourceMappingURL=renderer.js.map
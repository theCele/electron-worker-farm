# Electron wrapper for Worker Farm

**Create Electron workers using the awesome [Worker Farm](https://www.npmjs.com/package/worker-farm)**

Note: this package allows you to use multithreading in Electron. This type of multithreading allows you to use [NODE JS API](https://nodejs.org/docs/latest/api/). However none of Electron's built-in modules can be used in a multi-threaded environment.

## Install

```bash
npm install --save electron-worker-farm
```

In you Electron start file (main.js) import
```bash
import 'electron-worker-farm';
```

## Example

In you Electron start file (main.js) import
```bash
import 'electron-worker-farm';
```

Given a file in renderer, child.worker.js:

```bash
import { execSync } from 'child_process';

export function getProcessId(inp: string, inp2: number, callback: Function) {
    callback(null, `${inp}${inp2} BAR (${process.pid})`);
}

export function getSystemInfo(callback: Function) {
    let result = execSync('systeminfo').toString();
    callback(null, result);
}
```

And a renderer file where we call:

```bash
# Import the ElectronWorker class
import { ElectronWorker } from "./lib/electron-worker";

# initialise using your relative path to child.worker.js and resolve the path with require.resolve()
let electronWorker = new ElectronWorker({
    module: require.resolve('./renderer.worker'),
    methods: ['getProcessId', 'getSystemInfo']
});

let test = async () => {
    return new Promise((resolve, reject) => {
        let promises = [];
        for (var i = 0; i < 100; i++) {
            let r = electronThread.run({
                method: 'getProcessId',
                parameters: ['#', i + 1] # maximum nuber of parameters is 0 - 4
            });
            promises.push(r);
        }
        console.log(promises);
        Promise.all(promises)
        .then(r => resolve(r))
        .catch(e => reject(e));
    })
}

test()
.then((e) => { electronThread.end(); console.log(e); })
.catch(err => console.log(err));
```

We'll get an output something like the following:

```bash
"#:1 13560"
"#:2 21980"
"#:3 21868"
"#:4 22712"
"#:5 2476"
"#:6 15936"
"#:7 19140"
"#:8 14928"
"#:9 12992"
"#:10 22132"
```

## API

The module classe ElectronWorker has two methods run(options) and end()

Class ElectronWorker
```bash
let thread = new ElectronWorker({
    module: require.resolve('relative path to the child thread')
    methods: ['getProcessId', 'getSystemInfo']
})
```

ElectronWorker.run<<T>>(options) : Promise<<T>>. It launches the method and returns a promise
```bash
let options = {
    method: 'someMethod', //method name from the exported from child thread
    parameters: ['#', i + 1] // method parameters from 0 - 4
}
thread.run(options)
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
ElectronWorker.end() : Promise<<void>>. It ends all active processes

**For more information please have a look at [Worker Farm](https://www.npmjs.com/package/worker-farm)**

### Inspiration

- [worker-farm](https://www.npmjs.com/package/worker-farm) - Worker Farm
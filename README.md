# Electron wrapper for Worker Farm

**Create Electron workers using the awesome [Worker Farm](https://www.npmjs.com/package/worker-farm)**
**Worker Farm Version 1.7.0**

Note: this package allows you to use multithreading in Electron. This type of multithreading allows you to use [NODE JS API](https://nodejs.org/docs/latest/api/). However none of Electron's built-in modules can be used in a multi-threaded environment. So it is **very important** in the child file you should **never import** any of the Electron modules.

## Install

```bash
npm install --save electron-worker-farm
```

## Example [Worker Farm Exaple](https://www.npmjs.com/package/worker-farm#example)

## API [Worker Farm API](https://www.npmjs.com/package/worker-farm#api)

### Related 

- [Electron Thread](https://www.npmjs.com/package/electron-thread)
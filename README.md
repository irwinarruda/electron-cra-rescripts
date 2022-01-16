# Electron with CRA
This repository contains the implementation of electron to a Create React App project.

### Why CRA
I wanted to check if electron would integrate well with React. Having the full control of the project with webpack, the integration would happen one way or another, but with the CRA boilerplate, it was unclear if it was possible to use electron and React...

### Technologies
For this project, beyond the normal "electron", "electron-builder" and "electron-is-dev", I used the following libs:
- [Concurrently](https://www.npmjs.com/package/concurrently): a lib that enables running more than one command in one npm script. 
- [Wait-On](https://www.npmjs.com/package/wait-on): a lib that waits for the right CRA port before running electron. This is usefull because in development mode, React is served normally to the 3000 port and electron uses `loadURL` to listen that url. So before electron starts, we have to make sure that React was served properly.
- [Rescripts](https://github.com/harrysolovay/rescripts): a lib that helps us create custom webpack config withou ejecting the CRA project. Rescripts was used so that I could import electron normally into a component with `import electrom from 'electron'` instead of doing `const electron = window.require('electron')`.  
To learn React, check out the [React documentation](https://reactjs.org/).

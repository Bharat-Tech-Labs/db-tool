'use strict'
// require('update-electron-app')()
import { autoUpdater } from "electron-updater"
import { app, protocol, BrowserWindow, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path';
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload:(process.platform === "win32") ? path.join(__dirname,'\\preload.js') :path.join(__dirname, '/preload.js'),
      nodeIntegration:true
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: (process.env
      //     .ELECTRON_NODE_INTEGRATION as unknown) as boolean
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    console.log(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
  autoUpdater.checkForUpdates()
})

// autoUpdater.on('checking-for-update', () => {
//   const dialogOpts = {
//     type: 'info',
//     buttons: ['Ok'],
//     title: 'Application Update',
//     message: 'Checking for updates',
//     }

//   dialog.showMessageBox(dialogOpts);
//   })
  // autoUpdater.on('update-available', (info) => {
  //   const dialogOpts = {
  //     type: 'info',
  //     buttons: ['Ok'],
  //     title: 'Application Update',
  //     message: 'Update Available',
  //     }
  
  //   dialog.showMessageBox(dialogOpts);
  // })
  // autoUpdater.on('update-not-available', (info) => {
  //   const dialogOpts = {
  //     type: 'info',
  //     buttons: ['Ok'],
  //     title: 'Application Update',
  //     message: 'Update not Available',
  //     }
  
  //   dialog.showMessageBox(dialogOpts);
  // })
  // autoUpdater.on('error', (err) => {
  //   const dialogOpts = {
  //     type: 'info',
  //     buttons: ['Ok'],
  //     title: 'Application Update',
  //     message: 'Error',
  //     }
  
  //   dialog.showMessageBox(dialogOpts);
  // })
  // autoUpdater.on('download-progress', (progressObj) => {
  //   const dialogOpts = {
  //     type: 'info',
  //     buttons: ['Ok'],
  //     title: 'Application Update',
  //     message: 'Download in Progress',
  //     }
  
  //   dialog.showMessageBox(dialogOpts);
  // })
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

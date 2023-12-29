import {app, BrowserWindow, Menu, ipcMain} from 'electron';
import {join, resolve} from 'node:path';

// Import custom function
import menuFunctionHandle from './menuFunctionHandle';
import { menuFunctions } from './mainMenuBar';
import { writeFileSync } from 'node:original-fs';
import saveFile from './saveFile';

async function createWindow() {
  const mainWindow = new BrowserWindow({
    show: false, // Use the 'ready-to-show' event to show the instantiated BrowserWindow.
    vibrancy: 'under-window',
    visualEffectState: 'active',
    icon: join(app.getAppPath(), 'buildResources/icon1024x1024.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(app.getAppPath(), 'packages/preload/dist/index.cjs'),
    },
  });
  /**
   * If the 'show' property of the BrowserWindow's constructor is omitted from the initialization options,
   * it then defaults to 'true'. This can cause flickering as the window loads the html content,
   * and it also has show problematic behaviour with the closing of the window.
   * Use `show: false` and listen to the  `ready-to-show` event to show the window.
   *
   * @see https://github.com/electron/electron/issues/25012 for the afford mentioned issue.
   */
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show();

    if (import.meta.env.DEV) {
      mainWindow?.webContents.openDevTools();
    }
  });

  /**
   * Load the main page of the main window.
   */
  if (import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined) {
    /**
     * Load from the Vite dev server for development.
     */
    await mainWindow.loadURL(import.meta.env.VITE_DEV_SERVER_URL);
  } else {
    /**
     * Load from the local file system for production and test.
     *
     * Use BrowserWindow.loadFile() instead of BrowserWindow.loadURL() for WhatWG URL API limitations
     * when path contains special characters like `#`.
     * Let electron handle the path quirks.
     * @see https://github.com/nodejs/node/issues/12682
     * @see https://github.com/electron/electron/issues/6869
     */
    await mainWindow.loadFile(resolve(__dirname, '../../renderer/dist/index.html'));
  }

  return mainWindow;
}

/**
 * Restore an existing BrowserWindow or Create a new BrowserWindow.
 */
export async function restoreOrCreateWindow() {
  let mainWindow = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (mainWindow === undefined) {
    mainWindow = await createWindow();
  }

  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }

  const menuTemplate = menuFunctions(mainWindow, menuFunctionHandle);
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.focus();
}

// Data receive callback
ipcMain.handle('sendDoc', async(event, arg) => {
  return new Promise((resolve, rejects) => {
    if (true) {
      resolve("Data received!");
      const {doc, saveFilePath} = arg;
      writeFileSync(saveFilePath, doc);
    } else {
      rejects("Data didn't received!");
    }
  });
});

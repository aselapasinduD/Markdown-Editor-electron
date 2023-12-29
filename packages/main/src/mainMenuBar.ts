import { BrowserWindow, ipcMain } from "electron";
import { readFileSync } from "node:original-fs";

const isMac = process.platform === 'darwin'

// Interface for Menu Template
interface subMenuFace {
  label?: string;
  accelerator?: string;
  click?: () => void;
  type?: string;
  role?: string;
}
interface menuTemplateFace {
  label: string;
  submenu: Array<subMenuFace | {submenu?: Array<subMenuFace>}>;
}
// ^Interface for Menu Template^

const openFile = (mainWindow: BrowserWindow, func: any) => {
  console.log("Open: Click is Working");

  const openFilePath = func(mainWindow, "openFile");
  if (typeof openFilePath === 'undefined') return;

  const fileName = openFilePath[0].split('\\').pop();
  const readFile = readFileSync(openFilePath.pop()).toString();
  
  mainWindow.webContents.send("openFile", { contents: readFile, fileName: fileName});
}

// get fileName
var fileName: string;
ipcMain.on("fileName", async(event, arg) => {
  console.log(arg);
  fileName = arg;
});

const saveFile = (mainWindow: BrowserWindow, func: any) => {
  console.log("Save File: Working");

  let saveFilePath = func(mainWindow, "saveFile", fileName);

  if (typeof saveFilePath === 'undefined') return;

  mainWindow.webContents.send("saveFile", {saveFilePath: saveFilePath});
}

export const menuFunctions = (mainWindow: BrowserWindow, func: any) => {

  const menuTemplate: Array<menuTemplateFace> = [
    {
      label: 'File',
      submenu: [
        {label: 'New File',
          accelerator: "CommandOrControl+N",
          click: () => {
            console.log("New File: Click is Working");
          }
        },
        {label: 'Open',
          accelerator: "CommandOrControl+O",
          click: () => openFile(mainWindow, func)
        },
        {type: 'separator'},
        {label: 'Save',
          accelerator: "CommandOrControl+S",
          click: () => saveFile(mainWindow, func)
        },
        {label: 'Save As',
          click: () => {
            console.log("Save As: Click is Working");
            const saveFilePath = func(mainWindow, "saveFile");
            console.log(saveFilePath);
          }
        },
        {type: 'separator'},
        isMac? {role: 'close'} : {role: 'quit'}
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [
                  { role: 'startSpeaking' },
                  { role: 'stopSpeaking' }
                ]
              }
            ]
          : [
              { role: 'delete' },
              { type: 'separator' },
              { role: 'selectAll' }
            ])
      ]
    },
  ];

  return menuTemplate;
}
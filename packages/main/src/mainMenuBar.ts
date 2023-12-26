import { Menu, BrowserWindow, MenuItem } from "electron";

const isMac = process.platform === 'darwin'

// Interface for Menu Template
interface subMenuFace {
  label?: string;
  click?: () => void;
  type?: string;
  role?: string;
}
interface menuTemplateFace {
  label: string;
  submenu: Array<subMenuFace | {submenu?: Array<subMenuFace>}>;
}
// ^Interface for Menu Template^

export const menuFunctions = (window: BrowserWindow, func: any) => {

  const menuTemplate: Array<menuTemplateFace> = [
    {
      label: 'File',
      submenu: [
        {label: 'New File',
          click: () => {
            console.log("New File: Click is Working");
          }
        },
        {label: 'Open',
          click: () => {
            console.log("Open: Click is Working");
            const openFilePath = func(window, "openFile");
            console.log(openFilePath);
          }
        },
        {type: 'separator'},
        {label: 'Save',
          click: () => {
            console.log("Save: Click is Working");
            const saveFilePath = func(window, "saveFile");
            console.log(saveFilePath);
          }
        },
        {label: 'Save As',
          click: () => {
            console.log("Save As: Click is Working");
            const saveFilePath = func(window, "saveFile");
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
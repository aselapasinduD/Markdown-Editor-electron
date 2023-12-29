import { BrowserWindow, dialog } from "electron";

const saveFile = (mainWindow:BrowserWindow, defaultFileName:string) => {
  const SaveFilePath = dialog.showSaveDialogSync(mainWindow, {
      title: "Save File",
      defaultPath: defaultFileName,
      properties: ["createDirectory", "showOverwriteConfirmation"],
      filters: [{name: 'Markdown', extensions: ['md']}],
  });

  return SaveFilePath;
}

export default saveFile;
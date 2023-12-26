import { BrowserWindow, dialog } from "electron";

const saveFile = (mainWindow: BrowserWindow) => {
    const OpenFilePath = dialog.showSaveDialogSync(mainWindow, {
        title: "Save File",
        properties: ["createDirectory", "showOverwriteConfirmation"],
        filters: [{name: 'Markdown', extensions: ['md']}]
    });

    return OpenFilePath;
}

export default saveFile;
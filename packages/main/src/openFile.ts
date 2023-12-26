import { BrowserWindow, dialog } from "electron";

const openFile = (mainWindow: BrowserWindow) => {
    const OpenFilePath = dialog.showOpenDialogSync(mainWindow, {
        title: "Open File",
        properties: ['openFile', 'multiSelections', 'createDirectory'],
        filters: [{name: 'Markdown', extensions: ['md']}]
    });

    return OpenFilePath;
}

export default openFile;
import { BrowserWindow } from "electron";

// import Menu fucntions
import openFile from "./openFile";
import saveFile from "./saveFile";

const menuFunctionHandle = (window:BrowserWindow, menuOption:string, defalultFileName:string = "Untitiled") => {

    const menuFunctions = ["openFile", "saveFile"];
    if (!menuFunctions.includes(menuOption)) return

    if(menuOption === menuFunctions[0]) {
        var openFilePath = openFile(window);
        return openFilePath;
    } else if (menuOption === menuFunctions[1]) {
        var saveFilePath = saveFile(window, defalultFileName);
        return saveFilePath;
    }
}

export default menuFunctionHandle;
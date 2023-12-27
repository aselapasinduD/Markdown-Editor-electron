import { BrowserWindow } from "electron";

// import Menu fucntions
import openFile from "./openFile";
import saveFile from "./saveFile";

const menuFunctionHandle = (window:BrowserWindow, menuOption:string, defalultFileName:string = "Readme") => {
    if (menuOption == "") return

    if(menuOption === "openFile") {
        var openFilePath = openFile(window);
        return openFilePath;
    } else if (menuOption === "saveFile") {
        var saveFilePath = saveFile(window, defalultFileName);
        return saveFilePath;
    }
}

export default menuFunctionHandle;
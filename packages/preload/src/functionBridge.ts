import { ipcRenderer, contextBridge } from 'electron';

export const FunctionBridge = (() => {
    contextBridge.exposeInMainWorld(
        "api", {
            invoke: (channel: string, data: any) => {
                // console.log("channel: ", channel, "\ndata: ", data);
                const validChannels = ["sendDoc", "fileName"];
                const validChannelsForSendDataFrontEnd = ["openFile", "saveFile"];
                if (validChannels.includes(channel)){
                    return ipcRenderer.invoke(channel, data);
                }
                if(validChannelsForSendDataFrontEnd.includes(channel)){
                    return ipcRenderer.on(channel, data);
                }
            }
        }
    );
})();


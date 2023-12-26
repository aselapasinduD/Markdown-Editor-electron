import { ipcRenderer, contextBridge } from 'electron';

export const FunctionBridge = (() => {
    contextBridge.exposeInMainWorld(
        "api", {
            invoke: (channel: string, data: any) => {
                // console.log("channel: ", channel, "\ndata: ", data);
                const validChannels = ["sendDoc", "fileName"];
                if (validChannels[0].includes(channel)){
                    return ipcRenderer.invoke(channel, data);
                } else if(validChannels[1].includes(channel)) {
                    return ipcRenderer.invoke(channel, data);
                }
            }
        }
    );
})();


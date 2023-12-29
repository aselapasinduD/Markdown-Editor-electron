import { ipcRenderer, contextBridge } from 'electron';
import { channel } from 'node:diagnostics_channel';

export const FunctionBridge = (() => {
    contextBridge.exposeInMainWorld(
        "api", {
            // sand data to backend and trigger a function
            invoke: (channel: string, data: any) => {
                const validChannels = ["sendDoc"];
                if (validChannels.includes(channel)){
                    return ipcRenderer.invoke(channel, data);
                }
            },
            // send data to frontend
            on: (channel:string, data:any) => {
                const validChannelsForSendDataFrontEnd = ["openFile", "saveFile"];
                if(validChannelsForSendDataFrontEnd.includes(channel)){
                    return ipcRenderer.on(channel, data);
                }
            },
            // send data to backend
            send: (channel:string, data:any) => {
                const validChannelsForSendDataBackEnd = ["fileName"];
                if(validChannelsForSendDataBackEnd.includes(channel)){
                    return ipcRenderer.send(channel, data);
                }
            }
        }
    );
})();


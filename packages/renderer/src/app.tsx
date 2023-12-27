import React, { useCallback, useState, useEffect } from 'react';
import Editor from './editor';
import Preview from './preview';
import FileName from './fileName';
import './app.css';

let testTemplate = "# Title\n=======\n\n## Heading 2\n### Heading 3\n\n```js\nconsole.log('hello, World!')'\nfunction test() {\n  return 1\n}\n```\n\n```python\nif(i=0, i<0, i++){\n     print(i)\n}\nprint(\"Hello, World!\")\n```\n\n* List item 1\n* List item 2\n\n1. Numbered list item\n2. Numbered list item\n\n* [ ] check list item\n* [X] done\n\n> quote item\n";

const App:React.FC = () => {
    const [doc, setDoc] = useState<string>(testTemplate);
    const [openFileName, setOpenFileName] = useState<string>();
    const [openDoc, setOpenDoc]= useState<string>("");
    const handleDocChange = useCallback((newDoc:React.SetStateAction<string>) => {
        setDoc(newDoc);
    }, []);

    // communicate with main process for send data and triggering functions
    const saveFile = (props: any) => window.api.invoke('sendDoc', props);

    // link to openFile button in file menu to open file function
    window.api.invoke('openFile', (event, arg) => {
       setOpenDoc(arg.contents);
       setOpenFileName(arg.fileName);
    });
    // link to save button in file menu to save file function 
    window.api.invoke("saveFile", (event, arg) => saveFile({doc: doc, saveFilePath: arg.saveFilePath}));

    return (
        <div className='app'>
            <FileName openFileName={openFileName} />
            <div className='funcational-view'>
                <Editor onChange={handleDocChange} initialDoc={doc} openDoc={openDoc} />
                <Preview doc={doc} />
            </div>
        </div>
    );
}

export default App;
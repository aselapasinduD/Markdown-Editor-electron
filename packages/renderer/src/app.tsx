import React, { useCallback, useState, useEffect } from 'react';
import Editor from './editor';
import Preview from './preview';
import './app.css';

const testTemplate = "# Title\n=======\n\n## Heading 2\n### Heading 3\n\n```js\nconsole.log('hello, World!')'\nfunction test() {\n  return 1\n}\n```\n\n```python\nif(i=0, i<0, i++){\n     print(i)\n}\nprint(\"Hello, World!\")\n```\n\n* List item 1\n* List item 2\n\n1. Numbered list item\n2. Numbered list item\n\n* [ ] check list item\n* [X] done\n\n> quote item\n";

const App:React.FC = () => {
    const [doc, setDoc] = useState<string>(testTemplate);
    const handleDocChange = useCallback((newDoc:React.SetStateAction<string>) => {
        setDoc(newDoc);
    }, []);

    window.api.invoke('sendDoc', doc).then(function(res){console.log(res)}).catch(function(err){console.log(err)});
    window.api.invoke('fileName', "Testing Name").then(function(res){console.log(res)}).catch(function(err){console.log(err)});

    return (
        <div className='app'>
            <Editor onChange={handleDocChange} initialDoc={doc} />
            <Preview doc={doc} />
        </div>
    );
}

export default App;
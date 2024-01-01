import React, { useEffect, useRef, useState } from "react";
import './fileName.css';

const FileName: React.FC<{openFileName:string | undefined}> = (openFileName) => {
    const refFileName = useRef();
    let OpenFileName= openFileName.openFileName;
    const [fileName, setFileName] = useState<string>("Untitiled.md");

    useEffect(() => {
        if(OpenFileName && OpenFileName !== fileName ) {
            setFileName(OpenFileName);
            return
        };
    },[OpenFileName])

    useEffect(() => {
        if(!refFileName.current) return
        if(!fileName) return
        if(fileName === OpenFileName) {
            window.api.send('fileName', OpenFileName);
            return
        }
        window.api.send('fileName', fileName);
    },[fileName]);

    const handleFileName = () => {
        if(!refFileName.current) return
        setFileName(refFileName.current.value);
    }

    return <input 
        className="FileName"
        type="text"
        placeholder="FileName"
        onChange={handleFileName}
        ref={refFileName}
        value={fileName}
        onInput= {(event) => event.target.style.width = ((event.target.value.length + 8) * 9) + 'px'}
        />;
}

export default FileName;
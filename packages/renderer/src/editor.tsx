import React, { useCallback, useEffect } from 'react';
import useCodeMirror from './use-codemirror';
import './editor.css';

interface Props {
    initialDoc: string,
    onChange: (doc: string) => void,
    openDoc: string
}

const Editor: React.FC<Props> = (props) => {
    const { onChange, initialDoc, openDoc } = props;
    const hangleChange = useCallback((state:React.SetStateAction<any>) => onChange(state.doc.toString()),[onChange])

    const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
        initialDoc: initialDoc,
        onChange: hangleChange,
        openDoc: openDoc
    })
    useEffect(() => {
        if(editorView) {
            // Do nothing for now
        }
    }, [editorView])

    return <div className='editor-wrapper' ref={refContainer}></div>
}

export default Editor;
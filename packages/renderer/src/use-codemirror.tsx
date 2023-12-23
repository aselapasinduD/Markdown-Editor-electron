import { useEffect, useState, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, highlightActiveLine, lineNumbers, highlightActiveLineGutter } from '@codemirror/view';
import { defaultKeymap, historyKeymap, history } from '@codemirror/commands';
import { indentOnInput, bracketMatching } from '@codemirror/language';
import { tags, HighlightStyle } from '@codemirror/highlight';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';
import type React from 'react';

export const transparentTheme = EditorView.theme({
    '&': {
        backgroundColor: 'transparent !important',
        height: '100%'
    }
})

const syntaxHighlighting = HighlightStyle.define([
    {
        tag: tags.heading,
        fontSize: '1.6em',
        fontWeight: 'bold'
    },
    {
        tag: tags.heading2,
        fontSize: '1.4em',
        fontWeight: 'bold'
    },
    {
        tag: tags.heading3,
        fontSize: '1.2em',
        fontWeight: 'bold'
    }
])

interface Props {
    initialDoc: string,
    onChange: (state: EditorState) => void
}

const useCodeMirror = <T extends HTMLElement>(props: Props): [React.MutableRefObject<T | null>, EditorView?] => {
    console.log("Working use code mirror");
    const refContainer = useRef<T>(null);
    const [editorView, setEditorView] = useState<EditorView>();
    const { onChange } = props;

    useEffect(()=> {
        if(!refContainer.current) return
        console.log("top useEffect working");

        const initialState = EditorState.create({
            doc: props.initialDoc,
            extensions: [
                keymap.of([...defaultKeymap, ...historyKeymap]),
                lineNumbers(),
                highlightActiveLine(),
                highlightActiveLineGutter(),
                indentOnInput(),
                markdown({
                    base: markdownLanguage,
                    codeLanguages: languages,
                    addKeymap: true
                }),
                oneDark,
                transparentTheme,
                history(),
                bracketMatching(),
                EditorView.lineWrapping,
                EditorView.updateListener.of(update => {
                    if (update.changes) {
                        onChange && onChange(update.state)
                    }
                })
            ]
        });

        console.log("initial State: ", initialState);

        const view = new EditorView({
            state: initialState,
            parent: refContainer.current
        });

        view.dom.setAttribute('aria-label', 'Code editor');

        setEditorView(view);
        console.log(view);

    },[refContainer]);

    console.log("ref container: ", refContainer);
    console.log("Editor view: ",editorView);
    return [refContainer, editorView];
}

export default useCodeMirror;
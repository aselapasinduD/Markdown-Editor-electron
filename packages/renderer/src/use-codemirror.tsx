import { useEffect, useState, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, highlightActiveLine, lineNumbers, highlightActiveLineGutter, Panel } from '@codemirror/view';
import { defaultKeymap, historyKeymap, history } from '@codemirror/commands';
import { indentOnInput, bracketMatching, DocInput } from '@codemirror/language';
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
    onChange: (state: EditorState) => void,
    openDoc: string
}

const useCodeMirror = <T extends HTMLElement>(props: Props): [React.MutableRefObject<T | null>, EditorView?] => {
    const refContainer = useRef<T>(null);
    const [editorView, setEditorView] = useState<EditorView>();
    const { onChange } = props;

    useEffect(()=> {
        if(!refContainer.current) return

        if (!editorView) {
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
                            onChange && onChange(update.state);
                        }
                    })
                ]
            });

            const view = new EditorView({
                state: initialState,
                parent: refContainer.current
            });

            view.dom.setAttribute('aria-label', 'Code editor');

            setEditorView(view);
        }

        if (props.openDoc) {
            editorView.dispatch({
                changes: {
                from: 0,
                to: editorView.state.doc.length,
                insert: props.openDoc
                }
            });
        }
    },[refContainer, props.openDoc]);

    return [refContainer, editorView];
}

export default useCodeMirror;
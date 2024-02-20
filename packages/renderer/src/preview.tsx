import React from "react";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import rehypeReact from "rehype-react";
import Markdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { defaultSchema } from 'hast-util-sanitize';
import "./preview.css";
import 'github-markdown-css/github-markdown.css';


interface Props {
    doc: string
}

const schema = {
    ...defaultSchema,
    attributes: {
        ...defaultSchema.attributes,
        code: [...(defaultSchema.attributes?.code || []), 'className']
    }
}

const Preview:React.FC<Props> = (props) => {
    const { doc } = props
    
    return (
        <Markdown
            children={doc}
            className="preview-wrapper markdown-body"
            remarkPlugins={[remarkGfm, remarkParse]}
            rehypePlugins={[rehypeReact]}
            components={{
                code(props) {
                    const {children, className, node, ...rest} = props;
                    const langName = /language-(\w+)/.exec(className || '');
                    return langName ? (
                        <SyntaxHighlighter
                            {...rest}
                            children={String(children).replace(/\n$/, '')}
                            language={langName[1]}
                        />
                    ) : 
                    (
                        <code {...rest} className={className}>
                            {children}
                        </code>
                    )
                }
            }}
        />
    )
}

export default Preview;
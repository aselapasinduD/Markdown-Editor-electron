import React from "react";
import './footerStatusBar.css';

const FooterStatusBar: React.FC<{doc:string}> = (doc) => {

    const newDoc = new String(doc.doc);
    const docArray = newDoc.split("\n");

    const Lines = docArray.length;

    if(!/\w/.test(newDoc)) {
        return (
            <div className="code-editor-status" style={{fontSize: ".8rem"}}>
                <span>Words: 0</span>
                <span>Lines: {Lines}</span>
            </div>
        )
    }

    let count = 0;
    for(let i=0; i < docArray.length; i++) {
        let words = docArray[i].split(" ");
        for(let w=0; w < words.length; w++){
            if(/\w[a-z|A-Z]+/.test(words[w]) && !/\d/.test(words[w])){
                if(!/^\w/.test(words[w])) {
                    count++
                    continue
                }
                count++;
            }
        }
    }
    
    return (
        <div className="code-editor-status" style={{fontSize: ".8rem"}}>
            <span>Words: {count}</span>
            <span>Lines: {Lines}</span>
        </div>
    )
}

export default FooterStatusBar;
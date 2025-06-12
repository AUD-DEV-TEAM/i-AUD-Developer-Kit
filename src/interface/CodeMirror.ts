interface CodeMirror {
    CurOp;
    display;
    doc;
    options;
    state;
    getTextArea();
    setOption(propertyName : string, propertyValue : any);
    getDoc() : CodeMirrorDoc;
    save();
    toTextArea();
    on(eventType : string, callback : Function);
    setSize(width : number, height : number)
}

interface CodeMirrorFunction {
    fromTextArea(textarea : ChildNode, options : object) : CodeMirror;
}

interface CodeMirrorDoc {
    getSelection();
    getValue();
    setValue(value : string);
}
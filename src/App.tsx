import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import { SaveFileService } from "./services/SaveFileService";

import "./styles/global.css";

function App() {
    const [codeValues, setCodeValues] = React.useState<string>("");
    const handleFileSave = async () => {
        try {
            const saveFileService = new SaveFileService();
            await saveFileService.saveFile({ file: codeValues });
        } catch (err) {
            console.log("err", { ...(err as any) });
        }
    };

    return (
        <div className="app">
            <CodeMirror
                value={codeValues}
                theme="dark"
                minHeight="90vh"
                extensions={[javascript({ jsx: true, typescript: true })]}
                onChange={(value) => {
                    setCodeValues(value);
                }}
            />
            <button className="btn" onClick={handleFileSave}>
                Salvar arquivo
            </button>
        </div>
    );
}

export default App;

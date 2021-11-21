import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert'

const options = [
    {
        label: 'Japanese',
        value: 'ja',
    },
    {
        label: 'Korean',
        value: 'ko',
    },
    {
        label: 'Chinese',
        value: 'zh'
    }
]
const Translate = () => {

    const [language, setLanguage] = useState(options[0]);
    const [text, setText] = useState('');

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Text</label>
                    <input value={text} onChange={(e) => { setText(e.target.value); }} />
                </div>
            </div>
            <Dropdown label="Select a Language" options={options} selected={language} onSelectedChange={setLanguage} />
            <hr />
            <h3 className="header">Output</h3>
            <Convert language={language} text={text} />
        </div>
    );
}

export default Translate;
import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Route from './components/Route';
import Header from './components/Header';

const items = [
    {
        title: "what is react",
        content: "it's a javascript front framework"
    },
    {
        title: "why use react?",
        content: "because it is the favorite framework"
    },
    {
        title: "how do you use react",
        content: "learn from you"
    }

]

const options = [
    {
        label: "The Color Red",
        value: 'red'
    },
    {
        label: "The Color Green",
        value: 'green'
    },
    {
        label: "A Shade of Blue",
        value: 'blue'
    },
];

//the header element is for stoping the full page refresh and changing the url only
//when we click on a navigator, the value of window.location.pathname will change
export default () => {
    const [selected, setSelected] = useState(options[0]);
    return (
        <div>
            <Header />
            <Route path="/">
                <Accordion items={items} />
            </Route>
            <Route path="/list">
                <Search />
            </Route>
            <Route path="/dropdown">
                <Dropdown label="Select a Color" options={options} selected={selected} onSelectedChange={setSelected} />
            </Route>
            <Route path="/translate">
                <Translate />
            </Route>
        </div>
    );
}

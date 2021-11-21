import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onBodyClick = (e) => {
            if (ref.current.contains(e.target)) {
                return;
            }
            setOpen(false);
        }

        document.body.addEventListener("click", onBodyClick, { capture: true });

        //当DropDown被隐藏的时候，会自动调用return 函数，return 函数在两种情况下会被调用，第一种是初始化的时候return的内容会被hold,然后在下一次render的时候，最先调用hold的值。
        //第二种就是return 所在的component消失的时候，会自动调用这个值
        //即使componnet消失了，event listerner除非被remove了，否则会一直在
        return (() => {
            document.body.removeEventListener('click', onBodyClick, { capture: true });
        });
    }, []);

    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
            return null;
        }
        return (
            <div
                onClick={() => {
                    onSelectedChange(option);
                }}
                key={option.value}
                className="item"
            >
                {option.label}
            </div>
        );
    });

    const ref = useRef();

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div
                    onClick={() => {
                        setOpen(!open)
                    }}
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>{renderedOptions}</div>
                </div>
            </div>
        </div>
    );
}

export default Dropdown;
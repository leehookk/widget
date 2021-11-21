import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('programming');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);
    console.log(results);


    //既可以实现当我们500ms不输入任何键的时候才进行搜索，也可以当我们搜索的term不发生改变的时候，不调用搜索函数
    useEffect(() => {
        const timeId = setTimeout(() => {
            setDebouncedTerm(term);//when the current term and the previous term stays the same, we don't have to do anything, which is effecient
        }, 500)

        return () => {
            clearTimeout(timeId);
        }
    }, [term]);

    //used for search the term and setResults based on the response data
    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm,
                },
            });
            setResults(data.query.search);
        }
        if (term) {
            search();
        }
    }, [debouncedTerm]);

    const renderedResults = results.map((result) => {
        return <div className="item" key={result.pageid}>
            <div className="right floated content">
                <a
                    className="ui button"
                    href={`https://en.wikipedia.org?curid=${result.pageid}`}
                >
                    Go
                </a>
            </div>
            <div className="content">
                <div className="header">
                    {result.title}
                </div>
                <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
            </div>
        </div>
    });

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term:</label>
                    <input
                        value={term}
                        onChange={(event) => { setTerm(event.target.value) }}
                        className="input"
                    />
                </div>
            </div>
            <div className="ui celled list">{renderedResults}</div>
        </div>
    );
}

export default Search;
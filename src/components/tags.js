import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * Predefined constant
 */
const maxLength = 6;
const maxTag = 8;

const Container = styled.div`
display: flex;
align-items: center;
flex-direction: column;
flex-wrap: wrap;
margin-top: 15px;
position: relative;

div.top-wrapper, div.bottom-wrapper {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
div.top-wrapper {
    div.tag {
        padding: 5px;
        background-color: #F8DE7E;
        border-radius: 4px;
        height: 30px;
        min-width: 20px;
        box-sizing: border-box;
        user-select: none;

        svg {
            margin-left: 3px;
        }
    }
    form.input {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0 8px 0 8px;
        input {
            background: none;
            width: 80px;
            height: 30px;
            border: none;
            outline: none;
            font-size: 2vh;
        }
        input[placeholder] { text-overflow: ellipsis; }
        .button {
            border: none;
            outline: none;
            padding: 5px;
            
        }
        .button:hover {
            filter: brightness(80%);
        }
    }
}

.hover-action {
    &:hover {
        filter: brightness(0.9);
    }
    &:active {
        filter: brightness(0.85);
    }
}

div.bottom-wrapper {
    box-sizing: border-box;
    padding: 0px 10px;
    margin-top: 5px;
    & > div {
        flex: 1;
        min-width: calc(33% - 3px);
        box-sizing: border-box;
        user-select: none;

        &.tag, &.non-tag {
            padding: 5px;
            background-color: #F8DE7E;
            border-radius: 4px;
            height: 30px;
            margin-right: 3px;
            margin-bottom: 3px;
        }
        &.non-tag {
            background-color: transparent;
            height: auto;
            padding: 0px 5px;
            margin-bottom: 0px;
        }
    }
}

`;

// Testing
let SampleSuggestion = [
    ...Array.from(new Array(10).keys()).map((idx) => `Category-${idx}`),
    "Hello World", "hi", "ant", "jacket", "hiccup", "hope", "huge", "Hello Again"
].map((it) => it.toUpperCase());
// Shuffle
SampleSuggestion.sort((a, b) => 0.5 - Math.random())

// To preserve original order
const SuggestionIndexes = SampleSuggestion.reduce((acc, it, idx) => ({...acc, [it]: idx}), {});
const sortSuggestion = (a, b) => (SuggestionIndexes[a] - SuggestionIndexes[b])

const Find = (tag, tags, allTags=SampleSuggestion, max=maxLength) => {
    if(tag.length === 0) {
        return Array.from(new Array(maxLength).keys()).map(() => false);
    }
    const keyTags = tag.split(" ");
    let findTags = new Set();
    keyTags.forEach((t) => {
        if(t.length > 0) {
            allTags.forEach((it) => {
                if(it.indexOf(t) !== -1) {
                    findTags.add(it);
                }
            })
        }
    })
    // Filter out already existed tags
    tags = tags.map((it) => it.toUpperCase())
    findTags = Array.from(findTags).filter((it) => tags.indexOf(it) === -1).sort(sortSuggestion);

    // Captialize only first letter
    findTags = findTags.map((it) => it.charAt(0).toUpperCase() + it.slice(1).toLowerCase())

    if(findTags.length < max) {
        return [
            ...findTags,
            ...Array.from(new Array(max - findTags.length).keys()).map(() => false)
        ]
    }
    return (max === -1) ? findTags : findTags.slice(0, max)
}

const Tags = ({onAdd, onAddSuggest, onRemove, onUpdate, tag, tags, ...props}) => {
    const found = Find(tag.toUpperCase(), tags)
    return (
        <Container onSubmit={onAdd}>
            <div className="top-wrapper">
                {tags.map((it, idx) => {
                    return [
                        <div className="tag hover-action" key={`${idx}-tag`}>
                            <b>{it}</b>
                            <FontAwesomeIcon
                                icon={faTimes}
                                onClick={onRemove(idx)}
                            />
                        </div>,
                        <div key={idx} style={{ width: '8px' }} />
                    ];
                })}
                {
                    (tags.length < maxTag) && (
                        <form className="input" onSubmit={onAdd}>
                            <input
                                value={tag}
                                onChange={onUpdate("tag")}
                                placeholder="add tag"
                            />
                            <FontAwesomeIcon
                                className="button"
                                style={{ height: '30px', color: '#FF4500' }}
                                icon={faPlus}
                                onClick={onAdd}
                            />
                        </form>
                    )
                }
            </div>
            <div className="bottom-wrapper">
                {
                    found.map((it, idx) => {
                        if(it === false) {
                            return (<div className="non-tag" key={idx}></div>)
                        } else {
                            return (
                                <div
                                    className="tag hover-action"
                                    key={idx}
                                    onClick={onAddSuggest(found[idx])}
                                >
                                    {it}
                                </div>
                            )
                        }
                    })
                }
            </div>
        </Container>
    );
}

export default Tags;
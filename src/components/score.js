import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
user-select: none;
.up, .down {
    font-size: 1.2rem;
    opacity: 0.3;

    &:hover {
        opacity: 0.7;
    }
    &:active {
        opacity: 1;
    }
}
.up {
    margin-top: -0.25rem;
    color: green;
    margin-right: 3px;
}
.down {
    transform: scaleX(-1);
    margin-right: 5px;
    margin-left: 3px;
    margin-top: 0.25rem;
    color: red;
}
`;

function onHandleClick(func) {
    return (e) => {
        e.stopPropagation();
        e.preventDefault();
        if(typeof(func) === "function") {
            return func(e);
        }
        return false;
    }
}

export default ({like, dislike, onLike, onDislike, ...props }) => (
    <Container
        {...props}
    >
        <FontAwesomeIcon
            className="up"
            icon={faThumbsUp}
            onClick={onHandleClick(onLike)}
        />
        <div>{like}</div>
        <FontAwesomeIcon
            className="down"
            icon={faThumbsDown}
            onClick={onHandleClick(onDislike)}
        />
        <div>{dislike}</div>
    </Container>
)
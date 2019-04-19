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

export default (props) => (
    <Container>
        <FontAwesomeIcon
            className="up"
            icon={faThumbsUp}
        />
        <div>999</div>
        <FontAwesomeIcon
            className="down"
            icon={faThumbsDown}
        />
    </Container>
)
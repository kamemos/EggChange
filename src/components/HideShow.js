import React, { Component } from "react";
import styled from "styled-components";
import { defaultTo } from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import Fade from 'react-reveal/Fade';

const Container = styled.section`
background-color: #FFE85B;
.nav-top {
    background-color: #FFE85B;
    font-size: 1.125rem;
    height: 40px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 10px;
    user-select: none;
    box-shadow: 0px 1px 3px #0003;
    position: relative;
    z-index: 10;

    svg {
        font-size: 1.25rem;
        margin-right: 5px;
        &.down {
            margin-top: -0.5rem;
        }
        &.up {
            margin-bottom: -0.5rem;
        }
    }
}
`;

class HideShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHide: defaultTo(props.initial, true)
        }
    }
    onToggle = () => {
        this.setState({
            isHide: !this.state.isHide
        })
    }
    render() {
        const { className, topic, children } = this.props;
        const { isHide } = this.state;
        return (
            <Container
                className={className}
            >
                <section className="nav-top">
                    <FontAwesomeIcon
                        onClick={this.onToggle}
                        icon={(!isHide) ? faSortDown : faSortUp}
                        className={!isHide ? "down" : "up"}
                    />
                    {
                        defaultTo(topic, "")
                    }
                </section>
                <Fade collapse when={isHide}>
                    {
                        children
                    }
                </Fade>
            </Container>
        );
    }
}

export default HideShow;
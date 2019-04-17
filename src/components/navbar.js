import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Fade from 'react-reveal/Fade';

/*
Color palette
#F8DE7E
#FADA5E
#FCF4A3

#FCE205
#F8E473
#FEDC56
*/

const Container = styled.nav`
position: sticky;
background-color: #fedc56;
top: 0;
width: 100vw;
.top {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 50px;
    min-height: 50px;
    box-sizing: border-box;
    padding: 0px 15px;

    article {
        flex: 1;
        &.logo, &.menu-btn {
            max-width: 100px;
            min-width: 100px;
        }
        &.menu-btn {
            text-align: right;
            font-size: 1.25rem;
        }
        &.title {
            text-align: center;
        }
    }
}
article.menu {
    display: flex;
    justify-content: center;
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        padding-bottom: 15px;
    }
}
@media screen and (max-width: 1024px) {
    .small-no-show {
        display: none;
    }
}
@media screen and (min-width: 1025px){
    .large-no-show {
        display: none;
    }
}
z-index: 52;
`;

class Navbar extends Component {
    state = {
        isOpen: false
    }
    onToggleHamburger = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    componentDidUpdate(prevProps) {
        if (this.props.windowWidth !== prevProps.windowWidth) {
            this.setState({ isOpen: false });
        }
    }
    render() {
        return (
            <>
                <Container>
                    <section className="top">
                        <article className="logo">Logo</article>
                        <article className="title">Title</article>
                        <article className="menu-btn">
                            <FontAwesomeIcon
                                className="large-no-show"
                                icon={faBars}
                                onClick={this.onToggleHamburger}
                            />
                        </article>
                    </section>
                    <article className="menu">
                        <Fade collapse when={this.state.isOpen}>
                            <ul>
                                <li>Option 1</li>
                                <li>Option 2</li>
                                <li>Option 3</li>
                            </ul>
                        </Fade>
                    </article>
                </Container>
                <div style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    height: "50px",
                    width: "100vw",
                    boxShadow: "0px 2px 5px #0003",
                    zIndex: "50"
                }} />
            </>
        )
    }
}

export default Navbar;
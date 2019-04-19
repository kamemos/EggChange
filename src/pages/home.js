import React, { Component } from "react";
import styled from "styled-components";
// Redux stuff
import connect from 'redux-connect-decorator';
import { test,user } from '../redux/actions';
// Images
import yolk from "../assets/Yolk.svg";
import egg from "../assets/Egg-Gradient.svg";


const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
overflow-x: hidden;

img.yolk {
    max-width: 750px;
    width: 100vw;
    margin-top: -1px;
    position: relative;
    z-index: 51;
}

img.egg {
    max-width: 1024px;
    min-width: 1024px;
    margin-bottom: -1px;
    margin-top: 50px;
}
section {
    &.welcome {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50vh;
    }
    &.content {
        width: 100vw;
        background-image: linear-gradient(#fceeae, #ffd200);
        padding: 30px;
        box-sizing: border-box;
    }

}
.zig-zag-top {
    padding: 32px 0;
    margin: 32px 0;
    margin-bottom: 0;
    background: #1ba1e2;

    &:before {
        background: linear-gradient(-45deg,
        #1ba1e2 16px,
        red 16px,
        blue 16px,
        transparent 0),
        linear-gradient(45deg, #1ba1e2 16px, transparent 0);
        background-position: left top;
        background-repeat: repeat-x;
        background-size: 22px 32px;
        content: " ";
        display: block;

        height: 32px;
        width: 100%;

        position: relative;
        bottom: 64px;
        left: 0;
    }
}

.zig-zag-bottom {
    padding: 32px 0;
    margin: 32px 0;
    margin-top: 0;
    background: #1ba1e2;
    &::after {
        background: linear-gradient(-45deg, transparent 16px, #1ba1e2 0),
        linear-gradient(45deg, transparent 16px, #1ba1e2 0);
        background-repeat: repeat-x;
        background-position: left bottom;
        background-size: 22px 32px;
        content: "";
        display: block;

        width: 100%;
        height: 32px;

        position: relative;
        top: 64px;
        left: 0px;
    }
}
`;

@connect(state => ({
    test: state.test,
}), {
    ...test,
})
class Home extends Component {
    render() {
        console.log(this.props)
        return (
            <Container>
                <img className="yolk" src={yolk} alt="yolk" />
                <section className="welcome">
                    <div style={{
                        width: "250px",
                        height: "250px",
                        borderRadius: "50%",
                        background: "#AAA"
                    }} />
                    <span>Egg Change</span>
                </section>
                <section>
                    <div className="zig-zag-bottom" />
                    Abc Def Ghi J
                    <div className="zig-zag-top" />
                </section>
                <img className="egg" src={egg} alt="egg" />
                <section className="content">
                    Home
                    {
                        Array.from(new Array(20).keys()).map((it) => (
                            <p key={it}>
                                Lorem ipsum
                            </p>
                        ))
                    }
                </section>
            </Container>
        )
    }
}

export default Home;
import React, { Component } from "react";
import styled from "styled-components";
// Redux stuff
import connect from 'redux-connect-decorator';
// import { test, user } from '../redux/actions';
// Images
import yolk from "../assets/Yolk.svg";
import egg from "../assets/Egg-Gradient.svg";
import { LastestPost, Logo } from '../components'

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
    position: relative;
    z-index: 10;
    margin-bottom: -1px;
}
section {
    &.welcome {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* height: 50vh; */

        div.logo {
            width: 250px;
            height: 250px;
            border-radius: 50%;
            background: #FFD95899;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 80%;
            }
        }
    }
    &.content {
        width: 100vw;
        background-image: linear-gradient(#fceeae, #ffd200);
        padding: 30px;
        box-sizing: border-box;
        box-shadow: 0px -2px 3px #0001;
    }

}
.zig-zag-top {
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
        bottom: 0px;
        left: 0;
    }
}

.zig-zag-bottom {
    &::after {
        filter: drop-shadow(#00000035 0px 3px 2px);
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
        top: 0px;
        left: 0px;
    }
}
`;

@connect(state => ({
    user: state.user,
}), {})
class Home extends Component {
    render() {
        return (
            <Container>
                <img className="yolk" src={yolk} alt="yolk" />
                <LastestPost/>
                <section className="welcome">
                    <Logo.LogoCircle />
                    <Logo.LogoWithWord isVertical={false} />
                    <Logo.LogoWithWord isVertical={true} />
                    <Logo.LogoWithName isVertical={false} />
                    <Logo.LogoWithName isVertical={true} />
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
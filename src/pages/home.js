import React, { Component } from "react";
import styled from "styled-components";
// Redux stuff
import connect from 'redux-connect-decorator';
// import { test, user } from '../redux/actions';
// Images
import yolk from "../assets/Yolk.svg";
import egg from "../assets/Egg-Gradient.svg";
import logo from "../assets/A.png";
import text from "../assets/Welcome To Egg-Change A Knowledge Hub.png";
import { LastestPost } from '../components';

const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
overflow-x: hidden;

img.yolk {
    max-width: 750px;
    width: 100vw;
    margin-top: -1px;
    z-index: 51;
}

section.top {
    position: relative;
    z-index: 51;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* box-shadow: 0px 5px 5px #0002; */
    img.yolk {
        max-width: 750px;
        width: 100vw;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    div.wrapper {
        display: flex;
        margin-top: 15vw;
        justify-content: center;
        box-sizing: border-box;
        padding-bottom: 20px;
        img[alt=logo] {
            align-self: center;
            max-width: 350px;
            margin-right: 2vw;
        }
        img[alt=text] {
            align-self: center;
            max-width: 350px;
        }
        
    }
    @media screen and (min-width: 751px) {
        max-height: 800px;
    }
    @media screen and (max-width: 750px) {
        div.wrapper {
            flex-direction: column;
            margin-top: 20vw;
            img[alt=logo] {
                align-self: auto;
                margin-right: 0;
            }
            img[alt=text] {
                align-self: center;
                max-width: 250px;
            }
        }
    }
    @media screen and (min-width: 1025px) {
        div.wrapper {
            margin-top: 150px;
        }
    }
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
                <section className="top">
                    <img className="yolk" src={yolk} alt="yolk" />
                    <div className="wrapper">
                        <img src={logo} alt="logo" />
                        <img src={text} alt="text" />
                    </div>
                </section>
                <LastestPost/>
                <img className="egg" src={egg} alt="egg" />
                <section className="content">
                    <h2>About Us</h2>
                </section>
            </Container>
        )
    }
}

export default Home;
import React from "react";
import styled from "styled-components";
import { StyleContainer, Score } from "../components";
import moment from 'moment'

const Container = styled.article`
max-width: calc(50vw + 100px);
width: 100vw;
min-width: 350px;
box-sizing: border-box;
position: relative;
z-index: 10;
box-shadow: 0px -2px 5px #0003;

.top-bar {
    display: flex;
    height: 3rem;
    justify-content: center;
    align-items: center;
    background: #FFD958;
    box-sizing: border-box;
    padding: 10px 20px;
    width: 100%;
    flex: 1;
    &> div.score {
        width: 90px;
    }
    &> div.title {
        flex: 1;
    }   
}

box-sizing: border-box;
padding: 0px 0px 32px 0px;
/* margin: 0px 0px 32px 0px; */
margin-top: 0;
background: #FFD77F;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

background-color: #FFF2DA;
background-size: 100% 1.5rem;
background-image: -webkit-linear-gradient(0deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),
                  -webkit-linear-gradient(#00000015 .05em, transparent .05em);
background-image: -moz-linear-gradient(0deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),
                  -moz-linear-gradient(#00000015 .05em, transparent .05em);
background-image: linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),
                  linear-gradient(#00000015 .05em, transparent .05em);
-pie-background: linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px) 0 0 / 100% 1.2em,
                 linear-gradient(#00000015 .05em, transparent .05em) 0 0 / 100% 1.2em #fff;

.content {
    padding: 20px;
    max-width: 1024px;
    padding-left: 100px;
    width: calc(50vw + 100px);
    box-sizing: border-box;
    p:first-child {
        margin-top: 30px;
    }

    @media screen and (max-width: 1024px) {
        p:first-child {
            margin-top: 10px;
        }
    }
}
`;

const ZigZag = styled.div`
&::after {
    filter: drop-shadow(#0003 0px 2px 2px);
    box-shadow: 0px -6px 5px #00000012;
    background: linear-gradient(-45deg, transparent 16px, #FFF2DA 0),
    linear-gradient(45deg, transparent 16px, #FFF2DA 0);
    background-repeat: repeat-x;
    background-position: left bottom;
    background-size: 22px 32px;
    content: "";
    display: block;

    width: 100%;
    height: 32px;

    position: relative;
}
`;

const OPBlocgCell = (props) => (
    <section
        style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 'calc(50vw + 100px)'
        }}
    >
        <Container>
            <section className="top-bar">
                <div className="score">
                    <Score />
                </div>
                <div className="title">{props.title}</div>
                <div>
                    <b>Created :</b> {moment(props.modifiedTime).startOf('day').fromNow()}
                </div>
            </section>
            <section className="content">
                <StyleContainer dangerouslySetInnerHTML={{
                    __html:
                        props.text
                }} />
            </section>
        </Container>
        <ZigZag />
    </section>
);

export default OPBlocgCell;
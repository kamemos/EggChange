import React from "react";
import styled from "styled-components";
import { StyleContainer, Score } from "../components";

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

const TestContent = `
<p class="">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br>
</p>
<h1>This is h1</h1>
<h2>This is h2</h2>
<h3>This is h3</h3>
<h4>This is h4</h4>
<p class="">
    <br>
</p>
<p class="">
    <img src="data:image/png;base64,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"><br>
</p>
<p>
    <br>
</p>
<h1>This is h1</h1>
<p>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br>
</p> `;

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
                <div className="title">[Title]</div>
            </section>
            <section className="content">
                <StyleContainer dangerouslySetInnerHTML={{
                    __html:
                        TestContent
                }} />
            </section>
        </Container>
        <ZigZag />
    </section>
);

export default OPBlocgCell;
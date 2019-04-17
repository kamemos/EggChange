import React, { Component } from "react";
import styled from "styled-components";
import { Editor } from "../components";

const Container = styled.article`
box-sizing: border-box;
padding: 15px 10px;
.top-bar {
    display: flex;
    height: 3rem;
    justify-content: center;
    align-items: center;
    background: #AAA;
    box-sizing: border-box;
    padding: 10px 20px;
    &> div.score {
        width: 75px;
    }
    &> div.title {
        flex: 1;
    }   
}
`;

class OPBlocgCell extends Component {
    state = {
        text: ""
    }
    handleChange = (text, medium) => {
        console.log(text, medium)
        this.setState({ text: text });
    }
    render() {
        return (
            <Container>
                <section className="top-bar">
                    <div className="score">ABC</div>
                    <div className="title">[Title]</div>
                </section>
                <Editor />
            </Container>
        );
    }
}

export default OPBlocgCell;
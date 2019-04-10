import React, { Component } from 'react';
import styled from "styled-components";
import { Editor } from '../components'
// var editor = new MediumEditor('.editable')

const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px

`
const Title = styled.h1`
    font-size: 300%;
`
const Line = styled.div`
    border: solid 1px grey;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
`
const ContentBox = styled.div`
    width: 1000px;

`
class ContentEditor extends Component {
    constructor(props){
        super(props)
        this.state = {
            title : 'Title'
        }
    }
    render() {
        return (
            <Container>
                <ContentBox>
                    <Title><b>{this.state.title}</b></Title>
                    <Line/>
                    <Editor/>
                    {/* <Line/> */}
                </ContentBox>
            </Container>
        );
    }
}

export default ContentEditor;
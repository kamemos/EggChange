import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.section`
    display: flex;
    flex-direction: column;
    padding: 30px;
    height: 40vh;
    width: 100vw;
    background: rgba(248,212,80,0.3);
    overflow-y: scroll;
    z-index: 5;
`
const Title = styled.h3`
    margin-left: 20px;
`

export default class LastestPost extends Component {


    render(){
        return (
            <Container>
                <Title>Lastest Blog</Title>
            </Container>
        )
    }
}
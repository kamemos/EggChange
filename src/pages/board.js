import React, { Component } from 'react'
import styled from 'styled-components' 
import { BoardCard,SearchBox } from '../components'
import axios from 'axios' 

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    marginTop: 5vh;
`
const Card = styled.div`
    width: 330px
    height: 400px
    border: 1px solid gray;
    border-radius: 4px; 
`

const Overlay = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.8);
    height: 100%;
    width: 100%;
    z-index: 1000;
`
const Loader = styled.div`
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid #3498db;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
`
const CardContainer = styled.div`
    display: flex;
    // justify-content: center;
    flex-wrap: wrap;
    width: 80vw;
    min-width: 350px;
`
class Board extends Component {
    state = {
        isFetching : false,
        keywords: [],
        blogs: []
    }

    render(){
        return (
            <Container>
                {this.state.isFetching ?
                    <Overlay>
                        <Loader/>
                    </Overlay>
                    :null
                }
                <SearchBox 
                    keywords={this.state.keywords}
                    keywordsOnchange={(keywords)=>{this.setState({keywords:keywords})}} 
                    isFetchingOnchange={(bool)=>{this.setState({isFetching:bool})}} 
                    blogsOnchange={(blogs)=>{this.setState({blogs:blogs})}}              
                />
                <CardContainer>
    
                    { this.state.blogs.map((blog,idx) => {
                        const { title,tags,owner,modifiedDate } = { ...blog }
                        return (
                            <BoardCard
                                key={`boardcard ${idx}`}
                                title={ title }
                                tags={ tags }
                                owner={ owner }
                                modifiedDate={ modifiedDate }
                            />
                        )
                    }) }
                    {/* <BoardCard/>
                    <BoardCard/>
                    <BoardCard/>
                    <BoardCard/>

                    <BoardCard/>
                    <BoardCard/>
                    <BoardCard/> */}

                </CardContainer>    
            </Container>
        )
    }
}

export default Board
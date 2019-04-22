import React, { Component } from 'react'
import styled from 'styled-components' 
import { BoardCard, SearchBox } from '../components'
// import axios from 'axios';
import { defaultTo } from "lodash";

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    z-index: -1;
   
`
const Background = styled.div`
    position: absolute;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    width: 100%;
    max-width: 1000px;
    z-index: -1;
    background: url(${require('../assets/eggss.png')}) bottom no-repeat;
    background-attachment: fixed;
    background-size: contain;
    background-position:fixed; 
    opacity: 0.5;
    filter: alpha(opacity=30);

    @media screen and (min-width: 1000px) {
        background-size: 1000px;
    }
`
const Overlay = styled.div`
    position: fixed;
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
    height: auto;
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
                <Background>
                    {/* <img className='egg_field' src={require('../assets/eggss.png')}/> */}
                    {/* <embed className='egg_field' src={require('../assets/field.svg')}/> */}
                </Background>
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
                        const { title,tags,owner,modifiedDate,like,dislike } = { ...blog }
                        return (
                            <BoardCard
                                key={`boardcard ${idx}`}
                                title={ title }
                                tags={ tags }
                                owner={ owner }
                                modifiedDate={ modifiedDate }
                                like={ like }
                                dislike={ dislike }
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
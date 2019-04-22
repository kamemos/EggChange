import React, { Component } from 'react'
import styled from 'styled-components'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';


const Container = styled.div`
    display: flex;
    flex-direction: column
    width: 40vw;
    min-width: 350px;
    margin: 5vh 0 15px 0;
`
const TagBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%
    div.tag{
        padding: 5px;
        background-color: #F8DE7E;
        border-radius: 4px;
        height: 30px;
        min-width: 20px;
        box-sizing: border-box;
        user-select: none;
        margin: 5px 5px 5px 0
    }
`
const InputBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    input {
        border: none;
        outline: none;
        font-size: 3vh;
        height: 100%;
        width: 300px;
        text-align:center;
    }
    .search-icon {
        color: grey;
        font-size: 3vh;
    }
`
const PseudoDiv = styled.div`
    height: 2vh;
`
class SearchBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: ''
        }
    }
    async handleClick(){
        try{
            const keywords = this.state.searchText.split(' ')
            this.props.keywordsOnchange(keywords)
            this.props.isFetchingOnchange(true)
            const blogs = (await axios.post("https://kt6xg5iln2.execute-api.ap-southeast-1.amazonaws.com/prod/query-keyword",{keywords:keywords})).data.body
            console.log(blogs)
            this.props.blogsOnchange(blogs)
        }catch(err){
            alert(err)
        }finally{
            this.props.isFetchingOnchange(false)
            this.setState({searchText: ''})
        }
    }
    render(){
        return (
            <Container>
                <InputBox>
                    <form onSubmit={e=>{this.handleClick();e.preventDefault()}}>
                        <input 
                            onChange={(e)=>{this.setState({searchText:e.target.value})}} 
                            placeholder="Search by keyword"
                        />
                        <FontAwesomeIcon 
                            className='search-icon' 
                            icon={faSearch} 
                            onClick={this.handleClick.bind(this)}
                        />
                    </form>
                </InputBox>
                <PseudoDiv/>
                <TagBox>
                    <p style={{margin:'5px 5px 5px 0',color:'gray'}}><b>Keyword : </b></p>
                    { this.props.keywords.map((keyword,idx)=>{
                        return (
                            <div className="tag" key={`tag ${idx}`}><b>{keyword}</b></div>
                        )
                    }) }
                
                </TagBox>
            </Container>
        )
    }
}

export default SearchBox
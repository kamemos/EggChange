import React, { Component } from 'react';
import styled from "styled-components";
import { Editor, Tags } from '../components'
import axios from 'axios';
import { user } from '../redux/actions';
import connect from 'redux-connect-decorator';

// var editor = new MediumEditor('.editable')

const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-width: 100vw;
    min-height: 100vh;
    box-sizing: border-box;
`
const Title = styled.input`
    font-size: 300%;
    width: 50vw;
    outline: none;
    border: none;
    box-sizing: border-box;
`
const Line = styled.div`
    border: solid 1px grey;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
`
const ContentBox = styled.div`
    width: 50vw;
    min-width: 350px;
    margin-top: 40px;
`
// const Row = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: flex-start;
// `
const Button = styled.button`
    & {
        font-size: 3vh;
        box-sizing: border-box;
        margin-top: 40px;
        outline: none;
        border: none;
        background: #F8DE7E;
        border-radius: 5px;
    }
    &:hover{
        filter: brightness(80%);
    }
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

@connect(state => ({
    user: state.user,
}), {
    ...user,
})
class ContentEditor extends Component {
    state = {
        title : 'Title',
        tag : '',
        tags : [],
        text : '',
        isSubmitting: false,
        redirect: false
    }
    submitContent = async () => {
        const { email,jwt_token } = {...this.props.user}
        const { title,tags,text } = {...this.state}
        try{
            this.setState({isSubmitting:true})
            var reqObj = { email,jwt_token,title,tags,text }
            var payload = (await axios.post("https://kt6xg5iln2.execute-api.ap-southeast-1.amazonaws.com/prod/create-content",reqObj)).data
            var { statusCode,body } = { ...payload }
            if (statusCode === 400) throw Error(body)
            this.setState({redirect:true})
            alert("Create content successfully") 
        }catch(err){
            alert(err)
        }finally{
            this.setState({isSubmitting:false})
        }
    }
    onAddTag = (e) => {
        e.preventDefault();
        this.setState({
            tag: '',
            tags: (
                this.state.tags.indexOf(this.state.tag.toUpperCase()) === -1 &&
                this.state.tag.length > 0
            ) ? [
                ...this.state.tags, this.state.tag.toUpperCase()
            ] : this.state.tags
        });
        return false;
    }
    onAddSuggestTag = (suggest) => () => {
        this.setState({
            tag: '',
            tags: (
                this.state.tags.indexOf(suggest.toUpperCase()) === -1 &&
                this.state.tag.length > 0
            ) ? [
                    ...this.state.tags, suggest.toUpperCase()
                ] : this.state.tags
        });
    }
    onRemoveTag = (idx) => () => (
        this.setState({
            tags: [
                ...this.state.tags.slice(0, idx),
                ...this.state.tags.slice(idx + 1, this.state.tags.length)
            ]
        })
    )
    onUpdate = (key) => (e) => (
        this.setState({
            [key]: e.target.value
        })
    )
    onUpdateText = (text, medium) => {
        this.setState({
            text: text
        })
    }
    render() {
        return (
            <Container>
                {this.state.isSubmitting ? 
                    <Overlay>
                        <Loader/>
                    </Overlay>
                    :null}
                <ContentBox>
                    <Title 
                        value={this.state.title}
                        onChange={this.onUpdate("title")}
                    />
                    <Tags
                        onAdd={this.onAddTag}
                        onAddSuggest={this.onAddSuggestTag}
                        onRemove={this.onRemoveTag}
                        onUpdate={this.onUpdate}
                        tag={this.state.tag}
                        tags={this.state.tags}
                    />
                    <Line/>
                    <Editor 
                        text={this.state.text}
                        onChange={this.onUpdateText}
                    />

                    {/* <Line/> */}
                    <div style={{'display':'flex',justifyContent:'flex-end'}}>
                        <Button onClick={this.submitContent}>Submit</Button>
                    </div>
                </ContentBox>
            </Container>
        );
    }
}

export default ContentEditor;
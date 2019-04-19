import React, { Component } from 'react';
import styled from "styled-components";
import { Editor } from '../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { user } from '../redux/actions';
import connect from 'redux-connect-decorator';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


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
const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`
const TagsInput = styled.div`
    display: flex;
    align-items: center;
    flex-direction: flex-start;
    flex-wrap: wrap;
    margin-top: 15px;
    div.tag {
        padding: 5px;
        background-color: #F8DE7E;
        border-radius: 4px;
        height: 30px;
        min-width: 20px;
        box-sizing: border-box;
    }
    div.input {
        display: flex;
        align-items: center;
        justify-content: flex-start
        margin: 0 8px 0 8px;
        input {
            width: 80px
            height: 30px;
            border: none;
            outline: none;
            font-size: 2vh;
        }
        input[placeholder] { text-overflow: ellipsis; }
        .button {
            border: none;
            outling: none;
            padding: 5px;
            
        }
        .button:hover {
            filter: brightness(80%)
        }
    }
`
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
                        onChange={(e)=>{this.setState({title:e.target.value})}} 
                    />
                    <TagsInput>
                        {this.state.tags.map( (tag,idx) => {
                            return (
                                <>
                                    <div className="tag"><b>{tag}</b></div>
                                    <div style={{width:'8px'}}/>
                                </>
                            )
                        })}
                        <div className="input">
                            <input
                                value={this.state.tag}
                                onChange={(e)=>{this.setState({tag:e.target.value})}}
                                placeholder="add tag"
                            />
                            
                            <FontAwesomeIcon  
                                className="button"
                                style={{height:'30px',color:'#FF4500'}} icon={faPlus} 
                                onClick={()=>{this.setState({tags: [...this.state.tags,this.state.tag],tag:''})}}
                            />      
                        </div>
                    </TagsInput>
                    <Line/>
                    <Editor 
                        text={this.state.text}
                        onChange={(text, medium)=>{this.setState({text:text});console.log(this.state)}}
                    />

                    {/* <Line/> */}
                    <div style={{'display':'flex',justifyContent:'flex-end'}}>
                        <Button onClick={this.submitContent.bind(this)}>Submit</Button>
                    </div>
                </ContentBox>
            </Container>
        );
    }
}

export default ContentEditor;
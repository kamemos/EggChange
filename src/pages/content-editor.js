import React, { Component } from 'react';
import styled from "styled-components";
import { Editor, Tags, ImageZone, HideShow } from '../components'
import axios from 'axios';
import { user } from '../redux/actions';
import connect from 'redux-connect-decorator';
import { Redirect } from 'react-router';

// var editor = new MediumEditor('.editable')

const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-width: 100vw;
    min-height: 100vh;
    box-sizing: border-box;
    margin-bottom: 40px;

    .image-zone {
        margin-top: 10px;
    }
    .image-zone, .file-zone {
        box-shadow: 0px 1px 3px #0003;
        margin-bottom: 0px;
    }
`
const Title = styled.input`
    font-size: 300%;
    max-width: 50vw;
    width: 100vw;
    min-width: 350px;
    outline: none;
    border: none;
    box-sizing: border-box;
    background: none;
`
const Line = styled.div`
    border: solid 1px grey;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
`
const ContentBox = styled.div`
    max-width: 50vw;
    width: 100vw;
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
        font-size: 1rem;
        box-sizing: border-box;
        outline: none;
        border: none;
        background: #F8DE7E;
        border-radius: 5px;
        padding: 7px 10px;
    }
    &:hover{
        filter: brightness(80%);
    }
    &.cancel {
        margin-right: 3px;
        background: #ED3F39;
        color: #FFF;
    }
    &.submit {
        background: #C1ED38;
    }
`
const Overlay = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.8);
    height: 100vh;
    width: 100vw;
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
`;

const CancelDialogue = styled.div`
display: flex;
background: white;
flex-direction: column;
box-sizing: border-box;
padding: 20px;
border-radius: 5px;
& > div {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
}
`;

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
        redirect: false,
        medium: null,
        isCancelling: false
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
                ...this.state.tags, this.state.tag.toUpperCase().split(" ").join("-")
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
            text: text,
            medium: (this.state.medium === null) ? medium : this.state.medium
        })
    }
    onAddImage = (src) => {
        const { medium } = this.state;
        if (medium !== null) {
            const dom = medium.origElements;
            const img = document.createElement("img");
            img.setAttribute("src", src);
            const p = document.createElement("p");
            p.setAttribute("class", "");
            p.append(img)
            p.append(document.createElement("br"));

            // const emptyP = document.createElement("p");
            // emptyP.innerHTML = "<br />";

            const emptyDiv = document.createElement("div");
            emptyDiv.setAttribute("class", "");
            emptyDiv.innerHTML = "<br />";

            // dom.append(emptyP);
            dom.append(p);
            dom.append(emptyDiv);
            medium.trigger('editableInput', {}, dom)
        }
    }
    onToggleCancel = () => {
        this.setState({
            isCancelling: !this.state.isCancelling
        })
    }
    onRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }
        return (
            <Container>
                {this.state.isSubmitting ? 
                    <Overlay>
                        <Loader/>
                    </Overlay>
                    :null}
                {
                    this.state.isCancelling && (
                        <Overlay>
                            <CancelDialogue>
                                Are you sure you want to cancel?
                                <div>
                                    <Button onClick={this.onToggleCancel} className="cancel">No</Button>
                                    <Button onClick={this.onRedirect} className="submit">Yes</Button>
                                </div>
                            </CancelDialogue>
                        </Overlay>
                    )
                }
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
                    {
                        // <div onClick={this.onAddImageStub}>
                        //     Add Image Upload Stub
                        // </div>
                    }
                    <HideShow
                        className="image-zone"
                        initial={false}
                        topic="Add Image"
                    >
                        <ImageZone
                            onAdd={this.onAddImage}
                        />
                    </HideShow>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '15px'
                    }}>
                        <Button className="cancel" onClick={this.onToggleCancel}>Cancel</Button>
                        <Button className="submit" onClick={this.submitContent}>Submit</Button>
                    </div>
                </ContentBox>
            </Container>
        );
    }
}

export default ContentEditor;
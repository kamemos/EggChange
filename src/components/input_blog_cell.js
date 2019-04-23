import React, { Component } from "react";
import styled from "styled-components";
import { StyleContainer } from "../components";
import { Editor, HideShow, ImageZone } from '../components'
import { user } from '../redux/actions';
import connect from 'redux-connect-decorator';
import axios from 'axios'

const Container = styled.article`
max-width: calc(50vw + 100px);
width: 100vw;
min-width: 350px;
box-sizing: border-box;
position: relative;
z-index: 10;
box-shadow: 0px 2px 5px 0px #0003;

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
    min-height: 150px;
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

.image-zone {
    margin-top: 10px;
}
`;
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
        /* background: #F4B24E; */
        margin-left: auto;
        margin-right: 40px;
    }
`

const ZigZagTop = styled.div`
&::before {
    filter: drop-shadow(#00000025 0px -3px 2px);
    box-shadow: 0px 6px 5px #00000012;

    background: linear-gradient(-45deg,
        #FFF2DA 16px,
        red 16px,
        blue 16px,
        transparent 0),
    linear-gradient(45deg, #FFF2DA 16px, transparent 0);
    background-position: left top;
    background-repeat: repeat-x;
    background-size: 22px 32px;
    content: " ";
    display: block;

    height: 32px;
    width: 100%;

    position: relative;
}
`;
const Loader = styled.div`
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid #3498db;
    width: 60px;
    height: 60px;
    margin: 0 20px 0 auto;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
`

@connect(state => ({
    user: state.user,
}), {
    ...user,
})
class InputBlogCell extends Component {
    constructor(props){
        super(props);
        this.state = {
            text : '',
            medium: null,
            email : this.props.user.email,
            jwt_token : this.props.user.jwt_token,
            fromTitle : this.props.fromTitle,
            isSubmitting : false,
        }
    }
    async onSubmit() {
        try{
            if (this.state.text === "") {
                throw Error('please insert some text')
            }
            await this.setState({ isSubmitting:true })
            const { text } = this.state;
            const { fromTitle, email, jwt_token } = this.props;
            const data = (await axios.post(
                'https://kt6xg5iln2.execute-api.ap-southeast-1.amazonaws.com/prod/create-comment',
                { text, fromTitle, email, jwt_token })).data;
            if (data.statusCode === 400) {
                throw Error(data.body)
            }
        } catch(err){
            alert(err)
        } finally {
            await this.setState({ isSubmitting:false, text:'' })
            window.location.reload(); 
        }
    }
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

            const emptyDiv = document.createElement("div");
            emptyDiv.setAttribute("class", "");
            emptyDiv.innerHTML = "<br />";

            dom.append(p);
            dom.append(emptyDiv);
            medium.trigger('editableInput', {}, dom)
        }
    }
    render() {
        return (
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 'calc(50vw + 100px)'
                }}
            >
                <ZigZagTop />
                <Container>
                    <section className="content">
                        <StyleContainer>
                            <Editor 
                                text={this.state.text}
                                onChange={this.onUpdateText}
                            />
                        </StyleContainer>
                        <HideShow
                            className="image-zone"
                            initial={false}
                            topic="Add Image"
                        >
                            <ImageZone
                                onAdd={this.onAddImage}
                            />
                        </HideShow>
                    </section>
                    
                    {this.state.isSubmitting ? 
                            // <LoadingFade>
                                <Loader/>
                            // {/* </LoadingFade> */}
                        :
                        <Button 
                            disabled={this.state.isSubmitting}
                            className="submit" 
                            onClick={this.onSubmit.bind(this)}
                        >
                        Submit
                        </Button>
                    }
                    
                </Container>
            </section>
        );
    }
}

export default InputBlogCell;
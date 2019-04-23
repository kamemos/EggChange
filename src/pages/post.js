import React, { Component } from "react";
import styled from "styled-components";
import { OPBlogCell, CommentBlogCell, InputBlogCell } from "../components";
import axios from "axios";
import connect from 'redux-connect-decorator';
import { get } from "lodash";

const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
padding: 10px 7px;
box-sizing: border-box;

&> section {
    margin-top: 10px;
    margin-bottom: 10px;
}
`;
const Loader = styled.div`
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid #3498db;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
`

const LoadingFade = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,.8);
    z-index: 1000;
`
@connect(state => ({
    user: state.user,
}), {})
class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            isFetching: false,
            modifiedTime: 0,
            text: '',
            comments: []
        }
    }
    async componentDidMount(){
        if ( this.props.match.params.blog_title ) await this.setState({title:this.props.match.params.blog_title})
        try {
            this.setState({isFetching:true})
            const post = (await axios.post("https://kt6xg5iln2.execute-api.ap-southeast-1.amazonaws.com/prod/get-post",{title:this.state.title})).data.body
            await this.setState({
                text:post['text'],
                modifiedTime:post['content']['modifiedTime'],
                comments:post['comments']
            })
        }catch(err) {
            alert(err)
        }finally{
            this.setState({isFetching:false})
        }
    }
    render() {
        if (this.state.isFetching){
            return (
                <LoadingFade>
                    <Loader/>
                </LoadingFade>
            )
        }
        return (
            <Container>
                <OPBlogCell 
                    text={this.state.text}
                    title={this.state.title}
                    modifiedTime={this.state.modifiedTime}
                />
                {
                    this.state.comments.map(({text, owner}, idx) => {
                        return (
                            <CommentBlogCell 
                                text={text}
                                from={owner}
                                key={idx}
                            />
                        )
                    })
                }
                {
                    (get(this.props, 'user.email', '').length > 0) && (
                        <InputBlogCell 
                            fromTitle={this.state.title}
                        />
                    )
                }
            </Container>
        );
    }
}

export default Post;
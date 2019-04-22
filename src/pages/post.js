import React, { Component } from "react";
import styled from "styled-components";
import { OPBlogCell, CommentBlogCell } from "../components";

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

class Post extends Component {
    render() {
        return (
            <Container>
                <OPBlogCell />
                <CommentBlogCell />
                <CommentBlogCell />
                <CommentBlogCell />
                <CommentBlogCell />
                <CommentBlogCell />
            </Container>
        );
    }
}

export default Post;
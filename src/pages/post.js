import React, { Component } from "react";
import styled from "styled-components";
import { OPBlogCell } from "../components";

const Container = styled.section`
box-sizing: border-box;
padding: 10px 7px;
`;

class Post extends Component {
    render() {
        return (
            <Container>
                <OPBlogCell />
            </Container>
        );
    }
}

export default Post;
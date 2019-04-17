import React, { Component } from "react";
import styled from "styled-components";
import { OPBlogCell } from "../components";

const Container = styled.section``;

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
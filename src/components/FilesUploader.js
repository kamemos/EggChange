import React, { Component } from "react";
import styled from 'styled-components';
import { FileSelector } from "./form";

const Container = styled.div`
box-sizing: border-box;
padding: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

class FilesUploader extends Component {
    render() {
        return (
            <Container>
                Files Uploader
                <FileSelector />
            </Container>
        );
    }
}

export default FilesUploader;
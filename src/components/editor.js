import React,{ Component } from 'react'
// import MediumEditor from 'medium-editor'
import styled from 'styled-components'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/default.css'
import Editor from './react-medium-editor';
import { get } from "lodash";

const BaseSize = 20;
const Base = {
    normal: {
        size: BaseSize,
        lheight: 1.2*BaseSize
    },
    h1: {
        size: (36/15)*BaseSize,
        lheight: (36/15)*BaseSize,
        spaceBottom: 0.5*(36/15)*BaseSize,
        spaceTop: 10
    },
    h2: {
        size: (30/15)*BaseSize,
        lheight: (30 / 15) * BaseSize
    },
    h3: {
        size: (24/15)*BaseSize,
        lheight: (24/15)*BaseSize
    },
    h4: {
        size: (20/15)*BaseSize,
        lheight: (20 / 15) * BaseSize
    },
}

export const StyleContainer = styled.div`
    /* margin: 0px 10px; */
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: ${Base.normal.size}px;
    line-height: ${Base.normal.lheight}px;

    h1 {
        font-size: ${Base.h1.size}px;
        font-weight: bold;
        text-align: center;
        margin-top: ${Base.h1.spaceTop}px;
        margin-bottom: ${Base.h1.spaceBottom}px;
        padding-bottom: ${Base.h1.spaceBottom}px;
        line-height: ${Base.h1.lheight}px;
        letter-spacing: -2px;
        border-bottom: 1px solid #dbdbdb;
    }
    
    h2 {
        font-size: ${Base.h2.size}px;
        line-height: ${Base.h2.size}px;
    }
    
    h3 {
        font-size: ${Base.h3.size}px;
        line-height: ${Base.h3.size}px;
    }
    
    h4 {
        font-size: ${Base.h4.size}px;
        line-height: ${Base.h4.size}px;
    }
    
    p {
        /* margin-bottom: 40px; */
        margin: 0px;
    }
    
    a {
        color:black;
    }
    
    a:hover {
        color:green;
    }
    
    pre {
        font-family: 'Menlo', monospace;
        font-size: 15px;
        background-color: #f0f0f0;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        color: #666;
    }
    
    blockquote {
        display: block;
        padding-left: 20px;
        border-left: 6px solid #df0d32;
        margin-left: -15px;
        padding-left: 15px;
        font-style: italic;
        color: #555;
    }

    *:focus {
        outline: none;
    }
`;

class TextEditor extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: get(props, "text", "")
        }
    }

    handleChange = (text, medium) => {
        // this.setState({ text: text });
        if(this.props.onChange) {
            this.props.onChange(text, medium);
        }
    }

    render(){
        return (
            <StyleContainer>
                {
                    // <div  className='editable'/>
                }
                <Editor
                    tag="div"
                    text={ this.state.text }
                    onChange={this.handleChange}
                    options={{
                        toolbar: {
                            allowMultiParagraphSelection: true,
                            buttons: [
                                'bold', 'italic', 'underline', 'anchor',
                                'h1', 'h2', 'h3', 'h3', 'quote',
                                'strikethrough', 'indent', 'outdent',
                                'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'
                            ],
                            diffLeft: 0,
                            diffTop: -10,
                            firstButtonClass: 'medium-editor-button-first',
                            lastButtonClass: 'medium-editor-button-last',
                            relativeContainer: null,
                            standardizeSelectionStart: false,
                            static: false,
                            /* options which only apply when static is true */
                            align: 'center',
                            sticky: false,
                            updateOnEmptySelection: false
                        }
                    }}
                />
            </StyleContainer>
        )
    }
}

export default TextEditor;
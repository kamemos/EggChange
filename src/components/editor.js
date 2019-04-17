import React,{ Component } from 'react'
// import MediumEditor from 'medium-editor'
import styled from 'styled-components'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/default.css'
import Editor from 'react-medium-editor';

// const BaseSize = 20;
// const BaseRatio = {
//     H1: (36/15),
//     H2: (30/15),
//     H3: (24/15),
//     H4: (20/15),
// }

const Style = styled.div`
    /* margin: 0px 10px; */
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 30px;
    line-height: 30px;

    h1 {
        font-size: 68px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 40px;
        letter-spacing: -2px;
        border-bottom: 1px solid #dbdbdb;
    }
    
    h2 {
        font-size: 40px;
        line-height: 42px;
    }
    
    h3 {
        font-size: 43px;
        line-height: 22px;
    }
    
    h4 {
        font-size: 43px;
        line-height: 28px;
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
`

class TextEditor extends Component{

    // componentDidMount(){
    //     var editor = new MediumEditor('.editable')
    // }
    state = {
        text: ""
    }

    handleChange = (text, medium) => {
        this.setState({ text: text });
        if(this.props.onChange) {
            this.props.onChange(text, medium);
        }
    }

    render(){
        return (
            <Style>
                {
                    // <div  className='editable'/>
                }
                <Editor
                    tag="div"
                    text={this.state.text}
                    onChange={this.handleChange}
                    options={{
                        toolbar: {
                            allowMultiParagraphSelection: true,
                            buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
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
            </Style>
        )
    }
}

export default TextEditor
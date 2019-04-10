import React,{ Component } from 'react'
import MediumEditor from 'medium-editor'
import styled from 'styled-components'
import 'medium-editor/dist/css/medium-editor.min.css'
import 'medium-editor/dist/css/themes/default.css'

const Style = styled.div`

    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 30px;
    line-height: 20px;

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
        margin-bottom: 40px;
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

class Editor extends Component{

    componentDidMount(){
        var editor = new MediumEditor('.editable')
    }

    render(){
        return (
            <Style>
                <div  className='editable'/>
            </Style>
        )
    }
}

export default Editor
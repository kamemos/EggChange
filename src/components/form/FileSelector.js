import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { misc } from '../../helpers';

const Style = styled.div`
.inputfile {
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

.inputfile + label {
    max-width: 80%;
    font-size: 16px;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    padding: 8px 16px 8px 16px;
}

.inputfile:focus + label,
.inputfile.has-focus + label {
    outline: none;
}

.inputfile + label svg {
    vertical-align: middle;
    fill: currentColor;
    margin-top: -0.25em;
    margin-right: 0.25em;
}

.inputfile-2 + label {
    border-radius: 4px;
    color: #3190FF;
    border: 2px solid currentColor;
}

.inputfile-2:focus + label,
.inputfile-2.has-focus + label,
.inputfile-2 + label:hover {
    background-color: #3190FF;
    color: #fff;
}

.input-container.center {
    display: inline-flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.input-container .message {
    width: 100%;
    text-align: center
}

.preview-img {
    position: relative;
    box-sizing: border-box;
    font-size: 5px;
    margin: calc(3*5px) 5px 5px 5px;
    img {
        z-index: 10;
        border: 1px solid #aaa;
        height: 150px;
    }
    &> .exit-btn {
        z-index: 11;
        display: inline-block;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        width: 0.75em;
        height: 0.75em;
        position: relative;
        border: none;
        -webkit-border-radius: 1em;
        border-radius: 1em;
        font: normal 8em/normal Arial, Helvetica, sans-serif;
        color: rgba(0,0,0,1);
        -o-text-overflow: clip;
        text-overflow: clip;
        background: #f44336;
        -webkit-transform: rotateZ(471.54426539266757deg);
        transform: rotateZ(471.54426539266757deg);

        box-sizing: border-box;
        border-radius: 50%;
        position: absolute;
        top: -0.375em;
        right: -0.375em;

        &:hover {
            background: #e91e63;
            -webkit-transition: background 350ms cubic-bezier(0.42, 0, 0.58, 1) 10ms, all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;
            -moz-transition: background 350ms cubic-bezier(0.42, 0, 0.58, 1) 10ms, all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;
            -o-transition: background 350ms cubic-bezier(0.42, 0, 0.58, 1) 10ms, all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;
            transition: background 350ms cubic-bezier(0.42, 0, 0.58, 1) 10ms, all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;
            -webkit-transform: rotateX(-1.7188733853924696deg) rotateZ(19.48056503444799deg)   ;
            transform: rotateX(-1.7188733853924696deg) rotateZ(19.48056503444799deg)   ;
        }

        &:active {
            background: #f44336;
            -webkit-box-shadow: 2px 2px 9px 1px rgba(0,0,0,0.5) inset;
            box-shadow: 2px 2px 9px 1px rgba(0,0,0,0.5) inset;
            -webkit-transition: none;
            -moz-transition: none;
            -o-transition: none;
            transition: none;
            -webkit-transform: rotateZ(471.54426539266757deg);
            transform: rotateZ(471.54426539266757deg);
        }

        &::before {
            display: inline-block;
            -webkit-box-sizing: content-box;
            -moz-box-sizing: content-box;
            box-sizing: content-box;
            width: 0.45em;
            height: 0.1em;
            position: absolute;
            content: "";
            top: 0.33em;
            left: 0.155em;
            border: none;
            font: normal 100%/normal Arial, Helvetica, sans-serif;
            color: rgba(0,0,0,1);
            -o-text-overflow: clip;
            text-overflow: clip;
            background: #ffffff;
            text-shadow: none;
            -webkit-transform: rotateZ(24.064227395494576deg)   ;
            transform: rotateZ(24.064227395494576deg)   ;
        }

        &::after {
            display: inline-block;
            -webkit-box-sizing: content-box;
            -moz-box-sizing: content-box;
            box-sizing: content-box;
            width: 0.45em;
            height: 0.1em;
            position: absolute;
            content: "";
            top: 0.33em;
            left: 0.155em;
            border: none;
            font: normal 100%/normal Arial, Helvetica, sans-serif;
            color: rgba(0,0,0,1);
            -o-text-overflow: clip;
            text-overflow: clip;
            background: #ffffff;
            text-shadow: none;
            -webkit-transform: rotateZ(-66.46310423517549deg);
            transform: rotateZ(-66.46310423517549deg);
        }
    }
}

@media screen and (max-width: 1024px) {
    .input-container > .name {
        width: 100%;
        text-align: center;
    }

    .inputfile {
        position: absolute;
    }
}

`;

const PreviewImg = (props) => {
    const { onExit, parentClass, parentStyle, alt, ...other } = props;
    return (
        <div
            className={`preview-img ${parentClass ? parentClass : ''}`}
            style={parentStyle}
        >
            <img
                alt={alt}
                {...other}
            />
            <div
                className="exit-btn"
                onClick={onExit}
            />
        </div>
    );
}

class FileSelector extends Component {
    state = {
        name: misc.randomHash(15),
        isWarning: false,
        isStart: false,
        filesBuffer: [],
        imgPreviews: []
    }
    files = []
    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onFileRemove = (index) => {
        if (index < 0 || index >= this.state.filesBuffer.length) return;
        let newBuffer = Array.from(this.state.filesBuffer);
        newBuffer.splice(index, 1);
        this.files = newBuffer;

        const { onChange } = this.props;
        typeof onChange === "function" && onChange(newBuffer, this._me.files);
        this.setState({
            'filesBuffer': newBuffer
        }, this.onUpdatePreviews);
    }

    onUpdatePreviews = () => {
        const files = this.state.filesBuffer;
        const filesPromise = files.reduce((arr, file) => {
            arr.push(new Promise((res) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    res(reader.result)
                }
            }));
            return arr;
        }, []);

        Promise.all(filesPromise).then((datas) => {
            this.setState({
                'imgPreviews': datas
            })
        })
    }

    onFileTouch = () => {
        this._me.value = '';
        this.setState({
            'imgPreviews': [],
            'filesBuffer': []
        }, this.onUpdatePreviews);
    }

    onFileChange = () => {
        if (this._isMounted) {
            const { onChange } = this.props;

            const files = this._me.files;

            if (files.length > 0) {
                let filesBuffer = [];
                Array.prototype.push.apply(filesBuffer, files);
                this.setState({
                    'filesBuffer': filesBuffer
                }, () => {
                    this.onUpdatePreviews();
                    this.files = files;
                    typeof onChange === "function" && onChange(this.state.filesBuffer, this._me.files);
                })
            } else {
                this.setState({
                    'imgPreviews': [],
                    'filesBuffer': []
                }, () => {
                    typeof onChange === "function" && onChange([], this._me.files);
                    this._me.value = "";
                    this.files = [];
                })
            }
            if (!this.state.isStart) {
                return (
                    this.setState({
                        isStart: true
                    })
                );
            }
            if (this._me.files.length > 0 && this.state.isWarning) {
                this.setState({
                    isWarning: false
                })
            } else if (this._me.files.length <= 0 && !this.state.isWarning) {
                this.setState({
                    isWarning: true
                })
            } else {
                this.forceUpdate();
            }
        }
    }

    render() {
        const { refFunc, multiple, text, imagePreview, previewRender, ...props } = this.props;
        const { name, isWarning, isStart, enableWarning, imgPreviews } = this.state;
        let displayStr = typeof text === "string" && text.length >= 0 ? text : 'Select File';

        const PreviewRender = previewRender;

        if (this._isMounted && this.state.filesBuffer.length > 0) {
            if (multiple) {
                displayStr = `${this.state.filesBuffer.length} File${this.state.filesBuffer.length > 1 ? 's' : ''} Selected`
            } else if (this.state.filesBuffer.length === 1) {
                displayStr = 'File Selected'
            }
        }

        const label = (
            <label htmlFor={name} onClick={this.onFileTouch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                    <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                </svg>
                <span className="name">{displayStr}</span>
            </label>
        )

        return (
            <Style>
                <div className="input-container inline-1 center" >
                    <input
                        {...props}
                        ref={(me) => {
                            this._me = me;
                            refFunc && refFunc(me);
                        }}
                        type="file"
                        name={name}
                        id={name}
                        className="inputfile inputfile-2"
                        onChange={this.onFileChange}
                        multiple={multiple ? true : false}
                    />
                    {label}
                    {
                        enableWarning && isStart && <div
                            className="message"
                            style={{ color: !isWarning ? '#1db101' : 'red' }}
                        >
                            {!isWarning ? 'File selected' : 'No File Selected'}
                        </div>
                    }
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {
                        (imagePreview) && imgPreviews.map((src, ind) => {
                            if (previewRender) {
                                return <PreviewRender onExit={() => this.onFileRemove(ind)} alt={`file-${ind}`} key={ind} src={src} />
                            }
                            return <PreviewImg onExit={() => this.onFileRemove(ind)} alt={`file-${ind}`} key={ind} src={src} />
                        })
                    }
                </div>
            </Style>
        );
    }
}

FileSelector.propTypes = {
    refFunc: PropTypes.func,
    className: PropTypes.string,
    text: PropTypes.string,
    onChange: PropTypes.func,
    imagePreview: PropTypes.bool,
    multiple: PropTypes.bool,
    previewRender: PropTypes.func
}

/* Getting value from references from this file seclector
* Should use normal `ref` and then `files` instead. For example
* `<FileSelector ref={(me) => this.fileSelector = me} />`
* Then when you really need the file used
* `this.fileSelector.files` instead.
* 
* Getting value from refFunc should be avoid
* Because API limitation, when remove files from the imagePreview
* It won't be removing the actual file pointer.
*/

export default FileSelector;
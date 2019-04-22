import React, { Component } from "react";
import Dropzone from 'react-dropzone';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ImageLinkPreview } from "./form";
import _ from "lodash";

const Style = styled.section`
* {
    user-select: none;
}
background-color: #FFD958;
/* width: 100%;
max-width: 100vw; */
/* height: 100%; */
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
position: relative;
box-sizing: border-box;
padding-bottom: 10px;

.content-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    box-sizing: border-box;
    margin-top: 15px;

    & > * {
        margin: 5px;
    }
}

.camera-container {
    margin: 0px;
}

.content-tab {
    width: 100%;
    display: flex;
    & > div {
        width: 50%;
        box-sizing: border-box;
        padding: 10px 15px;
        background-color: #FFD958;
        filter: brightness(1.1);
        &.active {
            filter: none;
        }
        &:hover {
            filter: brightness(0.95);
        }
        &:active {
            filter: brightness(0.9);
        }
    }
}

.content-upload {
    display: flex;
    margin-top: 5px;
    .btn-upload {
        display: block;
        background: none;
        border: 2px dashed green;
        color: green;
        padding: 10px 10px;
        font-size: 1rem;
        border-radius: 5px;
        flex: 1 1 1;
        cursor: pointer;

        &:hover {
            color: #FFF;
            background: green;
            border: 2px solid transparent;
        }
        &:active {
            color: #FFF;
            background: green;
            border: 2px solid transparent;
            filter: brightness(0.9);
        }

        &:disabled {
            color: #666;
            background: transparent;
            border: 2px dashed #666;
            cursor: not-allowed;
        }
    }
}

.hide {
    display: none;
}
`;

const getColor = (props) => {
    if (props.isDragReject) {
        return '#c66';
    }
    if (props.isDragActive) {
        return '#6c6';
    }
    return '#666';
};

const Container = styled.div`
width: 130px;
height: 130px;
min-width: 130px;
min-height: 130px;
max-width: 130px;
max-height: 130px;
border-width: 2px;
border-radius: 5px;
border-color: ${props => getColor(props)};
border-style: ${props => props.isDragReject || props.isDragActive ? 'solid' : 'dashed'};
background-color: ${props => props.isDragReject || props.isDragActive ? '#eee' : ''};
display: flex;
align-items: center;
justify-content: center;
position: relative;

.content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    user-select: none;

    svg.faIcon {
        color: ${props => getColor(props)};
        font-size: 4rem;
    }

    img {
        max-width: 120px;
        max-height: 120px;
        object-fit: contain;
    }

    img ~ div {
        background-color: #FFF;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        position: absolute;
        top: 0px;
        right: 0px;
        transform: translate(50%, -50%);
        overflow: visible;

        svg {
            width: 2rem;
            height: 2rem;
            color: red;
            filter: brightness(0.95);
            transform: translate(-5%, -5%);

            &:hover {
                filter: brightness(1);
            }
            &:active {
                filter: brightness(0.9);
            }
        }
    }
}
`;

// const blobFromBase64String = (base64String, type) => {
//     const byteArray = Uint8Array.from(
//         atob(base64String)
//             .split('')
//             .map(char => char.charCodeAt(0))
//     );
//     return new Blob([byteArray], { type: type });
// };

class ImageZone extends Component {
    state = {
        image: null,
        activeTab: 0,
        urlResult: null,
        url: "",
        isMountURL: true
    }
    onSetImage = (accepted) => {
        if (accepted.length > 0) {
            this.setState({
                image: Object.assign(accepted[0], {
                    preview: URL.createObjectURL(accepted[0])
                })
            })
        }
    }
    onClearImage = (e) => {
        e.preventDefault();
        this.setState({
            image: null
        });
        return false;
    }
    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        URL.revokeObjectURL(this.state.image.preview)
    }
    onChangeActiveTab = (tab) => () => {
        this.setState({
            activeTab: tab
        });
    }
    onURLUpdate = (url, result) => {
        this.setState({
            url,
            urlResult: result
        })
    }
    onAdd = () => {
        if (typeof (this.props.onAdd) !== "function") {
            return;
        }
        const { activeTab, image, urlResult, url } = this.state;
        if(activeTab === 0) {
            // Local image
            const _this = this;
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = function () {
                const base64data = reader.result;
                _this.props.onAdd(base64data);
                _this.setState({
                    image: null
                })
            }
        } else if (urlResult) {
            // Remote image
            this.props.onAdd(url);
            this.setState({
                urlResult: null,
                url: "",
                isMountURL: false
            }, () => {
                this.setState({
                    isMountURL: true
                })
            })
        }
    }
    render() {
        const { image, activeTab, urlResult, isMountURL } = this.state;
        const { className } = this.props;
        return (
            <Style
                className={_.defaultTo(className, "")}
            >
                <div className="content-tab">
                    <div
                        className={(activeTab === 0) ? "active" : ""}
                        onClick={this.onChangeActiveTab(0)}
                    >
                        Upload Image
                    </div>
                    <div
                        className={(activeTab === 1) ? "active" : ""}
                        onClick={this.onChangeActiveTab(1)}
                    >
                        From URL
                    </div>
                </div>
                <div
                    className={(activeTab === 0) ? "content-container" : "content-container hide"}
                >
                    <Dropzone
                        accept="image/*"
                        onDrop={this.onSetImage}
                    >
                        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles }) => {
                            return (
                                <Container
                                    isDragActive={isDragActive}
                                    isDragReject={isDragReject}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <div className="content">
                                        {
                                            (image === null) ? [
                                                <FontAwesomeIcon
                                                    key={1}
                                                    icon={faImage}
                                                    className="faIcon"
                                                />,
                                                <span key={2}>
                                                    {isDragAccept ? 'Drop' : 'Drag'} image here
                                                </span>
                                            ] : [
                                                    <img
                                                        src={image.preview}
                                                        alt="preview"
                                                        key={1}
                                                        id="dragNdropPreview"
                                                    />,
                                                    <div
                                                        key={2}
                                                        onClick={this.onClearImage}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTimesCircle}
                                                        />
                                                    </div>
                                                ]
                                        }
                                    </div>
                                </Container>
                            )
                        }}
                    </Dropzone>
                </div>
                <div
                    className={(activeTab === 1) ? "content-container" : "content-container hide"}
                >
                    {
                        (isMountURL) && (
                            <ImageLinkPreview
                                onChange={this.onURLUpdate}
                                placeholder="Image url"
                            />
                        )
                    }
                </div>
                <div className="content-upload">
                    <button
                        className="btn-upload"
                        disabled={(activeTab === 0 && image === null) || (activeTab === 1 && !_.defaultTo(urlResult, false))}
                        onClick={this.onAdd}
                    >Add Image</button>
                </div>
            </Style>
        );
    }
}

export default ImageZone;
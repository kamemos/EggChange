import React, { Component } from 'react';
import styled from 'styled-components';
import InputBox from '../inputBox';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Loader3 } from '../loaders';

const Style = styled.div`
display: flex;
flex-direction: column;
width: 250px;

.error-wrapper {
    background: #FFA061;
    border-radius: 5px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    .container {
        transform: scale(0.7);
    }
}

.loader-wrapper {
    background: #FFE691;
    .container {
        transform: scale(0.7);
    }
}

.onLoad-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    position: relative;
    height: auto;
    width: 100%;

    &.no-show {
        width: 0;
        height: 0;
        position: absolute;
        top: -100vh;
        left: -100vw;
    }
}
`;

class Image extends Component {
    state = {
        isError: false,
        isLoading: true,
    }
    componentDidUpdate(prevProps) {
        if(prevProps.Src !== this.props.Src) {
            this.setState({
                isError: false,
                isLoading: true
            })
        }
    }
    onError = () => {
        setTimeout(() => {
            if(this._isMounted) {
                this.setState({
                    isError: true,
                    isLoading: false
                }, () => {
                    if(typeof(this.props.onChange) === "function") {
                        this.props.onChange(false);
                    }
                })
            }
        }, this.props.timeout)
    }
    onLoad = () => {
        setTimeout(() => {
            if(this._isMounted) {
                this.setState({
                    isError: false,
                    isLoading: false
                }, () => {
                    if (typeof (this.props.onChange) === "function") {
                        this.props.onChange(true);
                    }
                })
            }
        }, this.props.timeout)
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const { Src } = this.props;
        const { isError, isLoading } = this.state;
        return (
            (isLoading) ? (
                <div className="loader-wrapper">
                    <div className="container">
                        <Loader3 />
                    </div>
                    <img
                        alt="you-should-not-see-this"
                        className="no-show"
                        src={Src}
                        onError={this.onError}
                        onLoad={this.onLoad}
                    />
                </div>
            ) : (isError) ? (
                <div className="error-wrapper">
                    Load Image Error
                </div>
            ) : (
                <div className="onLoad-wrapper">
                    <img
                        src={Src}
                        alt="you-should-not-see-this-either"
                    />
                </div>
            )
        );
    }
}

Image.defaultProps = {
    timeout: 0,
}

Image.propTypes = {
    Src: PropTypes.string.isRequired,
    timeout: PropTypes.number,
    onChange: PropTypes.func
}

class ImageLinkPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bufferUrl: _.get(props, 'initialUrl', ''),
            url: _.get(props, 'initialUrl', ''),
            result: null
        }
        
        // Declare and define this function only once
        // If not, it will always change and debounce won't work :-P
        this.onUpdateUrl = _.debounce(this.onUpdateUrl, props.timeout)
        this.url_val = _.get(props, 'initialUrl', '');
    }

    onUpdateUrl = (new_input) => {
        this.setState({
            bufferUrl: new_input,
            url: new_input
        });
        this.url_val = new_input;
    }

    onChange = (e) => {
        // Free synthetic event for synchronous run
        const new_input = _.cloneDeep(e.target.value);

        if (this.props.isDebounce) {
            // Actual debounce
            this.setState({
                bufferUrl: new_input
            })
            this.onUpdateUrl(new_input);
        } else {
            // Set immediately
            this.setState({
                bufferUrl: new_input
            })
            if(typeof (this.props.onChange) === "function") {
                this.props.onChange(new_input, this.state.result);
            }
            this.url_val = new_input;
        }
    }

    onClickPreview = () => {
        this.setState({
            url: this.state.bufferUrl
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.initialUrl !== this.props.initialUrl) {
            this.onUpdateUrl(this.props.initialUrl)
        }
    }

    onUpdateStatus = (result) => {
        this.setState({
            result
        }, () => {
            if (typeof (this.props.onChange) === "function") {
                this.props.onChange(this.state.url, result);
            }
        })
    }
    
    render() {
        const { url, bufferUrl } = this.state;
        const { isDebounce, placeholder } = this.props;
        return (
            <Style>
                <Image
                    Src={url}
                    timeout={750}
                    onChange={this.onUpdateStatus}
                />
                <InputBox
                    onChange={this.onChange}
                    value={bufferUrl.trim() === "/picture/2754579.png" ? "" : bufferUrl}
                    placeholder={placeholder}
                />
                {
                    (!isDebounce) && (
                        <button
                            onClick={this.onClickPreview}
                        >
                            Preview
                        </button>
                    )
                }
            </Style>
        );
    }
}

// Original solution can be found here
// https://stackoverflow.com/questions/51177064/how-to-use-debounce-in-reactjs

// Tested url
// https://www.w3schools.com/w3css/img_lights.jpg

ImageLinkPreview.defaultProps = {
    isDebounce: true,
    timeout: 1000
}

ImageLinkPreview.propTypes = {
    isDebounce: PropTypes.bool,
    timeout: PropTypes.number,
    onChange: PropTypes.func,
    initialUrl: PropTypes.string,
    placeholder: PropTypes.string
}

export default ImageLinkPreview;
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { misc } from '../helpers';
import _ from 'lodash';

const Style = styled.div`
display: inline-block;
background-color: ${ p => p.background };
width: ${ p => p.width};
min-width: ${ p => p.width};
max-width: ${ p => p.width};
height: ${ p => p.height};
min-height: ${ p => p.height};
max-height: ${ p => p.height};
background-size: cover;
background-position: top center;
background-image: url('${p => p.backgroundSrc}');

${p => p.isHoverEffect ? misc.hoverEffect() : ''}

img {
    position: absolute;
    top: -150vh;
    left: -150vw;
    opacity: 0;
    visibility: hidden;
    width: 0px;
    height: 0px;
    max-width: 0px;
    max-height: 0px;
}
`;

class Image extends Component {
    state = {
        isLoading: true,
        isError: false
    }
    onError = () => {
        this.setState({
            isLoading: false,
            isError: true
        }, () => {
            if(typeof(this.props.onChange) === "function") {
                this.props.onChange(false);
            }
        })
    }
    onLoad = () => {
        this.setState({
            isLoading: false
        }, () => {
            if(typeof(this.props.onChange) === "function") {
                this.props.onChange(true);
            }
        })
    }
    componentDidUpdate(prevProps) {
        if(prevProps.Src !== this.props.Src) {
            this.setState({
                isLoading: true,
                isError: false
            });
        }
    }
    render() {
        const { Src, LoadingSrc, FallbackSrc, alt, width, height, background, isHoverEffect, ...other } = this.props;
        const { isLoading, isError } = this.state;
        return (
            <Style
                {...other}
                backgroundSrc={(isLoading) ? LoadingSrc : (isError) ? FallbackSrc : Src}
                width={width}
                height={height}
                background={background}
                isHoverEffect={isHoverEffect}
            >
                {
                    (isLoading) && (
                        <img
                            src={_.defaultTo(Src, '')}
                            alt={alt}
                            onError={this.onError}
                            onLoad={this.onLoad}
                        />
                    )
                }
            </Style>
        );
    }
}

Image.defaultProps = {
    alt: "Image",
    background: "#000",
    isHoverEffect: false
}

Image.propTypes = {
    Src: PropTypes.string,
    LoadingSrc: PropTypes.string,
    FallbackSrc: PropTypes.string,
    onChange: PropTypes.func,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    background: PropTypes.string,
    isHoverEffect: PropTypes.bool
}

export default Image;
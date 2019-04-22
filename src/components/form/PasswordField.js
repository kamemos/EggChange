/* This is field wrapper when using with formik */
import React, { Component } from 'react';
import InputBox from '../inputBox';
import withField from './withField';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordStyle = styled.article`
position: relative;
input {
    width: 100%;
}
div.icon {
    position: absolute;
    top: 50%;
    right: 7px;
    transform: translateY(-50%);
    opacity: 0.3;

    &:hover {
        opacity: 0.4;
    }

    &:active {
        opacity: 0.5;
    }
}
`;

class PasswordField extends Component {
    state = {
        isShowPassword: false
    }
    onShow = () => {
        this.setState({
            isShowPassword: true
        })   
    }
    onHide = () => {
        this.setState({
            isShowPassword: false
        })   
    }
    render () {
        const { isShowPassword } = this.state;
        return (
            <PasswordStyle>
                <InputBox
                    {...this.props}
                    type={isShowPassword ? "text" : "password"}
                />
                <div
                    className="icon"
                    onMouseDown={this.onShow}
                    onMouseUp={this.onHide}
                >    
                    {
                        (isShowPassword) ? (
                            <FontAwesomeIcon
                                icon={faEye}
                                onClick={this.onToggleView}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faEyeSlash}
                                onClick={this.onToggleView}
                            />
                        )
                    }
                </div>
            </PasswordStyle>
        );
    }
}

export default withField(PasswordField);
import SelectBox from '../selectBox';
import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

const Style = styled.div`
display: flex;
flex-direction: column;

label {
    ${ p => p.isBold ? "font-weight: 600;" : ""}
    margin-bottom: 5px;
    margin-left: 5px;
    font-size: 1rem;
}
span {
    color: #F00;
    text-align: center;
    width: 100%;
    display: inline-block;
}
`;

class SelectBoxForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTouched: false,
            isFocus: false,
            value: props.defaultValue,
            isError: false
        }
    }
    onChange = (e) => {
        const { onChange } = this.props;
        this.setState({
            value: e.target.value
        });
        if(onChange) {
            onChange(e.target.value);
        }
    }
    onFocus = (e) => {
        this.setState({
            isFocus: true
        }, this.onCheckError)
    }
    onBlur = (e) => {
        this.setState({
            isTouched: true,
            isFocus: false
        }, this.onCheckError)
    }
    onCheckError = () => {
        const { defaultValue, timeout } = this.props;
        const { isTouched, isFocus, value } = this.state;

        const isError = ((isTouched && !(isFocus) && (value === defaultValue)));
        this.setState({
            isError: isError
        }, () => {
            if (isError && timeout !== -1) {
                setTimeout(() => {
                    if(this._isMounted) {
                        this.setState({
                            isError: false
                        })
                    }
                }, timeout);
            }
        });
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const { options, label, errorMsg, isLabelBold } = this.props;
        const { value, isError } = this.state;
        return (
            <Style
                isBold={isLabelBold}
            >
                <label>{label}</label>
                <SelectBox
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    value={value}
                >
                    {
                        options.map((val, idx) => (
                            <option key={idx} value={val}>{val}</option>
                        ))
                    }
                </SelectBox>
                <Fade bottom collapse when={isError}>
                    <span>{errorMsg}</span>
                </Fade>
            </Style>
        );
    }
}

SelectBoxForm.defaultProps = {
    isLabelBold: false,
    timeout: -1
}

SelectBoxForm.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultValue: PropTypes.string,
    errorMsg: PropTypes.string,
    onChange: PropTypes.func,
    isLabelBold: PropTypes.bool,
    timeout: PropTypes.number
}

export default SelectBoxForm;
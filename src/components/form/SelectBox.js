import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Fade from 'react-reveal/Fade';
import Select from 'react-select';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { randomHash } from '../../helper';

const Style = styled.div``;

class SelectBox extends Component {
    state = {
        id: randomHash(15)
    }
    onChange = (val) => {
        (this.props.onChange) && (
            this.props.onChange(val)
        )
    }
    onBlur = () => {
        (this.props.onBlur) && (
            this.props.onBlur()
        );
    }
    render() {
        const { id } = this.state;
        const { label, multi, value, ...props } = this.props;
        return (
            <Style>
                <label htmlFor={id}>{ label }</label>
                <Select
                    id={id}
                    options={options}
                    multi={multi}
                    onChange={this.onChange}
                    obBlur={this.onBlur}
                    value={value}
                />
            </Style>
        );
    }
}

SelectBox.defaultProps = {
    multi: false
}

SelectBox.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    multi: PropTypes.bool
}

export default SelectBox;
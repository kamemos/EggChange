/* This is field wrapper when using with formik */
import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import Fade from 'react-reveal/Fade'
import PropTypes from 'prop-types'

const FieldStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }
  input {
    margin-bottom: 1px;
  }
  .error {
    color: #f00;
    font-size: 0.75rem;
  }
`

const withField = ChildComponent => {
  class Field extends Component {
    state = {
      isShowError: false,
      isFocus: true
    }
    onChange = e => {
      const { onChange } = this.props
      onChange(e)
    }
    componentDidUpdate = (prevProps, prevState) => {
      const { errors, touched, fieldName, timeout } = this.props
      const { isShowError } = this.state

      if (
        _.get(errors, fieldName, false) &&
        _.get(touched, fieldName, false) &&
        !isShowError &&
        !prevState.isShowError &&
        prevState.isFocus
      ) {
        this.setState({
          isShowError: true
        })
        if (timeout !== -1) {
          setTimeout(() => {
            if (this._isMounted) {
              this.setState({
                isShowError: false
              })
            }
          }, timeout)
        }
      } else if (_.get(errors, fieldName, '').length === 0 && isShowError) {
        this.setState({
          isShowError: false
        })
      }
    }
    onBlur = e => {
      const { handleBlur } = this.props
      handleBlur(e)
      this.setState({
        isFocus: false
      })
    }
    onFocus = e => {
      this.setState({
        isFocus: true
      })
    }
    componentDidMount() {
      this._isMounted = true
    }
    componentWillUnmount() {
      this._isMounted = false
    }
    render() {
      const { isShowError } = this.state
      const {
        errors,
        values,
        handleChange,
        fieldName,
        label,
        isLabel,
        ...props
      } = this.props
      return (
        <FieldStyle>
          {
            (isLabel) && (<label htmlFor={fieldName}>{label}</label>)
          }
          <ChildComponent
            {...props}
            id={fieldName}
            value={_.get(values, fieldName, '')}
            onChange={handleChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          {
            <Fade bottom collapse when={isShowError}>
              <span className="error">{_.get(errors, fieldName, '')}</span>
            </Fade>
          }
        </FieldStyle>
      )
    }
  }

  Field.defaultProps = {
    timeout: -1,
    isLabel: true
  }

  Field.propTypes = {
    timeout: PropTypes.number,
    fieldName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isLabel: PropTypes.bool.isRequired
  }

  return Field
}

export default withField

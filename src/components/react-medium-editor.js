import React from 'react';
import ReactDOM from 'react-dom';

if (typeof document !== 'undefined') {
    var MediumEditor = require('medium-editor');
}

export default class ReactMediumEditor extends React.Component {
    static defaultProps = {
        tag: 'div'
    };

    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text
        };
    }

    componentDidMount() {
        const dom = ReactDOM.findDOMNode(this);

        this.medium = new MediumEditor(dom, this.props.options);
        this.medium.subscribe('editableInput', e => {
            this._updated = true;
            this.change(dom.innerHTML);
        });
        this.medium.trigger('editableInput', {}, dom);
        // window.medium = this.medium;
        // window.dom = ReactDOM.findDOMNode(this);
        // window.MediumEditor = MediumEditor;
        // setTimeout(() => {
        //     var x = document.createElement("IMG");
        //     x.setAttribute("src", "img_pulpit.jpg");
        //     x.setAttribute("width", "304");
        //     x.setAttribute("height", "228");
        //     x.setAttribute("alt", "The Pulpit Rock");
            
        //     const dom = ReactDOM.findDOMNode(this);
        //     // Insert after
        //     const refNode = this.medium.events.lastMousedownTarget;
        //     if (refNode === dom || refNode === null || typeof(refNode) === "undefined") {
        //         dom.appendChild(x);
        //     } else {
        //         refNode.parentNode.insertBefore(x, refNode.nextSibling);
        //     }

        //     this.medium.trigger('editableInput', {}, dom)
        // }, 10000);
    }

    componentDidUpdate() {
        this.medium.restoreSelection();
    }

    componentWillUnmount() {
        this.medium.destroy();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.text !== this.state.text && !this._updated) {
            this.setState({ text: nextProps.text });
        }

        if (this._updated) this._updated = false;
    }

    render() {
        const {
            options,
            text,
            tag,
            contentEditable,
            dangerouslySetInnerHTML,
            ...props
        } = this.props;
        props.dangerouslySetInnerHTML = { __html: this.state.text };

        if (this.medium) {
            this.medium.saveSelection();
        }

        return React.createElement(tag, props);
    }

    change(text) {
        if (this.props.onChange) this.props.onChange(text, this.medium);
    }
}

import styled from 'styled-components';
const styling = {
    defaultColor: '#aaa',
    highlightColor: '#3190FF',
    defaultLineColor: '#ccc',
    defaultBorderRadius: '4px',
    defaultLargeBorderRadius: '8px',
    size1: '0.375em',
    size2: '0.375em',
    factor: 0.05
}

const InputBox = styled.input`
outline: none;
padding: 0.2em 0.65em 0.1em 0.65em;
box-sizing: border-box;
border-radius: ${styling.defaultBorderRadius};
margin: 0;
border: thin solid rgba(0, 0, 0, 0.3);
font: inherit;
line-height: 1.5rem;

&:focus {
    border-color: #3190FF;
    box-shadow: 0px 0px 10px #3190FF33;

    outline: 0;
}

&:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
}
`;

export default InputBox;
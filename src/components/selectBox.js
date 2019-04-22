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

const Select = styled.select`
/* styling */
background-color: white;
border: thin solid rgba(0, 0, 0, 0.3);
border-radius: ${styling.defaultBorderRadius};
display: inline-block;
position: relative;
font: inherit;
line-height: 1.5em;
box-sizing: border-box;
padding: 0.2em 3.5em 0.1em 1em;
width: auto;

/* reset */
margin: 0;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
-webkit-appearance: none;
-moz-appearance: none;
background-image: linear-gradient(45deg, transparent 50%, ${styling.defaultColor} 50%), linear-gradient(135deg, ${styling.defaultColor} 50%, transparent 50%), linear-gradient(to right, ${styling.defaultLineColor}, ${styling.defaultLineColor});
background-position: calc(100% - 1.20em) calc(50% + ${styling.factor}*${styling.size1}), calc(100% - 0.9em) calc(50% + ${styling.factor}*${styling.size1}), calc(100% - 2.5em) 0.125em;
background-size: ${styling.size1} ${styling.size1}, ${styling.size1} ${styling.size1}, 1px 1.60em;
background-repeat: no-repeat;

option {
    width: 100%;
}

&:focus {
    background-image: linear-gradient(45deg, ${styling.highlightColor} 50%, transparent 50%), linear-gradient(135deg, transparent 50%, ${styling.highlightColor} 50%), linear-gradient(to right, ${styling.highlightColor} 50%,  #3190FF 50%);
    background-position: calc(100% - 0.9em) calc(50% + ${styling.factor}*${styling.size2}), calc(100% - 1.20em) calc(50% + ${styling.factor}*${styling.size2}), calc(100% - 2.5em) 0.125em;
    background-size: ${styling.size2} ${styling.size2}, ${styling.size2} ${styling.size2}, 1px 1.60em;
    background-repeat: no-repeat;
    border-color: #3190FF;
    color: #3190FF;
    outline: 0;
}

&:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
}
`;

export default Select;
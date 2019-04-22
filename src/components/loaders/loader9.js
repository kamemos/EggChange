/* This code is from https://codepen.io/TaniaLD/pen/oKxep */
import styled from 'styled-components';

const Loader = styled.div`
position: relative;
width: 40px;
height: 40px;

top: 40%;
top: -webkit-calc(50% - 20px);
top: calc(50% - 20px);
left: 43%;
left: -webkit-calc(50% - 20px);
left: calc(50% - 20px);

background-color: rgba(255, 255, 255, .2);

&:before{
	content: "";
	position: absolute;
	background-color: #fff;
	height: 10px;
	width: 10px;
	border-radius: 10px;
	-webkit-animation: loader7 2s ease-in-out infinite;
			animation: loader7 2s ease-in-out infinite;
}

&:after{
	content: "";
	position: absolute;
	background-color: #fff;
	top: 0px;
	left: 0px;
	height: 40px;
	width: 0px;
	z-index: 0;
	opacity: 1;
	-webkit-animation: loader72 10s ease-in-out infinite;
			animation: loader72 10s ease-in-out infinite;
}


@-webkit-keyframes loader7{
    0%{left: -12px; top: -12px;}
    25%{left:42px; top:-12px;}
    50%{left: 42px; top: 42px;}
    75%{left: -12px; top: 42px;}
    100%{left:-12px; top:-12px;}
}

@keyframes loader7{
    0%{left: -12px; top: -12px;}
    25%{left:42px; top:-12px;}
    50%{left: 42px; top: 42px;}
    75%{left: -12px; top: 42px;}
    100%{left:-12px; top:-12px;}
}

@-webkit-keyframes loader72{
    0%{width: 0px;}
    70%{width: 40px; opacity: 1;}
    90%{opacity: 0; width: 40px;}
    100%{opacity: 0;width: 0px;}
}

@keyframes loader72{
    0%{width: 0px;}
    70%{width: 40px; opacity: 1;}
    90%{opacity: 0; width: 40px;}
    100%{opacity: 0;width: 0px;}
}
`;

export default Loader;
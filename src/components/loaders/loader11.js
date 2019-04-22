/* This code is from https://codepen.io/TaniaLD/pen/oKxep */
import styled from 'styled-components';

const Loader = styled.div`
&:before{
	content: "";
	position: absolute;
	top: 0px;
	height: 12px;
	width: 12px;
	border-radius: 12px;
	-webkit-animation: loader9g 3s ease-in-out infinite;
			animation: loader9g 3s ease-in-out infinite;
}

position: relative;
width: 12px;
height: 12px;
top: 46%;
left: 46%;
border-radius: 12px;
background-color: #fff;

&:after{
	content: "";
	position: absolute;
	top: 0px;
	height: 12px;
	width: 12px;
	border-radius: 12px;
	-webkit-animation: loader9d 3s ease-in-out infinite;
			animation: loader9d 3s ease-in-out infinite;
}

@-webkit-keyframes loader9g{
	0%{	left: -25px; background-color: rgba(255, 255, 255, .8); }
	50%{ left: 0px; background-color: rgba(255, 255, 255, .1);}
	100%{ left:-25px; background-color: rgba(255, 255, 255, .8); }
}
@keyframes loader9g{
	0%{	left: -25px; background-color: rgba(255, 255, 255, .8); }
	50%{ left: 0px; background-color: rgba(255, 255, 255, .1);}
	100%{ left:-25px; background-color: rgba(255, 255, 255, .8); }
}

@-webkit-keyframes loader9d{
	0%{	left: 25px; background-color: rgba(255, 255, 255, .8); }
	50%{ left: 0px; background-color: rgba(255, 255, 255, .1);}
	100%{ left:25px; background-color: rgba(255, 255, 255, .8); }
}
@keyframes loader9d{
	0%{	left: 25px; background-color: rgba(255, 255, 255, .8); }
	50%{ left: 0px; background-color: rgba(255, 255, 255, .1);}
	100%{ left:25px; background-color: rgba(255, 255, 255, .8); }
}
`;

export default Loader;
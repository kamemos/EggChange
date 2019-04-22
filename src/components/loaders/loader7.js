/* This code is from https://codepen.io/TaniaLD/pen/oKxep */
import styled from 'styled-components';

const Loader = styled.div`
position: relative;
width: 150px;
height: 20px;

top: 45%;
top: -webkit-calc(50% - 10px);
top: calc(50% - 10px);
left: 25%;
left: -webkit-calc(50% - 75px);
left: calc(50% - 75px);

background-color: rgba(255,255,255,0.2);

&:after{
	content: "LOADING ...";
	color: #fff;
	font-family:  Lato,"Helvetica Neue" ;
	font-weight: 200;
	font-size: 16px;
	position: absolute;
	width: 100%;
	height: 20px;
	line-height: 20px;
	left: 0;
	top: 0;
}

&:before{
	content: "";
	position: absolute;
	background-color: #fff;
	top: 0px;
	height: 20px;
	width: 0px;
	z-index: 0;
	-webkit-transform-origin:  100% 0%;
			transform-origin:  100% 0% ;
	-webkit-animation: loader5 7s ease-in-out infinite;
			animation: loader5 7s ease-in-out infinite;
}

@-webkit-keyframes loader5{
    0%{width: 0px; left: 0px}
    48%{width: 100%; left: 0px}
    50%{width: 100%; right: 0px}
    52%{width: 100%; right: 0px}
    100%{width: 0px; right: 0px}
}

@keyframes loader5{
    0%{width: 0px; left: 0px}
    48%{width: 100%; left: 0px}
    50%{width: 100%; right: 0px}
    52%{width: 100%; right: 0px}
    100%{width: 0px; right: 0px}
}
`;

export default Loader;
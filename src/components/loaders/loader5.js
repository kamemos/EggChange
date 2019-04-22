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
	background-color: #e74c3c;
	z-index: 1;
}

&:before{
	content: "";
	position: absolute;
	background-color: #fff;
	top: -5px;
	left: 0px;
	height: 30px;
	width: 0px;
	z-index: 0;
	opacity: 1;
	-webkit-transform-origin:  100% 0%;
			transform-origin:  100% 0% ;
	-webkit-animation: loader3 10s ease-in-out infinite;
			animation: loader3 10s ease-in-out infinite;
}



@-webkit-keyframes loader3{
    0%{width: 0px;}
    70%{width: 100%; opacity: 1;}
    90%{opacity: 0; width: 100%;}
    100%{opacity: 0;width: 0px;}
}

@keyframes loader3{
    0%{width: 0px;}
    70%{width: 100%; opacity: 1;}
    90%{opacity: 0; width: 100%;}
    100%{opacity: 0;width: 0px;}
}
`;

export default Loader;
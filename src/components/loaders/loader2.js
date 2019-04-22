/* This code is from https://codepen.io/TaniaLD/pen/oKxep */
import styled from 'styled-components';

const Loader = styled.div`
position: relative;
height: 80px;
width: 80px;
top: 28%;
top: -webkit-calc(50% - 43px);
top: calc(50% - 43px);
left: 35%;
left: -webkit-calc(50% - 43px);
left: calc(50% - 43px);
border: 3px solid #fff;
border-radius: 80px;
-webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
-webkit-animation: hourglass 2s ease-in-out infinite;
        animation: hourglass 2s ease-in-out infinite;

&:before{
	content: "";
	position: absolute;
	top:8px;
	left: 18px;
	width: 0px;
	height: 0px;
	border-style: solid;
	border-width: 37px 22px 0 22px;
	border-color: #fff transparent transparent transparent;
}
&:after{
	content: "";
	position: absolute;
	top: 35px;
	left: 18px;
	width: 0px;
	height: 0px;
	border-style: solid;
	border-width: 0 22px 37px 22px;
	border-color: transparent transparent #fff transparent;
}

@-webkit-keyframes hourglass{
    0%{-webkit-transform:rotate(0deg);}
    100%{-webkit-transform:rotate(180deg);}
}

@keyframes hourglass{
    0%{transform:rotate(0deg);}
    100%{transform:rotate(180deg);}
}
`;

export default Loader;
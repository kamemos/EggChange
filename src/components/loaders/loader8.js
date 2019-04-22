/* This code is from https://codepen.io/TaniaLD/pen/oKxep */
import styled from 'styled-components';

const Loader = styled.div`
position: relative;
width: 12px;
height: 12px;

top: 46%;
top: -webkit-calc(50% - 6px);
top: calc(50% - 6px);
left: 46%;
left: -webkit-calc(50% - 6px);
left: calc(50% - 6px);

border-radius: 12px;
background-color: #fff;
-webkit-transform-origin:  50% 50%;
        transform-origin:  50% 50% ;
-webkit-animation: loader6 1s ease-in-out infinite;
        animation: loader6 1s ease-in-out infinite;

&:before{
	content: "";
	position: absolute;
	background-color: rgba(255, 255, 255, .5);
	top: 0px;
	left: -25px;
	height: 12px;
	width: 12px;
	border-radius: 12px;
}

&:after{
	content: "";
	position: absolute;
	background-color: rgba(255, 255 ,255 ,.5);
	top: 0px;
	left: 25px;
	height: 12px;
	width: 12px;
	border-radius: 12px;
}


@-webkit-keyframes loader6{
    0%{-webkit-transform:rotate(0deg);}
    50%{-webkit-transform:rotate(180deg);}
    100%{-webkit-transform:rotate(180deg);}
}

@keyframes loader6{
    0%{transform:rotate(0deg);}
    50%{transform:rotate(180deg);}
    100%{transform:rotate(180deg);}
}
`;

export default Loader;
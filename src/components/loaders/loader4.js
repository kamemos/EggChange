/* This code is from https://codepen.io/TaniaLD/pen/oKxep */
import React from 'react';
import styled from 'styled-components';

const Loader = styled.div`
position: relative;
width: 5px;
height: 5px;

top: 49%;
top: -webkit-calc(50% - 43px);
top: calc(50% - 2.5px);
left: 49%;
left: -webkit-calc(50% - 43px);
left: calc(50% - 2.5px);

background-color: #fff;
border-radius: 50px;

&:before{
	content: "";
	position: absolute;
	top: -38px;
	border-top: 3px solid #fff;
	border-right: 3px solid #fff;
	border-radius: 0 50px 0px  0;
	width: 40px;
	height: 40px;
	background-color: rgba(255, 255, 255, .1);
	-webkit-transform-origin:  0% 100%;
			transform-origin:  0% 100% ;
	-webkit-animation: loader2 1.5s linear infinite;
			animation: loader2 1.5s linear infinite;
}

&:after{
	content: "";
	position: absolute;
	top: 2px;
	right: 2px;
	border-bottom: 3px solid #fff;
	border-left: 3px solid #fff;
	border-radius: 0 0px 0px  50px;
	width: 40px;
	height: 40px;
	background-color: rgba(255, 255, 255, .1);
	-webkit-transform-origin:  100% 0%;
			transform-origin:  100% 0% ;
	-webkit-animation: loader2 1.5s linear infinite;
			animation: loader2 1.5s linear infinite;
}

@-webkit-keyframes loader2{
    0%{-webkit-transform:rotate(0deg);}
    100%{-webkit-transform:rotate(360deg);}
}

@keyframes loader2{
    0%{transform:rotate(0deg);}
    100%{transform:rotate(360deg);}
}
`;

export default (props) => (
    <div style={{
        height: '92px',
        display: 'block'
    }}>
        <Loader />
    </div>
);
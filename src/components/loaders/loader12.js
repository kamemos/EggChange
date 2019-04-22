/* This code is from https://codepen.io/TaniaLD/pen/oKxep */
import styled from 'styled-components';

const Loader = styled.div`
&:before{
	content: "";
	position: absolute;
	top: 0px;
	left: -25px;
	height: 12px;
	width: 12px;
	border-radius: 12px;
	-webkit-animation: loader10g 3s ease-in-out infinite;
			animation: loader10g 3s ease-in-out infinite;
}

position: relative;
width: 12px;
height: 12px;
top: 46%;
left: 46%;
border-radius: 12px;
-webkit-animation: loader10m 3s ease-in-out infinite;
        animation: loader10m 3s ease-in-out infinite;

&:after{
	content: "";
	position: absolute;
	top: 0px;
	left: 25px;
	height: 10px;
	width: 10px;
	border-radius: 10px;
	-webkit-animation: loader10d 3s ease-in-out infinite;
			animation: loader10d 3s ease-in-out infinite;
}

@-webkit-keyframes loader10g{
	0%{background-color: rgba(255, 255, 255, .2);}
	25%{background-color: rgba(255, 255, 255, 1);}
	50%{background-color: rgba(255, 255, 255, .2);}
	75%{background-color: rgba(255, 255, 255, .2);}
	100%{background-color: rgba(255, 255, 255, .2);}
}
@keyframes loader10g{
	0%{background-color: rgba(255, 255, 255, .2);}
	25%{background-color: rgba(255, 255, 255, 1);}
	50%{background-color: rgba(255, 255, 255, .2);}
	75%{background-color: rgba(255, 255, 255, .2);}
	100%{background-color: rgba(255, 255, 255, .2);}
}

@-webkit-keyframes loader10m{
	0%{background-color: rgba(255, 255, 255, .2);}
	25%{background-color: rgba(255, 255, 255, .2);}
	50%{background-color: rgba(255, 255, 255, 1);}
	75%{background-color: rgba(255, 255, 255, .2);}
	100%{background-color: rgba(255, 255, 255, .2);}
}
@keyframes loader10m{
	0%{background-color: rgba(255, 255, 255, .2);}
	25%{background-color: rgba(255, 255, 255, .2);}
	50%{background-color: rgba(255, 255, 255, 1);}
	75%{background-color: rgba(255, 255, 255, .2);}
	100%{background-color: rgba(255, 255, 255, .2);}
}

@-webkit-keyframes loader10d{
	0%{background-color: rgba(255, 255, 255, .2);}
	25%{background-color: rgba(255, 255, 255, .2);}
	50%{background-color: rgba(255, 255, 255, .2);}
	75%{background-color: rgba(255, 255, 255, 1);}
	100%{background-color: rgba(255, 255, 255, .2);}
}
@keyframes loader10d{
	0%{background-color: rgba(255, 255, 255, .2);}
	25%{background-color: rgba(255, 255, 255, .2);}
	50%{background-color: rgba(255, 255, 255, .2);}
	75%{background-color: rgba(255, 255, 255, 1);}
	100%{background-color: rgba(255, 255, 255, .2);}
}
`;

export default Loader;
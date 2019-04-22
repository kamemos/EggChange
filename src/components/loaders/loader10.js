/* This code is from https://codepen.io/TaniaLD/pen/oKxep */
import styled from 'styled-components';

const Loader = styled.div`
position: relative;
width: 80px;
height: 80px;

top: 28%;
top: -webkit-calc(50% - 43px);
top: calc(50% - 43px);
left: 35%;
left: -webkit-calc(50% - 43px);
left: calc(50% - 43px);

border-radius: 50px;
background-color: rgba(255, 255, 255, .2);
border-width: 40px;
border-style: double;
border-color:transparent  #fff;

-webkit-box-sizing:border-box;
-moz-box-sizing:border-box;
    box-sizing:border-box;

-webkit-transform-origin:  50% 50%;
    transform-origin:  50% 50% ;
-webkit-animation: loader8 2s linear infinite;
    animation: loader8 2s linear infinite;

@-webkit-keyframes loader8{
    0%{-webkit-transform:rotate(0deg);}
    100%{-webkit-transform:rotate(360deg);}
}

@keyframes loader8{
    0%{transform:rotate(0deg);}
    100%{transform:rotate(360deg);}
}
`;

export default Loader;
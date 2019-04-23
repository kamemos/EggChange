import React,{ Component } from 'react';
import styled from "styled-components";
import { Redirect } from 'react-router';

const Container = styled.section`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

class Error extends Component{
    state = {
        redirect: false,
        countdown: 999,
        intervalId: -1
    }
    componentDidMount() {
        this.setState({
            countdown: 5,
            intervalId: setInterval(() => {
                if(this.state.countdown <= 0) {
                    clearInterval(this.state.intervalId);
                    this.setState({
                        redirect: true
                    })
                }
                else {
                    this.setState({
                        countdown: this.state.countdown - 1
                    })
                }
            }, 1000)
        })
    }
    render(){
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }
        return(
            <Container>
                <h1>Sorry, this page does not exist</h1>
                <span>The page will be redirected to home page in {this.state.countdown} {(this.state.countdown > 1) ? "seconds" : "second"}</span>
            </Container>
        )
    }
}

export default Error;
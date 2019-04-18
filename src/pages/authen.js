import React, { Component } from 'react'
import styled from "styled-components";
import axios from 'axios'

const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    max-width: 600px;
    width: 100vw;
    height: 60vh
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;
    height: 80vh;
    width: 100vw;
    padding: 20px;
    box-sizing: border-box;
    img.chick {
        height: 250px;
        width: 250px;
        min-width: 220px
    }
    img.grass {
        z-index: -10;
        height: 50vh;
        width: 50vw;
    }

`
const ChatBubble = styled.div`
    &{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #FCF4A3;
        border-radius: .4em;
        min-width: 300px;
        width: 40vw;
        height: auto;
        // margin-bottom: 40vh;
        display: flex;
        padding: 10px;
    }
    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 0;
        border: 24px solid transparent;
        border-top-color:  #FCF4A3;
        border-bottom: 0;
        margin-left: -20px;
        margin-bottom: -20px;
    } 

    p {
        font-size: 2vh;
    }
` 

const Row = styled.div`
    display: flex;
    justify-content: center;
`

const InputBox = styled.input`
    border: none;
    outline: none;
    width: 100%;
    height: 60px;
    text-align: center;
    background: rgba(255,255,255,.5)
`

const Button = styled.button`
    & {
        font-size: 1vh;
        box-sizing: border-box;
        margin-botton: auto;
        margin: 10px;
        outline: none;
        border: none;
        background: #F8DE7E;
    }
    &:hover{
        filter: brightness(80%)
    }
`

const Loader = styled.div`
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid #3498db;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
`

const LoadingFade = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.8);
    z-index: 100;
    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 0;
        border: 24px solid transparent;
        border-top-color: rgba(0,0,0,.8);
        border-bottom: 0;
        margin-left: -20px;
        margin-bottom: -20px;
        z-index: 100;
    }
`
class Authen extends Component {
    state = {
        isloading : false,
        email : '',
        error : false,
    }

    async handleAuthen(){
        const email = this.state.email
        console.log(this.state)
        await this.setState({isloading : true})
        try{
            let payload = await axios.get(`https://kt6xg5iln2.execute-api.ap-southeast-1.amazonaws.com/prod/generated-key?email=${email}`)
            let { statusCode, body } = { ...payload.data } 
            if (statusCode == 400) throw Error(body)
            alert('"please check your email!"')
        }
        catch(err){
            alert(err)
            await this.setState({error : true})
        }
        finally{
            await this.setState({isloading : false, email: ''})
        }
    }

    render(){
        return(
            <Container>
                <ChatBubble>
                    { this.state.isloading ?
                        <LoadingFade>
                            <Loader/>
                        </LoadingFade>:
                        null
                    }
                    <p><b>Please put your email here</b></p>
                    <InputBox
                        type="email"
                        value={this.state.email} 
                        onChange={(e)=>{this.setState({email:e.target.value})}}
                    />
                    <Button onClick={this.handleAuthen.bind(this)}>
                    <h2>Let's hatch some egg</h2></Button>
                </ChatBubble>
                <img className="chick" src={require('../assets/chick.svg')}/>
            </Container>
        )
    }
}

export default Authen
import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import moment from 'moment'
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { defaultTo } from "lodash";
import { Score } from '.'
import { Link } from 'react-router-dom'

const Container = styled.section`
    display: flex;
    justify-content: flex-start;
    overflow-x: scroll;
    align-items: center;
    height: 40vh;
    width: 80vw;
    padding: 10px;
    background: rgba(248,212,80,0.3);
    z-index: 9999;
`
const Title = styled.div`
    display: flex;
    margin-left: 20px;
    p.quote {
        font-size: 8vh;
        color: #F4B24E;
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
    min-height: 40vh;
    width: 80vw;
    background-color: rgba(0,0,0,.8);
    z-index: 1000;
`
const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100vw;
    min-width: 350px;
    padding: 15px;
    margin-bottom: 50px;
`;
const Egg = styled.div`
    width: 200px;
    height: 250px;
    background-color: tomato;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
`

const Card = styled.div`
    min-width: 250px;
    min-height: 300px;
    width: 250px;
    height: 300px;
    background: white;
    margin: 5px 5px 5px 5px;
    div.content{
        padding: 5px;
    }
    img.chick{
        width: 250px;
        height: 200px;
    }
`
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 5px;
`

export default class LastestPost extends Component {

    state = {
        isFetching: false,
        blogs: []
    }
    async componentDidMount(){
        try{
            this.setState({isFetching: true})
            const blogs = (await axios.get('https://kt6xg5iln2.execute-api.ap-southeast-1.amazonaws.com/prod/get-lastest-post')).data.body
            this.setState({blogs: blogs})
        }catch (err){
            alert(err)
        }finally{
            this.setState({isFetching: false})
        }
    }
    render(){
        return (
            <>
            <Title>
       
                <p className="quote">" Lastest Blogs "</p>
     
            </Title>
            <Container>
                { this.state.isFetching?
                    <LoadingFade>
                        <Loader/>
                    </LoadingFade>:
                    null
                }
                { defaultTo(this.state.blogs, []).map((blog,idx) => {
                    const { title,tags,owner,modifiedDate,like,dislike } = { ...blog }
                    return (
                        <Card>
                            <img className='chick' alt="dummy_chick" src={require('../assets/chick_bg.jpg')}/>
                            <div className='content'>
                                <Link style={{textDecoration:'none'}} to={`/post/${title}`}>
                                    <p><b>{ title }</b></p>
                                </Link>
                                <Row>
                                    <div style={{display:'flex'}}>
                                        <FontAwesomeIcon style={{color:'gray'}} icon={faClock}/>
                                        <div style={{width:'5px'}}/>
                                        <div>{moment(modifiedDate).startOf('day').fromNow()}</div>
                                    </div>
                                    <div style={{display:'flex',justifyContent:'flex-end'}}>
                                        <Score
                                            like={like}
                                            dislike={dislike}
                                        />
                                    </div>
                                </Row>
                            </div>
                            
                        </Card>
                    )
                }) }
            </Container>
            </>
        )
    }
}
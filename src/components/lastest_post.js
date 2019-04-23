import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import moment from 'moment'
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { defaultTo } from "lodash";
import { Score } from '.'
import { Link } from 'react-router-dom';

const Container = styled.section`
    min-height: 40vh;
    width: 100vw;
    padding: 10px;
    background: rgba(248,212,80,0.3);
    overflow-y: scroll;
    z-index: 5;
    box-shadow: inset 0 0 10px #00000040;
    padding: 5px 10px;
    box-sizing: border-box;
    position: relative;
    h2 {
        margin-left: 20px;
        margin-bottom: 5px;
    }

    section.content-tiles {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
`;

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
    height: 100%;
    width: 100vw;
    background-color: rgba(0,0,0,0.8);
    z-index: 15;
    top: 0;
    left: 0;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    min-width: 250px;
    max-width: 250px;
    overflow: hidden;
    margin: 10px;
    background: #FFFB;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0px 3px 5px #0003;
    position: relative;

    div.content{
        padding: 15px 25px 25px 25px;
    }
    div.img-container {
        position: relative;
        img.chick{
            width: 250px;
            /* height: 200px; */
        }
    }

    &:hover {
        box-shadow: 0 0px 8px 0 #5BB8FF77;
        div.img-container {
            &:after {
                content: "";
                display: block;
                width: 100%;
                height: 100%;
                position: absolute;
                background: linear-gradient(#FFF, transparent);
                top: 0;
                left: 0;
            }
        }
    }
`
const Row = styled.div`
    display: flex;
    align-items: center;
    &.end {
        justify-content: flex-end;
    }
`;

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
            <Container>
                <h2>Latest Post</h2>
                { this.state.isFetching ?
                    <LoadingFade>
                        <Loader/>
                    </LoadingFade> :
                    null
                }
                <section className="content-tiles">
                    { defaultTo(this.state.blogs, []).map((blog, idx) => {
                        const { title, modifiedDate, like, dislike } = { ...blog }
                        return (
                            <Link
                                key={idx}
                                style={{
                                    textDecoration: 'none',
                                    color: 'black'
                                }}
                                to={`/post/${title}`}
                            >
                                <Card>
                                    <div className='img-container'>
                                        <img className='chick' alt="dummy_chick" src={require('../assets/chick_bg.jpg')}/>
                                    </div>
                                    <div className='content'>
                                        <p>
                                            <b>{ title.length > 0 ? title : 'No Title' }</b>
                                        </p>
                                        <Row>
                                            <FontAwesomeIcon style={{color:'gray'}} icon={faClock}/>
                                            <div style={{width:'5px'}}/>
                                            <div>{moment(modifiedDate).startOf('day').fromNow()}</div>
                                        </Row>
                                        <Row className="end">
                                            <Score
                                                like={like}
                                                dislike={dislike}
                                            />
                                        </Row>
                                    </div>
                                    
                                </Card>
                            </Link>
                        )
                    }) }
                </section>
            </Container>   
        )
    }
}
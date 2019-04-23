import React from 'react'
import styled from 'styled-components' 
import moment from 'moment'
import { faTag,faUserCircle,faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Score }  from '.'
import { Link } from 'react-router-dom'

const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    // border-radius: 12px;
    overflow: hidden;
    margin: 10px;
    background: #FFFB;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0px 3px 5px #0003;
    position: relative;
    img.chick_bg {
        width: 100%;
        /* height: 250px; */
    }
    .tag_icon {
        width: 20px;
        height: 20px;
        margin-right: 15px;
        color: gray;
    }

    .content {
        padding: 15px 25px 25px 25px;
    }
    &:hover {
        box-shadow: 0 0px 8px 0 #5BB8FF77;
        &:after {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            background: linear-gradient(#FFF, transparent);
        }
    }
`
const TagBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    div.tag {
        padding: 5px;
        background-color: #F8DE7E;
        border-radius: 4px;
        height: 30px;
        min-width: 20px;
        box-sizing: border-box;
        user-select: none;
        margin: 5px 5px 5px 0;
    }
`
const Row = styled.div`
    display: flex;
    align-items: center;
`
const BoardCard = ({title,tags,owner,modifiedDate,like,dislike}) => {
    return (
        <Card>
            <img alt="chick_bg" className='chick_bg' src={require('../assets/chick_bg.jpg')}/>
            <div className="content">
                <Link style={{textDecoration:'none'}} to={`/blog/${title}`}><h2><b>{title}</b></h2></Link>

                <Row>
                    <FontAwesomeIcon className='tag_icon' icon={faUserCircle}/>
                    <p>{owner}</p>
                </Row>  
                <Row>
                    <FontAwesomeIcon className='tag_icon' icon={faClock}/>
                    <p>{moment(modifiedDate).startOf('day').fromNow()}</p>
                </Row>
                <TagBox>
                    <FontAwesomeIcon
                        className='tag_icon' 
                        icon={faTag} 
                    />
                    {tags.map((tag,idx) => {
                        return (
                            <div key={`tag ${idx}`} className='tag'><b>{tag}</b></div>
                        )
                    })}
                </TagBox>
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <Score
                        like={like}
                        dislike={dislike}
                    />
                </div>
            </div>
        </Card>
    )
}

export default BoardCard

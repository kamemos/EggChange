import React from 'react'
import styled from 'styled-components' 
import moment from 'moment'
import { faTag,faUserCircle,faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 375px;
    // border-radius: 12px;
    overflow: hidden;
    margin: 10px;
    // box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    img.chick_bg {
        width: 100%;
        height: 250px;
    }
    .tag_icon {
        width: 20px;
        height: 20px;
        margin-right: 15px;
        color: gray;
    }
`
const TagBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%
    div.tag{
        padding: 5px;
        background-color: #F8DE7E;
        border-radius: 4px;
        height: 30px;
        min-width: 20px;
        box-sizing: border-box;
        user-select: none;
        margin: 5px 5px 5px 0
    }
`
const Row = styled.div`
    display: flex;
    align-items: center;
`
const BoardCard = ({title,tags,owner,modifiedDate}) => {
    return (
        <Card>
            <img alt="chick_bg" className='chick_bg' src={require('../assets/chick_bg.jpg')}/>
            <h2><b>{title}</b></h2>

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
        </Card>
    )
}

export default BoardCard

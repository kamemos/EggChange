import React, { Component } from 'react';
import styled from 'styled-components';

const numTobin = (num) => {
    return (num < 255) ? (
        (num).toString(2).split("").concat(
            Array.from(new Array(7 - (num).toString(2).length)).map(i => "0")
        )
    ).map((i) => parseInt(i)) : 
    (num).toString(2).split("").slice(0, 7).map((i) => parseInt(i))
}

const binTonum = (arrBin) => {
    return parseInt(arrBin.map(i => Number(i).toString()).join(""), 2)
}

const days = [
    ["mon", "Mon"],
    ["tue", "Tue"],
    ["wed", "Wed"],
    ["thu", "Thu"],
    ["fri", "Fri"],
    ["sat", "Sat"],
    ["sun", "Sun"]
]

const stateToBin = (state) => {
    return days.map((d) => state[d[0]] ? 1 : 0);
}

const Style = styled.div`
margin-left: 20px;
label {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
}
`;

class OpenDay extends Component  {
    constructor(props) {
        super(props);
        const val = numTobin(props.openDay);
        this.state = {
            mon: val[0] === 1,
            tue: val[1] === 1,
            wed: val[2] === 1,
            thu: val[3] === 1,
            fri: val[4] === 1,
            sat: val[5] === 1,
            sun: val[6] === 1
        }
        this.openDay = props.openDay;
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.openDay !== this.props.openDay) {
            const val = numTobin(this.props.openDay);
            this.setState({
                mon: val[0] === 1,
                tue: val[1] === 1,
                wed: val[2] === 1,
                thu: val[3] === 1,
                fri: val[4] === 1,
                sat: val[5] === 1,
                sun: val[6] === 1
            });
            this.openDay = this.props.openDay;
        }
    }

    onClick = (day) => () => {
        this.setState({
            [day]: !this.state[day]
        }, () => {
            this.openDay = binTonum(stateToBin(this.state));
        })
    }

    render() {
        return (
            <Style>
                {
                    days.map((day, idx) => (
                        <label key={idx}>
                            {day[1]}
                            <input
                                type="checkbox"
                                onChange={this.onClick(day[0])}
                                checked={this.state[day[0]]}
                                value={1}
                            />
                        </label>
                    ))
                }
            </Style>
        )
    }
}

export default OpenDay;
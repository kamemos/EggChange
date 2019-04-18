import React,{ Component } from 'react'
import axios from 'axios'

class Login extends Component{
    state = {
        loading: true,
        email: '',
        jwt_token: ''
    }
    

    async componentDidMount(){
        const params = new URLSearchParams(this.props.location.search)
        var email = params.get('email')
        var key = params.get('key')
        // console.log( email,key )
        try{
            var payload = (await axios.get(`https://kt6xg5iln2.execute-api.ap-southeast-1.amazonaws.com/prod/authen-via-key?email=${email}&key=${key}`)).data
            if (payload.statusCode == 400) throw Error()
            await this.setState({
                loading:false,
                email: payload.body['email'],
                jwt_token: payload.body['jwt_token']
            })
        } catch{
            alert("invalid params")
            await this.setState({
                loading:false,
                jwt_token: 'error'
            })
        }
    }

    render(){
        return(
            <div>
                email : {this.state.email}
                <br/>
                token : {this.state.jwt_token}
            </div>
        )
    }
}

export default Login
import React,{ Component } from 'react'
import axios from 'axios'
import connect from 'redux-connect-decorator';
import { user } from '../redux/actions';
import { Redirect } from 'react-router'

@connect(state => ({
    user: state.user,
}), {
    ...user,
})
class Login extends Component{
    state = {
        redirect: false
    }

    async componentDidMount(){
        const params = new URLSearchParams(this.props.location.search)
        var email = params.get('email')
        var key = params.get('key')
        try{
            var payload = (await axios.get(`https://kt6xg5iln2.execute-api.ap-southeast-1.amazonaws.com/prod/authen-via-key?email=${email}&key=${key}`)).data
            var { statusCode,body } = { ...payload }
            if (statusCode === 400) throw Error()
            await this.props.setEmail( body['email'] )
            await this.props.setJWT( body['jwt_token'] )
            alert("login success")
        } catch{
            alert("invalid params")
        } finally{
            this.setState({redirect:true})
        }
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }
        return(
            <div>
            </div>
        )
    }
}

export default Login
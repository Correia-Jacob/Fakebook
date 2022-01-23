import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './Reducer'

const Login = () => {
    const [state, dispatch] = useStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                console.log(result)

                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })

            }).catch(error => alert(error.message))
    }
    return (
        <div className='login' >
            <div className="login__logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1200px-2021_Facebook_icon.svg.png" alt="fb circle" />
                <i>akebook</i>
            </div>

            <Button type='submit' onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login

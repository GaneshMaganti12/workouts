import React, {useState} from 'react'
import Login from './Login'
import Register from './Register'

export default function LoginRegister() {

    const[isLoginForm, setLoginForm] = useState(true)

    const changeToRegister = () =>{
        setLoginForm(!isLoginForm)
    }

    const changeToLogin = () =>[
        setLoginForm(!isLoginForm)
    ]

  return (
    <div>
        {isLoginForm ? 
        <div>
            <button onClick={changeToRegister}>Register</button>
            <Login/>
        </div> 
        :
        <div>
            <button onClick={changeToLogin}>Login</button>
            <Register/>
        </div>
        }
    </div>
  )
}

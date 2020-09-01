import React, { useState } from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_actions'
import { withRouter } from 'react-router-dom'; 

function LoginPage(props){
const dispatch = useDispatch();

//타이핑을 할때 onchange 이벤트가 발생시켜 state이 바뀌면 value가 바뀜-
const [Email, setEmail] = useState("")
const [Password, setPassword] = useState("")

const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
}
const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
}
const onSubmitHandler = (event) => {
    event.preventDefault();
    //페이지 refresh되는거 방지
    //console.log('email', Email)
    //console.log('password', Password)
    
    //서버에 보내기
    let body={
        email: Email,
        password: Password
    }
    //redux 사용해서 서버에 보내기 
    dispatch(loginUser(body))
    .then(response => {
        if(response.payload.loginSuccess){
            //react에서 페이지 이런식으로 이동
            props.history.push('/')
        }else{
            alert('Error')
        }
    })

   
}

return(
        <div style={{
            display: 'flex', justifyContent:'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
        
        <form style={{display: 'flex', flexDirection:'column'}}
            onSubmit={onSubmitHandler}
            >
            <label>Email</label>
            <input type="email" value={ Email } onChange={onEmailHandler} />
            <label>Password</label>
            <input type="password" value={ Password } onChange={onPasswordHandler} />
            <br/>
            <button>
                Login
            </button>
        </form>
        </div>
    )
}

export default withRouter(LoginPage)
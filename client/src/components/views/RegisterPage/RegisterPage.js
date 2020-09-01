import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_actions'
import { withRouter } from 'react-router-dom'; 

function RegisterPage(props){
const dispatch = useDispatch();

const [Email, setEmail] = useState("")
const [Password, setPassword] = useState("")
const [Name, setName] = useState("")
const [ConfrimPassword, setConfrimPassword] = useState("")

const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
}
const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
}
const onNameHandler = (event) => {
    setName(event.currentTarget.value)
}
const onConfirmPasswordHandler = (event) => {
    setConfrimPassword(event.currentTarget.value)
}
const onSubmitHandler = (event) => {
    event.preventDefault();
    //페이지 refresh되는거 방지
    //console.log('email', Email)
    //console.log('password', Password)
    
    if(Password !== ConfrimPassword){
        return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }
    //서버에 보내기
    let body={
        email: Email,
        name:Name,
        password: Password,
    }
    //redux 사용해서 서버에 보내기 
    dispatch(registerUser(body))
    .then(response => {
        if(response.payload.success){
            //react에서 페이지 이런식으로 이동
            props.history.push('/login')
        }else{
            alert('Failed to sign up')
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
            
            <label>Name</label>
            <input type="text" value={ Name } onChange={onNameHandler} />
            
            <label>Password</label>
            <input type="password" value={ Password } onChange={onPasswordHandler} />

            <label>Confirm Password</label>
            <input type="password" value={ ConfrimPassword } onChange={onConfirmPasswordHandler} />
            <br/>
            <button>
               회원가입
            </button>
        </form>
        </div>
    )
}

export default withRouter(RegisterPage);
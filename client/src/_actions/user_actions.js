import axios from 'axios'


export function registerUser(dataToSubmit){
    //서버에서 받은 데이터를 request에 저장
   const request =  axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data)

    return{//reducer로 보낸다
        type: "LOGIN_USER",
        payload: request
    }
}

export function loginUser(dataToSubmit){
    //서버에서 받은 데이터를 request에 저장
   const request =  axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data)

    return{//reducer로 보낸다
        type: "REGISTER_USER",
        payload: request
    }
}

export function auth(){
    //서버에서 받은 데이터를 request에 저장
   const request =  axios.get('/api/users/auth')
    .then(response => response.data)

    return{//reducer로 보낸다
        type: "AUTH_USER",
        payload: request
    }
}
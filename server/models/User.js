const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
//salt를 이용해서 비밀번호를 암호화
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type:String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image: String,
    token: {
        type: String
    },
        tokenExp: {
            type: Number
        }
})

userSchema.pre('save', function(next){
    var user = this;
  
  if(user.isModified('password')){
    //save하기 전에 비밀번호를 암호화 시킨다,
    bcrypt.genSalt(saltRounds, function(err, salt){
        if(err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err)
            user.password = hash
            //플레인 password를 hash로 바꿔줌
            next()
        })
    })
  }else{
      next()
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //123456 과 암호화된 비밀번호 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)//비밀번호가 같다면 에러는 null이고 isMatch 
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    //jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    
   // user._id + 'secretToken' = token
    //->
    //secretToekn -> user._id

    user.token = token
    //token을 생성한 후에 user에 넣어줬음
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    //토큰을 가져와 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 토큰과 db에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
        //findOne은 mongodb에 있는 메소드
    })
}
const User = mongoose.model('User',userSchema)
//모델로 감싸주기
module.exports = { User }
//다른 곳에서도 쓸 수 있게 모듈로 
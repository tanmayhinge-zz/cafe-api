const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');


const {validateRegisterInput, validateLoginInput} = require('../../util/validators');
const User = require('../../models/User');

const {SECRET_KEY} = require('../../config');

const generateToken = user =>jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, {expiresIn: '1h'});


module.exports = {
    Mutation: {
        async login (_, {username, password}){
            const {errors, valid} = validateLoginInput(username, password);
            if(!valid){
                throw new UserInputError('Errors: ', {errors})           
            }

            const user = await User.findOne({username});

            if(!user){
                errors.general = 'user not found';
                throw new UserInputError('user not found', {errors})
            }
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'user not found';
                throw new UserInputError('wrong credentials', {errors})
            }

            const token = generateToken(user);
            return{
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_, 
        {
            registerInput: 
            {



            username, email, password, confirmPassword, address
            }
        })
        {
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword, address)
            if(!valid){
                throw new UserInputError('Errors', {errors}) 
            }
            
            const user = await User.findOne({username});
            if(user){
                throw new UserInputError('username is taken', {
                    errors:{
                        username: 'This username is taken'
                    }
                })
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email, 
                username,
                password,

                createdAt: new Date().toISOString(),

                address
            });

            const res = await newUser.save();

            const token = generateToken(res)
            return{
                ...res._doc,
                id: res._id,
                token

            }
        }

    }
}
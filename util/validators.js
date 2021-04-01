module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirPassword,
    address
) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'username cannot be empty';
    }
    if(address.trim() === ''){
        errors.address = 'address cannot be empty';
    }
    if(email.trim() === ''){
        errors.email = 'email cannot be empty';
    }else{
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
          errors.email = 'Please enter a valid email address';
        }
    }
    if(password === ''){
        errors.password = 'Password must not be empty'
    }
    else if(password !== confirPassword){
        errors.confirPassword = 'Passwords must match'
    };


    return {
        errors,
        valid: Object.keys(errors).length<1
    }


}

module.exports.validateLoginInput = (username, password) =>{
    const errors = {};


    if(username.trim() === ''){







        
        errors.username = 'Username cannot be empty';
    }

    if(password.trim() === ''){
        errors.username = 'Password cannot be empty';
    }
    return {


        errors,
        valid: Object.keys(errors).length<1
    }
}
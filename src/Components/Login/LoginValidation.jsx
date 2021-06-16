

export default function loginValidation (values) {

    let foundErrors = {};

    if (!values.username.trim()) {
        foundErrors.username = "Username Requried";
    }else if (!/\S+@\S+\.\S+/.test(values.username)){
        foundErrors.username = "Email address is invalid";
    }
    
    if (!values.password) {
        foundErrors.password = "Password Required";
    } else if (values.password.length < 7){
        foundErrors.password = "Password needs to be at least 7 characters";
    }

    return foundErrors;
}
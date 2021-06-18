

export default function RegisterValidation (values) {


    let foundErrors = {};

    if (!values.firstName.trim()) {
        foundErrors.firstName = "First name Requried";
    }

    if (!values.lastName.trim()) {
        foundErrors.lastName = "Last name Requried";
    }

    if (!/\S+@\S+\.\S+/.test(values.email)){
        foundErrors.email = "Email address is invalid";
    }

    if (!values.password) {
        foundErrors.password = "Password Required";
    } else if (values.password.length < 7){
        foundErrors.password = "Password needs to be at least 7 characters";
    }

    return foundErrors;

}
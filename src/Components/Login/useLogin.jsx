import React, { useState, useEffect } from 'react';
import LoginNodeREDConnection from './LoginNodeRedConnection';

const useLogin = (callback, validate) => {


    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = event => {
    
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
      
    };


    const handleSubmit = event => {
        event.preventDefault();

        setErrors(validate(values));
        setIsSubmitting(true);
        

        if (LoginNodeREDConnection.outgoingSocket.readyState === 1) {

            var sendDetails = {
              'email': values.username,
              'password': values.password
            };

            LoginNodeREDConnection.outgoingSocket.send(JSON.stringify(sendDetails));
        }

    }

    // useEffect(
    //     () => {
    //         if (Object.keys(errors).length === 0 && isSubmitting) {
    //             callback();
    //         }
    //     },
    //     [errors]
    // );

    return { handleChange, handleSubmit, values, errors };


}

export default useLogin;
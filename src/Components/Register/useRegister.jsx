import React, { useState, useEffect } from 'react';
import RegisterNodeREDConnection from './RegisterNodeREDConnection';

/**
 * Represents useRegister
 * @param {*} props 
 * @param {function} validate 
 * @returns handleChange, handleSubmit, values, errors
 */

const useRegister = (props, validate) => {


    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

   
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    /**
     * Represents handleChange
     * @param {event} event 
     * Sets values of the array by capturing the name attribute of the input tag within RegisterForm.jsx this is then set with the value attribute from the input tag
     */
    const handleChange = event => {
    
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
      
    };

    /**
     * Represents handleSubmit
     * @param {event} event 
     * set errors array by setting them equal to return of validate functon which takes in the values.
     * props calls method successfulRegister from App.js and passes in true
     * Sends JSON object of registration details to Node-RED
     */

    const handleSubmit = event => {
        event.preventDefault();

        setErrors(validate(values));  
        setIsSubmitting(true);
        props.successfulRegister(true);

        if (RegisterNodeREDConnection.outgoingSocket.readyState === 1) {
            var sendDetails = {
                'firstname': values.firstName,
                'lastname': values.lastName,
                'email': values.email,
                'password': values.password,
            };

            RegisterNodeREDConnection.outgoingSocket.send(JSON.stringify(sendDetails));
        }
    }


    return { handleChange, handleSubmit, values, errors };


}

export default useRegister;
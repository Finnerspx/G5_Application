import React, { useState, useEffect } from 'react';
import LoginNodeREDConnection from './LoginNodeRedConnection';

const outgoingSocket = new WebSocket('ws://127.0.0.1:1880/ws/datasetDetails');

/**
 * Represents useLogin
 * @param {function} validate 
 * @returns handleChange, handleSubmit, values, errors
 */

const useLogin = ( validate) => { //React Hook


    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Represents handleChange
     * @param {event} event 
     * Sets values of the array by capturing the name attribute of the input tag within LoginForm.jsx this is then set with the value attribute from the input tag
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
     * Set errors array by setting them equal to return of validate functon which takes in the values.
     * Sends login details as JSON object to Node-RED
     */


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

        if (outgoingSocket.readyState === 1) {
            outgoingSocket.send("datasetInformation");
        }

    }



    return { handleChange, handleSubmit, values, errors };


}

export default useLogin;
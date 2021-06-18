import React, { useState, useEffect } from 'react';
import RegisterNodeREDConnection from './RegisterNodeREDConnection';

const useRegister = (props, validate) => {


    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
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

    // RegisterNodeREDConnection.incomingSocket.onmessage = e => {
    //     if (e.data == "register success"){
    //         window.alert("successsssssssss");
    //         displaySuccessOrNot = <SnackbarContent message="Registration Successful" action={action}/>;
    //     }else {
    //         displaySuccessOrNot = <div>Loading...</div>;
    //     }
    // }

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

    //   RegisterNodeREDConnection.incomingSocket.onmessage = e => {
    //       if (e.data == "register success"){
    //           window.alert("Successssssssssss");
    //       }
    //   }
    }

    // useEffect(
    //     () => {
    //       if (Object.keys(errors).length === 0 && isSubmitting) {
    //         callback();
    //       }
    //     },
    //     [errors]
    //   );

    return { handleChange, handleSubmit, values, errors };


}

export default useRegister;
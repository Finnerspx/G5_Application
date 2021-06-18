import React, {useState} from 'react';
import LoginForm from '../../Components/Login/LoginForm';
import RegisterForm from '../../Components/Register/RegisterForm';
import RegisterSuccess from '../../Components/Register/RegisterSuccess';
import './Form.css'

/**
 * Represents Form
 * @returns Component LoginForm and conditional return on RegisterForm/RegisterSuccess
 */

const Form = () => {
    const [successRegister, setSuccessRegister] = useState();


    /**
     * Represents succesfulRegisration
     * @param {boolean} successfulRegisterValue 
     * Passes function successfulRegister in as props to RegisterForm. 
     * No return this function sets the boolean value for variable successRegister to determine is register was successful or not.
     */

    function successfulRegister(successfulRegisterValue) {
        setSuccessRegister(successfulRegisterValue);
    }


    return (
        <>
        <div className="form-container">
            <div className="form-content-left">
                <LoginForm/>
            </div>
            {!successRegister ? (<RegisterForm successfulRegister={successfulRegister}/>) 
            : (<RegisterSuccess/>) }
        </div>
           
        </>
    );
};

export default Form;
import React, {useState} from 'react';
import LoginForm from '../../Components/Login/LoginForm';
import RegisterForm from '../../Components/Register/RegisterForm';
import RegisterSuccess from '../../Components/Register/RegisterSuccess';
import './Form.css'


const Form = () => {
    const [successRegister, setSuccessRegister] = useState();



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
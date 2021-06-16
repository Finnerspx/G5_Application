import React, {useState} from 'react';
import LoginForm from '../../Components/Login/LoginForm';
import RegisterForm from '../../Components/Register/RegisterForm';
import RegisterSuccess from '../../Components/Register/RegisterSuccess';
import './Form.css'


const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmittedLogin, setIsSubmittedLogin] = useState(false);


    function submitForm(){
        setIsSubmitted(true);
    }

    function submitLogin() {
        setIsSubmittedLogin(true);
    }


    return (
        <>
        <div className="form-container">
            <div className="form-content-left">
                <LoginForm/>
            </div>
            {!isSubmitted ? (<RegisterForm submitForm={submitForm}/>) 
            : (<RegisterSuccess/>) }
        </div>
           
        </>
    );
};

export default Form;
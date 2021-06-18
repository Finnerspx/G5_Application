import React from 'react';
import '../../Pages/Form/Form.css';
import useLogin from './useLogin';
import loginValidation from './LoginValidation';
import Logo from '../../Logo/Logo.png';

/**
 * Represents LoginFrom
 * @param {boolean} param0 
 * @returns JSX Form for login.
 */
const LoginForm = ({submitLogin}) => {

    const { handleSubmit, handleChange, values, errors } = useLogin(submitLogin, loginValidation);


    return (
            <form onSubmit={handleSubmit} className="form-left" noValidate>
                <img alt="Sundance Logo" className="sundance-logo" src={Logo}></img>
                <h1 >Welcome to G5</h1>
                <p>Login to our Image-based dataset management tool.</p>
                <div className="form-inputs-left">
                    <label className="form-inputs">Username</label>
                    <input
                     type="email" 
                     className="form-input-left" 
                     name="username"
                     placeholder="example@mycompany.com"
                     value={values.username}
                     onChange={handleChange}
                     />
                     {errors.username && <p>{errors.username}</p>}
                </div>
                <div className="form-inputs-left">
                    <label className="form-inputs">Password</label>
                    <input
                     type="password" 
                     className="form-input-left" 
                     name="password"
                     placeholder="Enter your password"
                     value={values.password}
                     onChange={handleChange}
                     />
                     {errors.password && <p>{errors.password}</p>}
                </div>
                <button onClick={handleSubmit} className="form-input-btn-left" type="button">Login</button>
                <span className="form-input-login">Forgot Password? Click <a href="#">here</a></span>
            </form>
    );
}

export default LoginForm;
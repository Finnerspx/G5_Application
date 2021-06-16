import React from 'react';
import '../../Pages/Form/Form.css';
import useRegister from './useRegister';
import registerValidation from './RegisterValidation';
import RegisterNodeREDConnection from './RegisterNodeREDConnection';

const RegisterForm = ({ submitForm }) => {

    const {  handleSubmit, handleChange, values, errors } = useRegister(submitForm, registerValidation);
  

    return (
        <div className="form-content-right">
            <form className="form" noValidate>
                <h1>Register with G5.</h1>
                <p>Unlock your team's performance.</p>
                <row className="flex">
                    <input
                        type="text"
                        className="form-input-f-name"
                        name="firstName"
                        placeholder="First Name"
                        value={values.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <p>{errors.firstName}</p>}
                    <input
                        type="text"
                        className="form-input-l-name"
                        name="lastName"
                        placeholder="Last Name"
                        value={values.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <p>{errors.lastName}</p>}
                </row>
                <div className="form-inputs">
                    <input
                        type="email"
                        className="form-input"
                        name="email"
                        placeholder="Email Address"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="form-inputs">
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <button onClick={handleSubmit} className='form-input-btn' type='button' >Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;

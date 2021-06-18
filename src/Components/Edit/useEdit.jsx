import React from 'react';

/**
 * Represents useEdit
 * @returns values and handleChange
 */

function useEdit() {

    const [values, setValues] = React.useState({
        x0: '',
        y0: '',
        x1: '',
        y1: '',
        label: '',
    });

    /**
     * Represents handleChange
     * @param {event} e 
     * handleChange sets the values for the input fields within the form tag of EditPage. 
     * Values are captured by getting the name attribute from the input tag and setting the associated value to the name of the input
     */

    const handleChange = e => {
        e.preventDefault();

        setValues({
            ...values,
            [e.target.name]: [e.target.value]
        });
    }

    return {values, handleChange};


}

export default useEdit;

import React from 'react';

function useEdit() {

    const [values, setValues] = React.useState({
        x0: '',
        y0: '',
        x1: '',
        y1: '',
        label: '',
    });


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

import { useState } from "react";


export const useForm = ( initialState = {},setErrors ) => {
    
    const [values, setValues] = useState(initialState);

    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });

        setErrors((prevState) => ({
            ...prevState,
            [target.name]: undefined,
          }));
    }



    return [ values,setValues, handleInputChange ];

}

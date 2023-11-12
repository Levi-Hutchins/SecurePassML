import { json } from 'node:stream/consumers';
import React, { useState } from 'react';



const InputBox: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputPassword, setPassword] = useState('');
    const [passwordStrength, setStrength] = useState('');
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setPassword(event.target.value);

    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       
        try {
            const response = await fetch('http://127.0.0.1:5000/password_strength', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
                mode: 'cors',
                body: JSON.stringify({"password": inputPassword}),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const responseData = await response.json();
            setStrength(responseData);
            console.log('Your Password ',inputPassword,' has a strength of:', responseData);
            // Handle response data
        } catch (error) {
            console.error('Error sending password:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder=" Enter your password"
                style={
                    {width: '100%',
                    height: '25px',
                    borderRadius: '10px'}}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default InputBox;

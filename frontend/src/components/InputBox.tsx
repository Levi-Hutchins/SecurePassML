import { json } from 'node:stream/consumers';
import { TailSpin } from 'react-loader-spinner';
import React, { useState } from 'react';

function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

const InputBox: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputPassword, setPassword] = useState('');
    const [passwordStrength, setStrength] = useState('');
    const [isLoading, setLoading] = useState(false)
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setPassword(event.target.value);

    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

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
            await timeout(3000);
            const responseData = await response.json();
            setLoading(false)
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
            <button type="submit" style={{ position: 'relative' }}>
            {isLoading ? (
                <div style={{ position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                border: 'none',
                outline: 'none' }}>
                    <TailSpin color="#00BFFF" height={40} width={40} />
                </div>
            ) : (
                'Search'
            )}
        </button>
        </form>
    );
};

export default InputBox;
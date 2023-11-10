import React, { useState } from 'react';

const InputBox: React.FC = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the form from refreshing the page
        console.log(inputValue); // Print the value in the console
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter text"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default InputBox;

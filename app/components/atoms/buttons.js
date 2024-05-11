import React from 'react';

const ButtonForm = ({ type, onClick, text }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full mt-3 border border-yellow-400 hover:border-yellow-400 inline-block rounded-md focus:outline-none bg-transparent hover:bg-yellow-400 px-5 py-3 text-sm font-medium text-white hover:text-yellow-950 shadow-sm"
        >
            {text}
        </button>
    );
};

export default ButtonForm;

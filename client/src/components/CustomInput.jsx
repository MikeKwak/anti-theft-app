import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomInput = ({ formRef, registerPhoneNumber, setPasscode }) => {
    const [complete, setComplete] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();
    
    const handlePrevNext = (e, index) => {
        e.preventDefault();

        if (!/\d/.test(e.key)) {    //input is not a number
            if (e.key === 'Backspace') {    //delete
                if (complete) {
                    setComplete(false);
                }
                setPhoneNumber(phoneNumber.substring(0, phoneNumber.length - 1),);
                formRef.current[index].current.innerText = '';
                const prevElement = formRef.current[index - 1];
                if (prevElement) {
                    prevElement.current.focus();
                }
            } else if (e.key == 'Enter') {
                if (complete && registerPhoneNumber) {
                    //send POST request to server
                    registerPhoneNumber("+1" + phoneNumber);
                    //Link to MainPage
                    navigate('/activate');
                }
            }
        } else if (!complete) {
            setPhoneNumber(phoneNumber + e.key);
            formRef.current[index].current.innerText = e.key;
            const nextElement = formRef.current[index + 1];
            if (nextElement) {
                nextElement.current.focus();
            } else {
                if (setPasscode) {
                    setPasscode(phoneNumber + e.key);
                }
                setComplete(true);
            }
        }
    };

    return (
        <div className="flex">
            {formRef.current.map((ref, index) => (
                <span
                    key={index}
                    ref={ref}
                    className="border-b-2 border-white w-12 h-12 mr-2 flex justify-center items-center text-center text-white text-4x1"
                    contentEditable="true"
                    onKeyDown={(e) => handlePrevNext(e, index)}
                ></span>
            ))}
        </div>
    );
};

export default CustomInput;

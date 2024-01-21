import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const HelpButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const modalStyle = {
        width: '200px',
        padding: '10px',
        border: '2px solid #ccc',
        background: 'black',
        color: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        zIndex: 1000,
        display: isModalOpen ? 'block' : 'none', // Display based on isModalOpen
    };

    return (
        <div
            style={{ position: 'relative' }}
            onMouseLeave={() => setIsModalOpen(false)}
        >
            <div
                className="w-4 h-4 border-2 rounded-md flex justify-center items-center"
                onMouseEnter={() => setIsModalOpen(true)}
            >
                <FontAwesomeIcon
                    icon={faQuestion}
                    className="text-white text-2x1"
                />
            </div>
            <div className="pl-2 absolute top-0 left-full ">
                <div
                    style={modalStyle}
                    onMouseLeave={() => setIsModalOpen(false)}
                >
                    4 digit code used to deactivate later
                </div>
            </div>
        </div>
    );
};

export default HelpButton;

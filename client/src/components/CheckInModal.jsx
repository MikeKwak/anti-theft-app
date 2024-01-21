import React, { useState, useRef, useEffect } from 'react';
import CustomInput from './CustomInput';

const CheckInModal = ({ isOpen, onClose, setActivate, setRobbed }) => {
    const [passcode, setPasscode] = useState('');
    const [loaded, setLoaded] = useState(false);

    const formRef = useRef([]);

    useEffect(() => {
        // Initialize refs for n elements for digits
        for (let i = 0; i < 4; i++) {
            formRef.current[i] = formRef.current[i] || React.createRef();
        }
        setLoaded(true);
    }, []);

    if (!isOpen) {
        return null;
    }

    const handleCancel = () => {
        setPasscode(''); 
        onClose();
    };
    const handleUnlock = () => {
        if (passcode.length == 4) {
            const storedPasscode = localStorage.getItem('userPasscode');
            if (storedPasscode == passcode) {
                setActivate(false);
                setRobbed(false);
            }
            onClose(); 
        }
    };
    
    return (
        <div className="modal-overlay absolute w-[100%] h-[100%] flex justify-center items-center bg-gray-500 bg-opacity-50 z-20">
            <div className="modal-content border-2 text-white">
                <div className="modal-header flex justify-center">
                    <h4>Enter Details</h4>
                    <img src="/public/questionmark.png" alt="" className='bg-white object-fill'/>
                </div>
                <div className="modal-body">
                    {loaded && (
                        <CustomInput
                            formRef={formRef}
                            setPasscode={setPasscode}
                        />
                    )}
                </div>
                <div className="modal-footer flex justify-between">
                    <button className="" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button onClick={handleUnlock}>Unlock</button>
                </div>
            </div>
        </div>
    );
};

export default CheckInModal;

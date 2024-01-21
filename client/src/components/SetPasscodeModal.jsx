import React, { useState, useRef, useEffect } from 'react';
import CustomInput from './CustomInput';
import HelpButton from './HelpButton';

const SetPasscodeModal = ({ isOpen, onClose, setActivate }) => {
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
    const handleStart = () => {
        if (passcode.length == 4) {
            setActivate(true);
            localStorage.setItem('userPasscode', passcode);
            console.log('Input Value:', passcode);
            onClose();
        }
    };

    return (
        <div className="modal-overlay absolute w-[100%] h-[100%] flex justify-center items-center bg-gray-500 bg-opacity-50 z-20">
            <div className="modal-content border-2 rounded-xl bg-black p-6 text-white">
                <div className="modal-header text-center flex justify-center gap-2">
                    <h4 className="font-mono text-2xl">Enter Passcode</h4>
                    <HelpButton />
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
                    <button
                        className="p-2 font-mono text-lg border-1 border-indigo-500"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="p-2 font-mono text-lg"
                        onClick={handleStart}
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetPasscodeModal;

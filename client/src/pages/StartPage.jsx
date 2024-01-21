import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alert, registerPhoneNumber } from '../lib/api/user';
import Record from '../components/Record';
import CustomInput from '../components/CustomInput';

const StartPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [isZoomed, setIsZoomed] = useState(true);
    const logoRef = useRef(null);
    const formRef = useRef([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Initialize refs for n elements for digits
        for (let i = 0; i < 10; i++) {
            formRef.current[i] = formRef.current[i] || React.createRef();
        }
        setLoaded(true);

        setTimeout(() => {
            setIsZoomed(false);
        }, 2000);

        const handleBeforeUnload = (e) => {
            // Set a confirmation message
            e.returnValue = 'Changes you made may not be saved.';
            // Modern browsers may display a default message instead of what is assigned here
          };

        window.addEventListener('beforeunload', alert);

  // Remove event listener on cleanup
  return () => {
    window.removeEventListener('beforeunload', alert);
  };
    }, []);

    useEffect(() => {
        if (!isZoomed && logoRef.current) {
            logoRef.current.style.opacity = '0';
        }
    }, [isZoomed]);

    return (
        <div
            id="background"
            className="relative w-full h-screen bg-black flex flex-col items-center justify-center"
        >
            <div
                className="absolute top-1/4 left-1/2 transition-transform duration-300 ease-in-out"
                style={
                    isZoomed
                        ? {
                              transform:
                                  'translate(-50%) rotate(90deg) scale(1)',
                          }
                        : {
                              transform:
                                  'translate(-50%)  rotate(270deg) scale(0.25)',
                          }
                }
            >
                <Record />
            </div>
            <div
                ref={logoRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 transition-opacity duration-300 ease-in-out"
            >
                <h1 className="text-white text-3xl">Vanguard</h1>
            </div>

            {isZoomed ? (
                <div></div>
            ) : (
                <>
                    <div className="font-mono text-white text-xl">Enter Your Phone Number</div>
                    {loaded && (
                        <CustomInput
                            formRef={formRef}
                            registerPhoneNumber={registerPhoneNumber}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default StartPage;

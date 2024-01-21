import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import Record from '../components/Record';
import SetPasscodeModal from '../components/SetPasscodeModal';
import CheckInModal from '../components/CheckInModal';
import { alert } from '../lib/api/user';

const MainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [activate, setActivate] = useState(false);
    const [robbed, setRobbed] = useState(false);

    const [zoomIn, setZoomIn] = useState(false);

    useEffect(() => {
        if (robbed) {
            alert();
            const timeoutId = setTimeout(() => {
                setRobbed(false);
            }, 500); // The flash duration could be 500ms

            return () => clearTimeout(timeoutId);
        }
    }, [robbed]);

    useEffect(() => {
        setTimeout(() => {
            setZoomIn(true);
        }, 500);

        const handleBeforeUnload = (e) => {
            alert();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        let batteryManager;

        async function getBattery() {
            try {
                batteryManager = await navigator.getBattery();
                batteryManager.addEventListener('chargingchange', () =>
                    setRobbed(true),
                );
            } catch (error) {
                console.error(
                    'Battery Status API is not supported on this platform.',
                );
            }
        }

        if (activate) {
            window.addEventListener('beforeunload', function (e) {
                e.preventDefault(); // If you prevent default behavior in older browsers
                e.returnValue = ''; // Chrome requires returnValue to be set
            });

            getBattery();
        }

        return () => {
            if (batteryManager) {
                batteryManager.removeEventListener('chargingchange', () =>
                    setRobbed(true),
                );
                window.removeEventListener('beforeunload', function (e) {
                    e.preventDefault();
                });
            }
        };
    }, [activate]);

    const closeModal = () => {
        console.log('hey');
        setIsModalOpen(false);
    };

    const getRecordStyle = () => {
        if (!zoomIn) {
            return {
                transform:
                    'translateY(0%) translateX(-50%) rotate(270deg) scale(0.25)',
            };
        }
        if (activate) {
            return {
                transform:
                    'translateY(-50%) translateX(300px) translateX(-50%) rotate(280deg) scale(0.5)',
            };
        }
        return {
            transform: 'translateY(0%) translateX(-50%) rotate(90deg) scale(1)',
        };
    };

    return (
        <div
            className="relative w-full h-screen bg-black  flex flex-col items-center justify-center overflow-hidden"
            onClick={!isModalOpen ? () => setIsModalOpen(true) : undefined}
        >
            <div
                className="absolute top-1/4 left-1/2 transition-transform duration-300 ease-in-out z-10"
                style={getRecordStyle()}
            >
                <Record />
            </div>
            <div
                className="absolute top-8 left-8"
            >
                <Webcam
                    width={480}
                    height={720}
                    mirrored={true}
                    style={{
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        zIndex: '100',
                        // Any other styles you want to apply
                    }}
                />
            </div>

            {activate ? (
                <>
                    <div className="absolute bottom-0 left-0 text-white">
                        <h1>Recording In Process</h1>
                    </div>

                    <CheckInModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        setActivate={setActivate}
                        setRobbed={setRobbed}
                    />
                </>
            ) : (
                <>
                    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 text-white whitespace-nowrap">
                        <h3 className="font-mono text-4xl">
                            Click anywhere to activate
                        </h3>
                    </div>

                    <SetPasscodeModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        setActivate={setActivate}
                    />
                </>
            )}

            {/* Red Flash Overlay */}
            {robbed && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'red',
                        opacity: 0.5,
                        transition: 'opacity 0.5s ease-in-out',
                    }}
                    onAnimationEnd={() => setRobbed(false)}
                />
            )}

            <div
                className="vertical-line h-screen w-4 bg-white absolute left-1/2 transition-transform duration-300 ease-in-out"
                style={
                    activate
                        ? {
                              transform: 'translateX(300px) translateY(0)',
                          }
                        : {
                              transform: 'translateX(300px) translateY(100%)',
                          }
                }
            ></div>
        </div>
    );
};

export default MainPage;

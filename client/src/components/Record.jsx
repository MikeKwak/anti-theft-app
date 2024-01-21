import React from 'react';

const Record = ({ style }) => {
    // Inline styles for scaling and rotating the component
    // const style = {
    //     transform: `scale(${scale}) rotate(${rotation}deg)`,
    // };

    return (
        <div style={style}>
            <div className="bg-white w-[240px] h-[240px] rounded-[50%] flex justify-center items-center">
                <div className="bg-black w-[220px] h-[220px] rounded-[50%] flex justify-center items-center">
                    <div className="bg-red-700 w-[180px] h-[180px] rounded-[50%] relative">
                        <div className="bg-red-900 w-[60px] h-[60px] rounded-[50%] absolute top-[55%] left-[20%]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Record;

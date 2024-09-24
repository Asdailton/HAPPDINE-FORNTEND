import Rating from "react-rating";
import React, { useState } from "react";



const Stars = ({corRegistrada, quantidade}) => {
    const [rating, setRating] = useState(3);
    const [color, setColor] = useState('#10AAFD'); // Default color for stars


    return (
        <div className='flex w-[100%] h-[80%] items-center'>
            <div className='flex w-[35%] h-[2vh] items-center '>
                <Rating
                    initialRating={quantidade}
                
                    emptySymbol={<span style={{ fontSize: '23px', color: '#ccc' }}>★</span>}
                    fullSymbol={<span style={{ fontSize: '23px', color: corRegistrada }}>★</span>}
                    fractions={1}
                    start={0}
                    stop={5}
                    readonly
                />
            </div>
       
        </div>
    );
};




export default Stars
import React, { useState } from 'react';
import Rating from 'react-rating';

const RatingComponent = () => {
    const [rating, setRating] = useState(3);
    const [color, setColor] = useState('');

    const handleRatingChange = (valor) => {
        setRating(valor);
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    return (
        <div className='flex w-[70%] h-[80%]'>
            <div className='flex w-[35%] h-[6vh]'>
                <Rating
                    initialRating={rating}
                    onChange={handleRatingChange}
                    emptySymbol={<span style={{ color: '#ccc' }}>★</span>}
                    fullSymbol={<span style={{ color }}>★</span>}
                    fractions={2}
                />
            </div>
            <div>
                <select id="colorSelect" onChange={handleColorChange} value={color}>
                    <option value="#10AAFD">🔵</option>
                    <option value="#C535BC">🟣</option>
                    <option value="#219557">🟢</option>
                    <option value="#2E3033">⚫</option>
                </select>
            </div>
        </div>
    );
};

export default RatingComponent;

import React, { useState } from 'react';
import Rating from 'react-rating';

const RatingComponent = () => {
    const [rating, setRating] = useState(3);
    const [color, setColor] = useState('#10AAFD'); // Default color for stars

    const handleRatingChange = (value) => {
        setRating(value);
        localStorage.setItem('stars', value);
    };

    const handleColorChange = (color) => {
        setColor(color);
        localStorage.setItem('color', color);
    };

    return (
        <div className='flex w-[100%] h-[80%] items-center'>
            <div className='flex w-[35%] h-[2vh] items-center '>
                <Rating
                    initialRating={rating}
                    onChange={handleRatingChange}
                    emptySymbol={<span style={{ fontSize: '23px', color: '#ccc' }}>★</span>}
                    fullSymbol={<span style={{ fontSize: '23px', color }}>★</span>}
                    fractions={1}
                    start={0}
                    stop={5}
                />
            </div>
            <div className=' relative'>
                <CustomSelect value={color} onChange={handleColorChange} />
            </div>
        </div>
    );
};

const CustomSelect = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const colors = [
        { color: '#10AAFD', label: 'Blue' },
        { color: '#C535BC', label: 'Purple' },
        { color: '#219557', label: 'Green' },
        { color: '#2E3033', label: 'Black' },
    ];

    const handleColorClick = (color) => {
        onChange(color);
        setIsOpen(false);
    };

    return (
        <div className='relative w-10 p-0.5 border'>
            <div
                className='w-3 h-3 rounded-full border flex items-center justify-center cursor-pointer'
                style={{ backgroundColor: value }}
                onClick={() => setIsOpen(!isOpen)}
            >
                
                {/* Display currently selected color */}
        
            
            <span className='ml-9 text-[12px] text-gray-400'>▼</span> {/* Dropdown indicator */}
            </div>
         

           
            {isOpen && (
                <div className='absolute top-full left-0  bg-white border border-gray-300 shadow-lg z-10'>
                    {colors.map(({ color, label }) => (
                        <div
                            key={color}
                            className='flex items-center p-2 cursor-pointer hover:bg-gray-100'
                            onClick={() => handleColorClick(color)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" fill={color} />
                            </svg>
                           
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RatingComponent;
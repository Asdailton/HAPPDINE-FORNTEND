import { useState } from "react";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());


    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate(); 
    };

    
    const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate); 
        const days = [];

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day); 
        }
        return days;
    };

    return (
        <div className="w-[100%] h-[27vh] font-poppins max-w-xs mx-auto bg-white overflow-hidden">
            <header className="flex justify-between items-center h-[16%] bg-[#2E3033] text-white p-4">
                <button className="text-1xl">◀</button>
                <h2 className="text-[14px]">
                    {currentDate.toLocaleString("default", { month: "long" })}
                </h2>
                <button className="text-1xl">▶</button>
            </header>
            <div className="pt-4  pl-8 pr-8 pb-5" >
                <div className="grid border-b-[1px] grid-cols-7 h-[2.5vh]  text-[11px] text-center font-bold">
                    {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map((day) => (
                        <div key={day} className="py-1">{day}</div> 
                    ))}
                </div>
                <div className="grid grid-cols-7 text-[80%] font-bold text-center">
                    {generateCalendarDays().map((day) => (
                        <div key={day} className="p-2 hover:bg-gray-200 cursor-pointer">
                            {day} 
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Calendar;

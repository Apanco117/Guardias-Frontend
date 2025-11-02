import DayLoading from "./DayLoading";


type CalendarGridType = {
    year : number;
    month : number;
}

const WEEK_DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export default function CalendarLoading( { year, month } : CalendarGridType ) {
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Cuántos días tiene este mes (28, 29, 30 o 31)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Crear un array de los días [1, 2, 3, ..., 31]
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Crear un array para los "espacios vacíos"
    const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Vista de escritorio */}
             <div className="hidden md:grid grid-cols-7 gap-2">
                {/* Encabezado (Dom, Lun, Mar...) */}
                {WEEK_DAYS.map(day => (
                    <div key={day} className="text-center font-bold text-gray-100 mb-2">
                        {day}
                    </div>
                ))}
                {paddingDays.map(pad => (
                    <div key={`pad-${pad}`} className="border-transparent rounded-md"></div>
                ))}

                {daysArray.map(day => {
                    return (
                        <DayLoading 
                        key={day}
                        day={day}
                        />
                    );
                })}

             </div>
        </div>
    )
}

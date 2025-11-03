import type { Guardia, HomeOfficeEvent } from '@/types';
import { useMemo } from 'react';
import DayCell from './DayCell';


type CalendarGridType = {
    year : number;
    month : number;
    guardias : Guardia[];
    homeOffice : HomeOfficeEvent[]
    
}
const WEEK_DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export default function CalendarGrid( {year, month, guardias, homeOffice} : CalendarGridType ) {

    const eventByDay = useMemo( () => {

        const map = new Map<number, { guardias: Guardia[], ho: HomeOfficeEvent[] }>();

        guardias.forEach(g => {

            const eventDate = new Date(g.fecha);
            if (eventDate.getUTCMonth() === month && eventDate.getUTCFullYear() === year) {
                const day = eventDate.getUTCDate(); 
                const entry = map.get(day) || { guardias: [], ho: [] };
                entry.guardias.push(g);
                map.set(day, entry);
            }
        });

        homeOffice.forEach(h => {
            const eventDate = new Date(h.fecha);
            if (eventDate.getUTCMonth() === month && eventDate.getUTCFullYear() === year) {
                const day = eventDate.getUTCDate();
                const entry = map.get(day) || { guardias: [], ho: [] };
                entry.ho.push(h);
                map.set(day, entry);
            }
        });

        return map;

    }, [guardias, homeOffice, year, month] )
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Cuántos días tiene este mes (28, 29, 30 o 31)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Crear un array de los días [1, 2, 3, ..., 31]
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Crear un array para los "espacios vacíos"
    const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    return (
        <div className="max-w-7xl mx-auto p-4">

            {/* --- VISTA DE ESCRITORIO (GRID) --- */}
            {/* 'hidden' en móvil, 'grid' en pantallas 'md' y superiores */}
            <div className="hidden sm:grid grid-cols-7 gap-2">
                {/* Encabezado (Dom, Lun, Mar...) */}
                {WEEK_DAYS.map(day => (
                    <div key={day} className="text-center font-bold text-gray-100 mb-2">
                        {day}
                    </div>
                ))}

                {/* Días de relleno (padding) */}
                {paddingDays.map(pad => (
                 <div key={`pad-${pad}`} className="border-transparent rounded-md"></div>
                ))}

                {/* Celdas de los días */}
                {daysArray.map(day => {
                    const events = eventByDay.get(day) || { guardias: [], ho: [] };
                    return (
                        <DayCell
                        key={day}
                        day={day}
                        guardias={events.guardias}
                        homeOffice={events.ho}
                        />
                    );
                })}
            </div>

            {/* --- VISTA MÓVIL (LISTA) --- */}
            {/* Se muestra en móvil, 'hidden' en 'md' y superiores */}
            <div className="sm:hidden flex flex-col space-y-2">
                {daysArray.map(day => {
                    const events = eventByDay.get(day) || { guardias: [], ho: [] };
                    const date = new Date(year, month, day);
                    const dayOfWeek = date.getDay();

                    // No mostramos fines de semana en la lista si no tienen eventos
                    if ((dayOfWeek === 0 || dayOfWeek === 6) && events.guardias.length === 0 && events.ho.length === 0) {
                        return null;
                    }
                    
                    // Formateamos el título del día para la lista
                    const dayTitle = date.toLocaleString('es-ES', { 
                        weekday: 'long', 
                        day: 'numeric' 
                    });

                    return (
                        <div key={`list-${day}`} className="bg-card border border-border rounded-lg shadow-sm">
                        <h3 className="font-semibold text-gray-100 p-3 bg-card-foreground/10 rounded-t-lg">
                            {dayTitle}
                        </h3>
                        {/* Usamos el mismo componente 'DayCell' pero le quitamos el 'day' */}
                        <div className="p-2">
                            <DayCell 
                                day={day} // Pasamos el 'day' para que 'DayCell' no necesite cambios
                                guardias={events.guardias}
                                homeOffice={events.ho}
                            />
                        </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

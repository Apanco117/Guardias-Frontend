import type { Guardia, HomeOfficeEvent } from "@/types"
import React from "react";


type DayCellProps = {
    day: number
    guardias: Guardia[];
    homeOffice : HomeOfficeEvent[]
}


export default function DayCell( {day, guardias, homeOffice} : DayCellProps ) {
    console.log(day)
    return (
        <div  className="border border-border p-2 flex flex-col">
            <span className="hidden sm:flex self-end font-medium text-gray-100">{day}</span>

            <div className="grow overflow-y-auto space-y-1">
                {guardias.map((g) => (
                    <React.Fragment key={g._id}>
                        
                        {/* Tarjeta 1: Guardia Principal */}
                        <div 
                            className="p-1.5 bg-red-100 text-red-800"
                        >
                            <p className="text-xs font-semibold truncate">{g.idUsuarioPrincipal.nombre}</p>
                        </div>

                        {/* Tarjeta 2: Guardia Apoyo (Tarjeta separada) */}
                        <div 
                            className="p-1.5 bg-cyan-100 text-cyan-800" // Color diferente
                        >
                            <p className="text-xs font-semibold truncate">{g.idUsuarioApoyo.nombre}</p>
                        </div>

                    </React.Fragment>
                ))}
                {homeOffice.map((ho) => (
                    <div 
                        key={ho.idUsuario._id}
                        className="p-1.5 bg-green-100 text-green-800"
                    >
                        <p className="text-xs font-semibold truncate">
                            {ho.idUsuario.nombre}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    )
}

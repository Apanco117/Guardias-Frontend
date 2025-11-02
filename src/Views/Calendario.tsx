import { getCalendarioGuardias, getCalendarioHO } from "@/api";
import CalendarGrid from "@/components/Calendario/CalendarGrid";
import type { Guardia, HomeOffice } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {ButtonGroup} from "@/components/ui/button-group"
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarLoading from "@/components/Calendario/CalendarLoading";
import GenerarCalendario from "@/components/Calendario/GenerarCalendario";
import { monthsNames } from "@/Data/Months";

export default function Calendario() {

    
    

    const [month , setMonth] = useState( new Date().getMonth() ) // 0 - 11
    const [year, setYear] = useState( new Date().getFullYear() )
    
    console.log( `${month} / ${year}` )

    const { 
        data: guardiasData, 
        isLoading: isLoadingGuardias,
        isError: isErrorGuardias
    } = useQuery<Guardia[]>({
        queryKey: ['calendario_guardia', month, year],
        queryFn: () => getCalendarioGuardias(month + 1, year),
    });

    const { 
        data: homeOfficeData, 
        isLoading: isLoadingHO,
        isError: isErrorHO
    } = useQuery<HomeOffice[]>({
        queryKey: ['calendario_ho', month, year],
        queryFn: () => getCalendarioHO(month + 1, year),
    });


    const isLoading = isLoadingGuardias  || isLoadingHO

    const errors = isErrorGuardias || isErrorHO

    const handleLeft = () => {
        if ( month == 0 ) {
            setYear( year - 1 )
            setMonth(11)
        } else {
            setMonth( month - 1 );
        }
    }

    const handleRight = () => {

        if ( month < 11 ){
            setMonth( month + 1 );
        } else {
            setYear( year + 1 )
            setMonth( 0 )
        }

    }
 
    return (
        <div className="">
            <div className=" w-full grid grid-cols-1 md:grid-cols-3 py-5 ">
                <div>

                </div>
                <div className=" w-full flex justify-center">
                    <ButtonGroup className="">
                        <Button onClick={handleLeft} className="cursor-pointer" > 
                            <ChevronLeft />
                        </Button>
                        <Button className="">{monthsNames[month]} { year }</Button>
                        <Button onClick={handleRight} className="cursor-pointer" >
                            <ChevronRight />    
                        </Button>   
                    </ButtonGroup>
                </div>
                <GenerarCalendario mes={month + 1} anio={year} />
            </div>
            {isLoading ? (
                <>
                    <CalendarLoading
                        year={year}
                        month={month}
                    />
                </>
            ) : errors ? (
               <>
               </> 
            ) : (
                <>
                    <CalendarGrid
                        year={year}
                        month={month}
                        guardias={guardiasData || []}
                        homeOffice={ homeOfficeData || []}
                    />
                </>
            )}
        </div>
    )
}

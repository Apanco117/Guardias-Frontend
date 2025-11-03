import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RequestGenrarCalendario, ResponseGenerarCalendario } from "@/types";
import { toast } from 'react-toastify';
import { generarCalendario } from "@/api";
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react";
import { Button } from "../ui/button";


type GenerarCalendarioProps = {
    mes: number,
    anio: number
}

export default function GenerarCalendario( {mes, anio} : GenerarCalendarioProps ) {

    const [isLoading, setLoading] = useState<boolean>(false)

    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseGenerarCalendario, Error, RequestGenrarCalendario>({
        mutationFn:generarCalendario,
        onSuccess:( data ) => {
            toast.success( data.message || "Calendario generado exitosamente" )
            queryClient.invalidateQueries({ queryKey: ['calendario_guardia', mes - 1, anio] });
            queryClient.invalidateQueries({ queryKey: ['calendario_ho', mes - 1, anio] });
        },
        onError: (error) => {
            toast.error(error.message || 'Error al generar el calendario.');
            setLoading(false)
        }
    })

    const handleClick = async () => {
        setLoading(true)
        await mutation.mutateAsync({ mes, anio });
        setLoading(false)
    }

    return (
        <div className=" w-full flex justify-end pt-5 md:pt-0">
            <Button disabled={isLoading} onClick={handleClick} variant={"outline"} className=" border-2 border-primary cursor-pointer w-full md:w-auto">
                {isLoading ? (
                    <>
                        <Spinner/> Generando calendario
                    </>
                ) : (
                    <> Generar calendario </>
                )}
            
            </Button>
        </div>
    )
}

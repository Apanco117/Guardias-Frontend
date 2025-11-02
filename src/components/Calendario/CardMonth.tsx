import type { Month, ResponseGenerarCalendario } from "@/types"
import { Card } from "../ui/card"
import { monthsNames } from "@/Data/Months"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteMounth } from "@/api"
import { toast } from 'react-toastify';
import { Spinner } from "@/components/ui/spinner"


type CardMonthProps = {
    month : Month
}

export default function CardMonth( {month } : CardMonthProps ) {
    const [isLoading, setLoading] = useState<boolean>(false)

    const queryClient = useQueryClient();

    const mutation = useMutation <ResponseGenerarCalendario, Error, Month> ({
        mutationFn:deleteMounth,
        onSuccess: (data) =>{
            toast.success( data.message || "Calendario generado exitosamente" )
            queryClient.invalidateQueries({ queryKey: ["month"] });
        },
        onError: (error) => {
            toast.error(error.message || 'Error al eliminar calendario del mes.');
            setLoading(false)
        }
    })

    const handleDelete = async() => {
        setLoading(true)
        await mutation.mutateAsync(month)
        setLoading(false)
    }

    return (
        <Card className=" w-full px-6 py-3 ">
            <div className=" w-full flex items-center">
                <div className=" flex w-1/2 justify-between items-center">
                    <p>{monthsNames[month.month - 1]}  </p>
                    <p>{month.year}</p>
                </div>
                <div className=" w-1/2 flex justify-end">
                    <Button onClick={handleDelete} disabled={isLoading} className=" bg-card cursor-pointer text-red-700 border-2 border-red-700 hover:bg-red-700 hover:text-white">
                        {isLoading ? (
                            <Spinner/>
                        ) : (
                            <Trash className=""/>
                        )}
                    </Button>
                </div>

            </div>
        </Card>
    )
}

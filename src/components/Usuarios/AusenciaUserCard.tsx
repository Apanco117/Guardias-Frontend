import type { Ausencia } from "@/types"
import { Card } from "../ui/card"
import { Calendar } from "@/components/ui/calendar"
import { type DateRange } from "react-day-picker"
import { useState } from "react"
import { TrashIcon } from "lucide-react"
import {IconButton} from '@/components/animate-ui/components/buttons/icon';
import { es } from "date-fns/locale"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { deleteAusencia } from "@/api/ReqAusencias"
import { Spinner } from "../ui/spinner"

type AusenciaUserCardProps = {
    ausencia : Ausencia
}
const parseUTCStringAsLocal = (dateString: string): Date => {
    const date = new Date(dateString);
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
    );
}

export default function AusenciaUserCard( {ausencia} : AusenciaUserCardProps ) {

    const queryClient = useQueryClient();

    const [isLoading, setLoading] = useState<boolean>(false)
    
    const mutation = useMutation<string, Error, string>({
        mutationFn:deleteAusencia,
        onSuccess: (data) => {
            toast.success( data|| "Ausencia eliminada exitosamente" )
            queryClient.invalidateQueries({ queryKey: ["ausencias", ausencia.idUsuario],  });
        },
        onError : (error) => {
            toast.error(error.message || 'Error al generar actualizar el home office.');
            setLoading(false)
        }
    })

    const [dateRange, _setDateRange] = useState<DateRange | undefined>({
        from: parseUTCStringAsLocal(ausencia.fechaInicio),
        // Aplica la función de parseo a 'to'
        to: parseUTCStringAsLocal(ausencia.fechaFin),
    })

    const handleDelete = async () => {
        setLoading(true);
        await mutation.mutateAsync(ausencia._id)
        setLoading(false);
    }

    return (
        <Card className=" py-5 px-3">
            <div className=" w-full flex-col space-y-3">
                <div className="w-full border-b-2 pb-3 flex justify-between items-center">
                    <div>
                        <h3 className=" text-zinc-600 text-xs">Motivo:</h3>
                        <p className=" text-xs">{ausencia.motivo}</p>
                    </div>
                    <IconButton onClick={handleDelete} disabled={isLoading}  className=" bg-background text-red-800 border-2 border-red-800 hover:bg-red-800 hover:text-white cursor-pointer">
                        {isLoading ? (<Spinner/>) : (<TrashIcon/>)}
                    </IconButton>
                </div>
                <div className=" w-full flex justify-center">
                    <Calendar
                        locale={es}
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        disabled={true}
                        numberOfMonths={1}
                        className="rounded-lg border shadow-sm aria-disabled:opacity-100"
                    />
                </div>
            </div>
            
        </Card>
    )
}

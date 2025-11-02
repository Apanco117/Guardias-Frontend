import type { Usuario } from "@/types"
import { Card } from "../ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { updateHO } from "@/api"
import { Spinner } from "../ui/spinner"

export type UsuarioAtributesProps = {
    usuario : Usuario
}

export type requestHo = {
    id: Usuario["_id"],
    ho : number
}

export default function UsuarioAtributes( {usuario} : UsuarioAtributesProps ) {

    const initialValue = usuario.tieneHomeOffice === true ? true : false;

    const [active, setActive ] = useState<boolean>(initialValue)
    const [isLoading, setLoading] = useState<boolean>(false)

    const queryClient = useQueryClient();

    const mutation = useMutation<string, Error, requestHo>({
        mutationFn:updateHO,
        onSuccess: (data) => {
            toast.success( data|| "Home office actualizado exitosamente" )
            queryClient.invalidateQueries({ queryKey: ["usuario", usuario._id],  });
            queryClient.invalidateQueries({ queryKey: ["usuarios"],  });
        },
        onError : (error) => {
            toast.error(error.message || 'Error al generar actualizar el home office.');
            setLoading(false)
        }
    })

    const handleChange = async () => {
        setLoading(true)
        const newValue = !active;
        setActive(!active)

        const ho = newValue === true ? 1 : 0

        await mutation.mutateAsync({id:usuario._id, ho})
        

        setLoading(false)

    }
    
    return (
        <Card className=" px-6 py-4 bg-background rounded-md mt-5">
            <div className="flex justify-between items-center gap-x-4">
                <Label htmlFor="home-office">Home office</Label>
                <div className=" flex justify-center items-center gap-x-2">
                    {isLoading ? (
                        <Spinner/>
                    ) : (<></>)}
                    <Switch disabled={isLoading} checked={active} id="home-office" className=" cursor-pointer" onChange={handleChange} onClick={handleChange} />

                </div>
            </div>
        </Card>
    )
}

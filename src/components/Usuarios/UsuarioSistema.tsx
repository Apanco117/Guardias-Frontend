import type { Sistema, Usuario } from "@/types"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { Card } from "../ui/card"
import { Label } from "@/components/ui/label"
import { SelectGroup, SelectLabel } from "@radix-ui/react-select"
import { coloresCategoria } from "@/Data/ColorsCategory"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { updateCategoria, updateSistema } from "@/api"
import { useState } from "react"
import { Spinner } from "../ui/spinner"

export type UsuarioSistemaProps = {
    usuario : Usuario,
    sistemas : Sistema[]
}

type requestCategoria = {
    id: Usuario["_id"],
    categoria : Usuario["categoria"],
}
type requestSistema = {
    id: Usuario["_id"],
    sistema : Usuario["idSistema"]
}

export default function UsuarioSistema( {usuario, sistemas} : UsuarioSistemaProps ) {

    const sistemaInicial = usuario.idSistema != null ? usuario.idSistema : "null"

    const queryClient = useQueryClient();
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isLoadingSistema, setLoadingSistema ] = useState<boolean>(false)
    
    const mutation = useMutation<string, Error, requestCategoria>({
        mutationFn:updateCategoria,
        onSuccess: (data) => {
            toast.success( data|| "Categoria actualizada exitosamente" )
            queryClient.invalidateQueries({ queryKey: ["usuario", usuario._id],  });
            queryClient.invalidateQueries({ queryKey: ["usuarios"],  });
        },
        onError : (error) => {
            toast.error(error.message || 'Error al generar actualizar la categoria.');
            setLoading(false)
        }
    })
    const mutationSistema = useMutation<string, Error, requestSistema>({
        mutationFn:updateSistema,
        onSuccess: (data) => {
            toast.success( data|| "Sistema actualizado exitosamente" )
            queryClient.invalidateQueries({ queryKey: ["usuario", usuario._id],  });
            queryClient.invalidateQueries({ queryKey: ["usuarios"],  });
        },
        onError : (error) => {
            toast.error(error.message || 'Error al generar actualizar el sistema.');
            setLoadingSistema(false)
        }
    })

    const handleChangeCategory = async (newValue: string) => {
        setLoading(true);
        const newValueClean : Usuario["categoria"] = newValue === "principal" ? "principal" : "apoyo";
        await mutation.mutateAsync({id:usuario._id, categoria : newValueClean});
        setLoading(false)
    }
    const handleChangeSistema = async (newValue : string) => {
        setLoadingSistema(true);
        await mutationSistema.mutateAsync({id: usuario._id, sistema : newValue})
        setLoadingSistema(false)
    }

    return (
        <Card className=" px-6 py-4 bg-background rounded-md mt-5">
            <div className="flex justify-between items-center gap-x-4">
                <Label htmlFor="categoria">Categoria</Label>
                <div className=" w-1/2 md:w-1/3 flex justify-center items-center gap-x-2">
                    {isLoading ? (<Spinner className=" size-5"/>) : (<></>)}
                    <Select defaultValue={usuario.categoria} onValueChange={handleChangeCategory} disabled={isLoading} >
                        <SelectTrigger className=" w-full">
                            <SelectValue placeholder = "Seleccione una categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className=" text-sm py-3 text-center border-b-2 border-card">Categorias</SelectLabel>
                                <SelectItem value="principal" className=" flex" >
                                    <div className={` w-3 h-3 rounded-full ${coloresCategoria["principal"]}`} ></div>
                                    <p>Principal</p>
                                </SelectItem>
                                <SelectItem value="apoyo" >
                                    <div className={` w-3 h-3 rounded-full ${coloresCategoria["apoyo"]}`} ></div>
                                    <p>Apoyo</p>
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex justify-between items-center gap-x-4">
                <Label htmlFor="sistema">Sistema</Label>
                <div className=" w-1/2 md:w-1/3 flex justify-center items-center gap-x-2">
                    {isLoadingSistema ? (<Spinner className=" size-5"/>) : (<></>)}

                    <Select defaultValue={sistemaInicial} disabled={isLoadingSistema} onValueChange={handleChangeSistema} >
                        <SelectTrigger className=" w-full">
                            <SelectValue placeholder = "Seleccione un sistema" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className=" text-sm py-3 text-center border-b-2 border-card">Sistemas</SelectLabel>

                                <SelectItem value="null" className=" flex" >
                                    <p>Sin sistema</p>
                                </SelectItem>

                                {sistemas.map( (sistema) => {
                                    return (
                                        <SelectItem key={sistema._id} value={sistema._id} className=" flex" >
                                            <p>{sistema.nombre}</p>
                                        </SelectItem>
                                    )
                                } )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </Card>
    )
}

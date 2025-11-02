import { getUserById } from "@/api";
import { getAusenciasUsuario } from "@/api/ReqAusencias";
import { getSistemas } from "@/api/ReqSistemas";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AusenciasUsuarios from "@/components/Usuarios/AusenciasUsuarios";
import CreateAusencia from "@/components/Usuarios/CreateAusencia";
import UsuarioAtributes from "@/components/Usuarios/UsuarioAtributes";
import UsuarioForm from "@/components/Usuarios/UsuarioForm";
import UsuarioSistema from "@/components/Usuarios/UsuarioSistema";
import type { Ausencia, Sistema, Usuario } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminUser() {

    const params = useParams();
    const userId = params.userId;

    const {data, isLoading, isError} = useQuery<Usuario>({
        queryKey: ["usuario", userId], 
        queryFn: () => getUserById(userId!),
        enabled: !!userId
    })

    const { data : dataSistemas, isLoading : isLoadingSistemas, isError : isErrorSistemas } = useQuery<Sistema[]>({
        queryKey:["sistemas"],
        queryFn: getSistemas
    })

    const {data : dataAusencias, isLoading : isLoadingAusencias, isError : isErrorAusencias} = useQuery<Ausencia[]>({
        queryKey:["ausencias", userId],
        queryFn: () => getAusenciasUsuario(userId!),
        enabled: !!userId
    })


    const loading = isLoading || isLoadingSistemas || isLoadingAusencias;
    const error = isError || isErrorSistemas || isErrorAusencias

    const navigate = useNavigate()
    

    return (
        <div className=" w-full pt-5 pb-10">
            {loading ? (
                <div className=" w-full">
                    <div className=" space-y-2">
                        <Skeleton className=" w-1/2 h-12" />
                        <Skeleton className=" w-1/2 h-12" />
                    </div>
                    <div className=" space-y-2 pt-5">
                        <div className=" w-full flex justify-between space-x-16">
                            <Skeleton className=" h-24 w-24 rounded-full" />
                            <div className=" flex-1 space-y-2">
                                <Skeleton className=" w-full h-12" />
                                <Skeleton className=" w-full h-12" />
                            </div>
                        </div>
                        <Skeleton className=" w-full h-12" />
                    </div>
                </div>
            ) : error ? (
                <div className=" w-full">
                    <h2 className="text-xl font-bold">Error al cargar</h2>
                    <p className=" text-accent">Hubo un error al visualizar la informacion del usuario</p>
                </div>
            ) : (
                <>
                
                    {data != null && dataSistemas != null && dataAusencias != null ? (
                        <>  
                            <div className=" w-full flex flex-col-reverse gap-y-2 md:flex-row justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">Administar al usuario { data.nombre.split(" ")[0] }</h2>
                                    <p className=" text-accent">Visualiza y edita la informacion de {data.nombre}</p>
                                </div>
                                <div>
                                    <Button 
                                        onClick={() => navigate("/usuarios")}
                                        className=" bg-card border-2 border-primary hover:bg-primary hover:text-white cursor-pointer w-full md:w-auto"
                                    >
                                        <ArrowLeft/>
                                        Volver a usuarios
                                    </Button>
                                </div>
                            </div>
                            <div className=" w-full pt-5">
                                <UsuarioForm usuario={data} />
                                <UsuarioAtributes usuario={data} />
                                <UsuarioSistema usuario={data} sistemas={dataSistemas} />
                                <AusenciasUsuarios usuario={data} ausencias={dataAusencias} />
                                <CreateAusencia usuario={data} />
                            </div>
                        </>
                    ) : (<></>)}
                </>
            )}
        </div>
    )
}

import { getUsers } from "@/api";
import BasicLoading from "@/components/BasicLoading";
import NoDataBasic from "@/components/NoDataBasic";
import type { Usuario } from "@/types";
import { useQuery } from "@tanstack/react-query";
import ErrorBasic from "./ErrorBasic";
import UsuariosCard from "@/components/Usuarios/UsuariosCard";


export default function Users() {

    const { data, isLoading, isError } = useQuery <Usuario[]> ({
        queryKey:["usuarios"],
        queryFn:getUsers
    })

    const usuarios = data || [];

    return (
        <div className=" w-full pt-5">
            <div className=" w-full">
                <h2 className="text-xl font-bold">Administar usuarios</h2>
                <p className=" text-accent">Administre los usuarios disponibles</p>
            </div>
            <div className=" pt-5 w-full">
                {isLoading ? (
                    <BasicLoading/>
                ) : isError ? (
                    <ErrorBasic/>
                ) : (
                    <div className=" space-y-3">
                        { usuarios.length > 0 ? (
                            <>{usuarios.map( usuario => (
                                <UsuariosCard key={usuario._id} usuario={usuario} />
                            ) )}</>
                        ) : (
                            <NoDataBasic/>
                        ) }
                    </div>
                ) }
            </div>

        </div>
    )
}

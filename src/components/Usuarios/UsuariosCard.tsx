import type { Usuario } from "@/types"
import { Card } from "../ui/card"
import FormHomeOffice from "./FormHomeOffice"
import ActionUser from "./ActionUser"


type UsuarioCardProps = {
    usuario : Usuario
}



export default function UsuariosCard( {usuario} : UsuarioCardProps ) {
 
    const colorBorder = usuario.categoria === "principal" ? "border-cyan-400" : "border-pink-400"

    return (
        <Card className=" w-full px-3 md:px-6 py-3">
            <div className=" w-full flex justify-between items-center">
                <div className={` w-5/6 md:w-3/4 border-l-2 pl-2 ${colorBorder} flex justify-between`}>
                    <div className="space-y-0.5 w-2/3">
                        <p>{usuario.nombre}</p>
                        <p className=" text-xs text-zinc-600">{usuario.email}</p>
                    </div>
                    <div className=" flex justify-center items-center">
                        <FormHomeOffice ho={usuario.tieneHomeOffice} />
                    </div>
                </div>
                <div className="w-1/6 md:w-1/4 flex justify-end">
                    <ActionUser userId={usuario._id} />
                </div>
            </div>
        </Card>
    )
}

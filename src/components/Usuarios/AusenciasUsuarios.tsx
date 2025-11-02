import type { Ausencia, Usuario } from "@/types"


import { Button } from "@/components/ui/button"
import {Empty,EmptyContent,EmptyDescription,EmptyHeader,EmptyMedia,EmptyTitle,} from "@/components/ui/empty"
import { Cloud } from "lucide-react"
import AusenciaUserCard from "./AusenciaUserCard"

import { useNavigate } from "react-router-dom"

type AusenciasUsuariosProps = {
    usuario : Usuario,
    ausencias : Ausencia[]
}

export default function AusenciasUsuarios( {usuario, ausencias} : AusenciasUsuariosProps ) {
    const navigate = useNavigate();
    return (
        <>
            <div className=" w-full py-5 flex justify-between items-center">
                <div>
                    <h2 className=" text-xl font-bold">Ausencias</h2>
                    <p className=" text-accent">Administre las ausencias del usuario</p>
                </div>
                <div>
                    <Button onClick={() => navigate("?createAusencia=true") } className=" bg-card border-2 border-primary cursor-pointer">
                        Crear ausencia
                    </Button>
                </div>
            </div>

            {ausencias.length > 0 ? (
                <div className="w-full py-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ausencias.map( (ausencia) => {
                        return (
                            <AusenciaUserCard key={ausencia._id} ausencia={ausencia} />
                        )
                    } )}
                </div>
            ) : (
                <Empty className="border border-dashed">
                     <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Cloud />
                        </EmptyMedia>
                        <EmptyTitle>Registro de ausencias vacio</EmptyTitle>
                        <EmptyDescription>
                            Registre asucencias para {usuario.nombre} para visualizarlas aqui
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <Button onClick={() => navigate("?createAusencia=true") } variant="outline" size="sm" className=" cursor-pointer">
                            Crear ausencia
                        </Button>
                    </EmptyContent>
                </Empty>
            )}
        </>
    )
}

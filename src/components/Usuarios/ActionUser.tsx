import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { useMediaQuery } from "@/utils/mediaQuery";
import type { Usuario } from "@/types";
import { useNavigate } from "react-router-dom";

type ActionUserProps = {
    userId : Usuario["_id"]
}

export default function ActionUser({userId} : ActionUserProps) {
    const isDesktop = useMediaQuery('(min-width: 640px)');

    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/usuarios/${userId}`)
    }

    return (
        <ButtonGroup 
            aria-label="Button group" 
            orientation={isDesktop ? "horizontal" : "vertical"}
        >
            <Button 
                onClick={handleEdit}
                className="
                    bg-background cursor-pointer 
                    border-2 
                    border-b-0           /* Base: Sin borde inferior (móvil) */
                    sm:border-r-0        /* 'sm' y más: Sin borde derecho */
                    sm:border-b-2        /* 'sm' y más: Restaura borde inferior */
                "
            >
                <Pencil/>
            </Button>
            
            <Button 
                className="
                    bg-background cursor-pointer 
                    border-2 
                    text-red-800 
                    hover:bg-red-800 hover:text-white
                "
            >
                <Trash/>
            </Button>
        </ButtonGroup>
    )
}

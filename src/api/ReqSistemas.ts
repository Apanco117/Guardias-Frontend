import api from "@/lib/axios"
import { ApiResponseSistemasSchema } from "@/types/schemas"
import axios from "axios"
import z from "zod"


export const getSistemas = async () =>{
    try{
        const url = `/sistemas`
        const response = await api.get(url)
        const data = ApiResponseSistemasSchema.parse(response.data)
        return data.data
    } catch(error){
        if (error instanceof z.ZodError) {
            console.error('Error de validación de Zod:', error.issues);
            throw new Error(
                'Los datos recibidos del servidor tienen un formato incorrecto.'
            );
        }

        if (axios.isAxiosError(error)) {
            console.error('Error de API (Axios):', error.response?.data || error.message);
            throw new Error(
                error.response?.data?.message || 'Error al conectar con la API.'
            );
        }
        
        console.error('Error inesperado:', error);
        throw new Error('Ocurrió un error inesperado al obtener');
    }
}
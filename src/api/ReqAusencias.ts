import api from "@/lib/axios"
import type { Ausencia, AusenciaRequest, Usuario } from "@/types"
import { ApiResponseAusenciasSchema, ApiResponseSimpleSchema } from "@/types/schemas"
import axios from "axios"
import z from "zod"


export const getAusenciasUsuario = async ( idUsuario : Usuario["_id"] ) => {
    try{
        const url = `/ausencia/${idUsuario}`
        const response = await api.get(url)
        const data = ApiResponseAusenciasSchema.parse(response.data)
        return data.data
    } catch(error) {
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
export const createAusenciaUsuario = async ( body : AusenciaRequest ) => {
    try{
        const url = `/ausencia`
        const response = await api.post(url, body)
        const data = ApiResponseSimpleSchema.parse(response.data)
        return data.message
    } catch (error) {
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
export const deleteAusencia = async (id : Ausencia["_id"]) => {
    try{
        const url = `/ausencia/${id}`
        const response = await api.delete(url)
        const data = ApiResponseSimpleSchema.parse(response.data)
        return data.message
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
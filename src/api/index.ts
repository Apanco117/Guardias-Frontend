import api from "@/lib/axios";
import type { HomeOffice, Month, RequestGenrarCalendario, Usuario } from "@/types";
import { ApiResponseCalendarioGuardiaSchema, ApiResponseCalendarioHOSchema, ApiResponseSimpleSchema, ApiResponseUsuarioSchema, ApiResponseUsuariosSchema, ResponseGenerarCalendarioSchema, ResponseMonthsSchema } from "@/types/schemas";
import axios from "axios";
import z from "zod";

export const getCalendarioGuardias = async (
    mes: number,
    anio: number
) => {
    const url = '/calendario/obtener-calendario-mensual-guardia';
    

    try {
        const response = await api.get(url, {params: { mes, anio }});

        
        const data = ApiResponseCalendarioGuardiaSchema.parse(response.data);

        return data.data
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
        throw new Error('Ocurrió un error inesperado al obtener el calendario.');
    }
};


export const getCalendarioHO = async (
    mes: number,
    anio: number
): Promise<HomeOffice[]> => { // <-- Devuelve el tipo HomeOffice[]
    const url = '/calendario/obtener-calendario-mensual-home-office';
    

    try {
        const response = await api.get(url, {params: { mes, anio }});
        
        const data = ApiResponseCalendarioHOSchema.parse(response.data);

        // data.data ahora es un array de HomeOffice validado
        return data.data;

    } catch (error) {
        if (error instanceof z.ZodError) {
        
            console.error('Error de validación de Zod (HO):', error.issues);
            throw new Error(
                'Los datos de HO recibidos del servidor tienen un formato incorrecto.'
            );
        }

        if (axios.isAxiosError(error)) {
            console.error('Error de API (Axios HO):', error.response?.data || error.message);
            throw new Error(
                error.response?.data?.message || 'Error al conectar con la API de HO.'
            );
        }
        
        console.error('Error inesperado (HO):', error);
        throw new Error('Ocurrió un error inesperado al obtener el calendario de HO.');
    }
};

export const generarCalendario = async (body : RequestGenrarCalendario) => {
    const url = '/calendario/generar-calendario-mensual';
    try{
        const response = await api.post(url, body );
        const data = ResponseGenerarCalendarioSchema.parse(response.data)
        return data

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
        throw new Error('Ocurrió un error inesperado al obtener el calendario');
    }
}

export const getMonths = async() => {
    const url = '/calendario';
    try{    
        const response = await api.get(url)
        const data = ResponseMonthsSchema.parse(response.data)

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
        throw new Error('Ocurrió un error inesperado al obtener el calendario');
    }
}

export const deleteMounth = async( month : Month ) => {
    const url = "/calendario"
    try{
        const response = await api.delete(url,{params:{mes:month.month,anio:month.year}})
        const data = ResponseGenerarCalendarioSchema.parse(response.data)

        return data
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
        throw new Error('Ocurrió un error inesperado al obtener el calendario');
    }
}

export const getUsers = async () => {
    const url = "/usuarios"
    try{
        const response = await api.get(url)
        const data = ApiResponseUsuariosSchema.parse(response.data)
        return data.data
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
        throw new Error('Ocurrió un error inesperado al obtener el calendario');
    }
}
export const getUserById = async( id : Usuario["_id"] ) => {
    const url = `/usuarios/${id}`
    try{
        const response = await api.get(url)
        const data = ApiResponseUsuarioSchema.parse(response.data)
        return data.data
    } catch ( error ) {
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

export const updateUserName = async ( {id, nombre} : {id : Usuario["_id"], nombre : Usuario["nombre"]}) => {
    const url = `/usuarios/nombre/${id}`
    try{
        const response = await api.patch(url,{nombre})
        const data = ApiResponseSimpleSchema.parse(response.data)
        return data.message
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

export const updateUserEmail = async ( {id, email} : {id : Usuario["_id"], email : Usuario["email"]}) => {
    const url = `/usuarios/email/${id}`
    try{
        const response = await api.patch(url,{email})
        const data = ApiResponseSimpleSchema.parse(response.data)
        return data.message
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
export const updateHO = async ({id, ho} : {id: Usuario["_id"], ho : number }) =>{
    try{
        const url = `/usuarios/ho/${id}`
        const response = await api.patch(url,{ho})
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
export const updateCategoria = async ({id, categoria} : {id: Usuario["_id"], categoria : Usuario["categoria"]}) =>{
    try{
        const url = `/usuarios/categoria/${id}`
        const response = await api.patch(url,{categoria})
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
export const updateSistema = async ( {id, sistema} : {id : Usuario["_id"], sistema : Usuario["idSistema"]} ) => {
    try{
        const url = `/usuarios/sistema/${id}`
        const response = await api.patch(url,{sistema})
        const data = ApiResponseSimpleSchema.parse(response.data)
        return data.message
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

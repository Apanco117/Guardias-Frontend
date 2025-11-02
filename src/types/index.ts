import type z from "zod";
import type { ApiResponseAusenciasSchema, ApiResponseSimpleSchema, ApiResponseSistemasSchema, ApiResponseUsuarioSchema, ApiResponseUsuariosSchema, AusenciaRequestSchema, AusenciaSchema, GuardiaSchema, HomeOfficeSchema, MonthSchema, RequestGenrarCalendarioSchema, ResponseGenerarCalendarioSchema, SistemaSchema, UsuarioSchema } from "./schemas";



export interface SimpleUsuario {
    _id: string;
    nombre: string;
    categoria: 'principal' | 'apoyo';
}

export interface GuardiaEvent {
    fecha: string;
    idUsuarioPrincipal: SimpleUsuario;
    idUsuarioApoyo: SimpleUsuario;
}

export interface HomeOfficeEvent {
    fecha: string;
    idUsuario: SimpleUsuario;
}


export type Guardia = z.infer < typeof GuardiaSchema >
export type HomeOffice = z.infer<typeof HomeOfficeSchema>;
export type RequestGenrarCalendario = z.infer< typeof RequestGenrarCalendarioSchema >
export type ResponseGenerarCalendario = z.infer< typeof ResponseGenerarCalendarioSchema >

export type Month = z.infer< typeof MonthSchema >

//. Generico
export type ApiResponseSimple = z.infer< typeof ApiResponseSimpleSchema >

//. Sistemas
export type Sistema = z.infer<typeof SistemaSchema>;
export type ApiResponseSistemas = z.infer<typeof ApiResponseSistemasSchema>;


//. Usuarios
export type Usuario = z.infer< typeof UsuarioSchema >
export type ApiResponseUsuarios = z.infer< typeof  ApiResponseUsuariosSchema >
export type ApiResponseUsuario = z.infer< typeof ApiResponseUsuarioSchema >

//. Ausencias
export type Ausencia = z.infer<typeof AusenciaSchema>;
export type ApiResponseAusencias = z.infer<typeof ApiResponseAusenciasSchema>;
export type AusenciaRequest = z.infer<typeof AusenciaRequestSchema>;


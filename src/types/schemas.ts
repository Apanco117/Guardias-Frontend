import { z } from 'zod';


export const SistemaSchemaPopulate = z.object({
    _id: z.string(),
    nombre: z.string(),
});

export const UsuarioPopuladoSchema = z.object({
    _id: z.string(),
    nombre: z.string(),
    email: z.string(),
    idSistema: SistemaSchemaPopulate.nullable(),
    categoria: z.enum(['principal', 'apoyo']),
});

export const GuardiaSchema = z.object({
    _id: z.string(),
    fecha: z.string(),
    idUsuarioPrincipal: UsuarioPopuladoSchema,
    idUsuarioApoyo: UsuarioPopuladoSchema,
    
    
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number(),
});

export const ApiResponseCalendarioGuardiaSchema = z.object({
    message: z.string(),
    data: z.array(GuardiaSchema), 
});


export const UsuarioPopuladoHOSchema = z.object({
    _id: z.string(),
    nombre: z.string(),
    email: z.string().email(),
    categoria: z.enum(['principal', 'apoyo']),
});


export const HomeOfficeSchema = z.object({
    _id: z.string(),
    fecha: z.string().datetime(),
    idUsuario: UsuarioPopuladoHOSchema, 
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    __v: z.number(),
});


export const ApiResponseCalendarioHOSchema = z.object({
    message: z.string(),
    data: z.array(HomeOfficeSchema),
});


export const RequestGenrarCalendarioSchema = z.object({
    mes: z.number(),
    anio: z.number()
})

export const ResponseGenerarCalendarioSchema = z.object({
    message: z.string()
})

export const MonthSchema = z.object({
    year:z.number(),
    month:z.number()
})

export const ResponseMonthsSchema = z.object({
    message:z.string(),
    data: z.array(MonthSchema)
})

export const UsuarioSchema = z.object({
    _id: z.string(),
    nombre: z.string(),
    email: z.string({ message: "Email no válido" }),
    
    idSistema: z.string().nullable(), 
    
    categoria: z.enum(['principal', 'apoyo']),
    activo: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number(),
    
    ultimaGuardia: z.string().nullable().optional(), 
    tieneHomeOffice: z.boolean().nullable().optional(),
    ultimaHomeOffice: z.string().nullable().optional(),
});

export const ApiResponseUsuariosSchema = z.object({
    message: z.string(),
    data: z.array(UsuarioSchema),
});

export const ApiResponseUsuarioSchema = z.object({
    data:UsuarioSchema
})

export const ApiResponseSimpleSchema = z.object({
    message : z.string()
})

export const SistemaSchema = z.object({
    _id: z.string(),
    nombre: z.string(),
    descripcion: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    __v: z.number().int(),
});

export const ApiResponseSistemasSchema = z.object({
    message: z.string(),
    data: z.array(SistemaSchema),
});

//. Ausencias
export const AusenciaSchema = z.object({
    _id: z.string(),
    idUsuario: z.string(), // Es un string (MongoID)
    fechaInicio: z.string().datetime(), // Valida que sea un string de fecha ISO
    fechaFin: z.string().datetime(),
    motivo: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    __v: z.number().int(),
});

export const ApiResponseAusenciasSchema = z.object({
    message: z.string(),
    data: z.array(AusenciaSchema),
});

// --- Schema de Zod para el REQUEST (el body del POST) ---
export const AusenciaRequestSchema = z.object({
    userId: z.string(),
    motivo: z.string().min(5, {message: "El motivo debe tener minmo 5 caracteres"}),    
    fechaInicio: z.string().date('La fecha de inicio debe ser una fecha válida (YYYY-MM-DD).'),
    fechaFin: z.string().date('La fecha de fin debe ser una fecha válida (YYYY-MM-DD).'),
})
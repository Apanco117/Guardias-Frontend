import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription} from '@/components/animate-ui/components/radix/dialog';
import type { AusenciaRequest, Usuario } from '@/types';
import { useSearchParams } from 'react-router-dom';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AusenciaRequestSchema } from '@/types/schemas';

import { Button } from "@/components/ui/button"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { DateRange } from 'react-day-picker';
import z from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAusenciaUsuario } from '@/api/ReqAusencias';
import { useState } from 'react';
import { Spinner } from '../ui/spinner';
import { es } from 'date-fns/locale';

type CreateAusenciaType = {
    usuario : Usuario
}
const FormSchema = z.object({
    userId: z.string(),
    motivo: z.string().min(5, "El debe tener minimo 5 caracteres"),
    dateRange: z.custom<DateRange | undefined>().refine(date => {
        // Validamos que 'from' y 'to' existan
        return date?.from && date?.to;
    }, "Debe seleccionar un rango de fechas."),
});

type CreateAusenciaFormSchema = z.infer<typeof FormSchema>;


export default function CreateAusencia( {usuario} : CreateAusenciaType ) {

    const [searchParams, setSearchParams] = useSearchParams();

    const [isLoading, setLoading] = useState<boolean> (false);

    
    const showCreateForm = searchParams.get('createAusencia') === 'true';

    const handleCloseForm = () => {
        setSearchParams({});
    };

    const defaultValues: CreateAusenciaFormSchema = {
        userId: usuario._id,
        motivo: "",
        dateRange: undefined
    }

    const form = useForm<CreateAusenciaFormSchema>({
        resolver: zodResolver(FormSchema), 
        defaultValues
    });

    const queryClient = useQueryClient();
    
    const mutation = useMutation<string, Error, AusenciaRequest>({
        mutationFn:createAusenciaUsuario,
        onSuccess: () => {
            toast.success("Ausencia creada exitosamente" )
            queryClient.invalidateQueries({ queryKey: ["ausencias", usuario._id],  });
        },
        onError : (error) => {
            toast.error(error.message || 'Error al generar actualizar el home office.');
            setLoading(false)
        }
    })



    async function onSubmit(values: CreateAusenciaFormSchema ) {
        console.log(values)

        setLoading(true);

        if (!values.dateRange || !values.dateRange.from || !values.dateRange.to) {
            console.error("Error: El formulario se envió sin un rango de fechas completo.");
            return; 
        }

        const { from, to } = values.dateRange;
        const apiRequest: AusenciaRequest = {
            userId: values.userId,
            motivo: values.motivo,
            fechaInicio: from.toISOString().split('T')[0],
            fechaFin: to.toISOString().split('T')[0]
        };
        try {
            AusenciaRequestSchema.parse(apiRequest);

            await mutation.mutateAsync(apiRequest)
            
            setLoading(false)
            form.reset();
            handleCloseForm();

        } catch (error) {
            console.error("Error al validar los datos transformados:", error);
            setLoading(false);
        }
    }

    return (
        <Dialog open={showCreateForm} onOpenChange={handleCloseForm} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear ausencia </DialogTitle>
                    <DialogDescription> Cree una ausencia para {usuario.nombre} </DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name='motivo'
                                render={ ({field}) => (
                                    <FormItem>
                                        <FormLabel>Motivo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingrese el motivo" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Motivo de la ausencia
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                ) }
                            />
                            <FormField
                                control={form.control}
                                name="dateRange"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-1">
                                        <FormLabel>Rango de Fechas</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        id="dates"
                                                        className="w-full justify-between font-normal"
                                                    >
                                                        {field.value?.from && field.value?.to
                                                        ? (
                                                            <>
                                                                {field.value.from.toLocaleDateString('es-ES')} - {field.value.to.toLocaleDateString('es-ES')}
                                                            </>
                                                        )
                                                        : "Seleccione un rango"}
                                                        <ChevronDownIcon className="h-4 w-4" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="range"
                                                    selected={field.value} 
                                                    locale={es}
                                                    onSelect={field.onChange} 
                                                    captionLayout="dropdown"
                                                    numberOfMonths={2} 
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <Button disabled={isLoading} className='' type="submit">
                                    {isLoading ? (<><Spinner/> Creando ausencia </> ) : (<>Crear ausencia</>)}
                                    
                                </Button>

                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

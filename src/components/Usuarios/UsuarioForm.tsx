import type { Usuario } from "@/types";
import {
  Editable,
  EditableArea,
  EditableCancel,
  EditableInput,
  EditablePreview,
  EditableSubmit,
  EditableToolbar,
  EditableTrigger,
} from "@/components/ui/editable";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Pencil, PencilIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserEmail, updateUserName } from "@/api";
import { toast } from 'react-toastify';
import { isAxiosError } from "axios";

type UsuarioFormType = {
  usuario: Usuario;
};

const formSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre debe tener menos de 50 caracteres"),
  email: z
    .string()
    .min(3, "El email debe tener al menos 3 caracteres")
    .max(100, "El email debe tener menos de 100 caracteres"),
});


type FormSchema = z.infer<typeof formSchema>;

type requestName = {
    id: Usuario["_id"],
    nombre : Usuario["nombre"]
}

type requestEmail = {
    id: Usuario["_id"],
    email : Usuario["email"]
}

export default function UsuarioForm({ usuario }: UsuarioFormType) {
    const defaultValues: FormSchema = {
        nombre: usuario.nombre,
        email: usuario.email,
    };
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });
    const onSubmit = async (data: FormSchema) => {
        console.log("Formulario completo enviado:", data);
    };

    const queryClient = useQueryClient();
    const mutation = useMutation<string, Error, requestName>({
        mutationFn:updateUserName,
        onSuccess: (data) => {
            toast.success( data|| "Nombre actualizado exitosamente" )
            queryClient.invalidateQueries({ queryKey: ["usuario", usuario._id],  });
            queryClient.invalidateQueries({ queryKey: ["usuarios"],  });
        },
        onError : (error) => {
            toast.error(error.message || 'Error al generar actualizar el nombre.');
        }
    })

    const mutationEmail = useMutation<string, Error, requestEmail>({
        mutationFn:updateUserEmail,
        onSuccess: (data) => {
            toast.success( data|| "Email actualizado exitosamente" )
            queryClient.invalidateQueries({ queryKey: ["usuario", usuario._id],  });
            queryClient.invalidateQueries({ queryKey: ["usuarios"],  });
        },
        onError : (error) => {
            let errorMessage = 'Error al actualizar.';
            if (isAxiosError(error) && error.response) {
                console.log("error xd")
                const apiError = error.response.data;
                
                if (apiError && Array.isArray(apiError.errors) && apiError.errors.length > 0) {
                    errorMessage = apiError.errors[0].msg; 

                } else if (apiError && apiError.message) {
                    errorMessage = apiError.message;
                } else {
                    errorMessage = error.message;
                }

            } else {
                
                errorMessage = error.message;
            }
            
            toast.error(errorMessage);
        }
    })


    return (
        <Form {...form}>
        <form
            // Este onSubmit se activaría con un <Button type="submit">
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-2 rounded-md border p-4 shadow-sm"
        >
            {/* --- CAMPO NOMBRE --- */}
            <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
                <FormItem>
                {/* 1. FormLabel AHORA ES HERMANO DE FormControl */}
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                    <Editable
                        defaultValue={field.value}
                        
                        
                        onSubmit={async (newValue) => {
                            field.onChange(newValue);
                            const isValid = await form.trigger("nombre");

                            // 3. Ejecuta la lógica SÓLO SI es válido
                            if (isValid) {
                                console.log("Validación de 'nombre' exitosa. Guardando:", newValue);
                                await mutation.mutateAsync({
                                    id:usuario._id,
                                    nombre:newValue
                                })

                            }
                        }}

                        invalid={
                            !!form.formState.errors.nombre
                        }
                    >
                    <div className="flex items-start gap-4">
                        <EditableArea className="flex-1">
                        <EditablePreview />
                        <EditableInput />
                        </EditableArea>
                        <EditableTrigger asChild>
                        <Button type="button" variant="outline" size="sm">
                            <Pencil />
                        </Button>
                        </EditableTrigger>
                    </div>
                    <EditableToolbar>
                        <EditableSubmit asChild>
                        <Button type="button" size="sm">
                            Guardar
                        </Button>
                        </EditableSubmit>
                        <EditableCancel asChild>
                        <Button type="button" variant="outline" size="sm">
                            Cancelar
                        </Button>
                        </EditableCancel>
                    </EditableToolbar>
                    
                    {/* FormMessage YA NO VA AQUÍ */}
                    </Editable>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
           
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Editable
                    defaultValue={field.value}
                    
                    onSubmit={async (newValue) => {
                        field.onChange(newValue);
                        const isValid = await form.trigger("email");
                        
                        if (isValid) {
                             await mutationEmail.mutateAsync({
                                id:usuario._id,
                                email:newValue
                            })      
                        }
                    }}
                    
                    invalid={!!form.formState.errors.email}
                    >
                    {/* FormLabel YA NO VA AQUÍ */}
                    <div className="flex items-start gap-4">
                        <EditableArea className="flex-1">
                        <EditablePreview />
                        <EditableInput />
                        </EditableArea>
                        <EditableTrigger asChild>
                        <Button type="button" variant="outline" size="sm">
                            <PencilIcon />
                        </Button>
                        </EditableTrigger>
                    </div>
                    <EditableToolbar>
                        <EditableSubmit asChild>
                        <Button type="button" size="sm">
                            Guardar
                        </Button>
                        </EditableSubmit>
                        <EditableCancel asChild>
                        <Button type="button" variant="outline" size="sm">
                            Cancelar
                        </Button>
                        </EditableCancel>
                    </EditableToolbar>
                    {/* FormMessage YA NO VA AQUÍ */}
                    </Editable>
                </FormControl>
                {/* 3. FormMessage AHORA ES HERMANO DE FormControl */}
                <FormMessage />
                </FormItem>
            )}
            />
        </form>
        </Form>
    );
}
import { useState } from 'react';
import { Card } from './ui/card';
import ImageBackground from '@/assets/1.1-Image-1-bg.png'
import Logo from '@/assets/1.1-Image-1-Logo.png'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Eye, EyeOff, Info } from 'lucide-react';

const formSchema = z.object({
  institution: z.string().min(1, { message: 'Institución es requerida' }),
  email: z.string()
    .email({ message: 'Correo electrónico inválido' })
    .refine(
      (email) => /^[a-zA-Z0-9._%+-]+@(itcr\.ac\.cr|estudiantec\.cr)$/.test(email),
      { message: 'El correo debe ser institucional (@itcr.ac.cr o @estudiantec.cr)' }
    ),
  firstName: z.string().min(1, { message: 'Primer apellido es requerido' }),
  lastName: z.string().min(1, { message: 'Segundo apellido es requerido' }),
  name: z.string().min(1, { message: 'Nombre es requerido' }),
  idType: z.string().min(1, { message: 'Tipo de ID es requerido' }),
  idNumber: z.string().min(1, { message: 'Número de ID es requerido' }),
  password: z.string().min(8, { 
    message: 'La contraseña debe tener al menos 8 caracteres, con al menos 1 letra mayúscula, 1 letra minúscula y 1 número.' 
  })
    .refine(
      (password) => /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password),
      { message: 'La contraseña debe contener al menos 1 letra mayúscula, 1 letra minúscula y 1 número.' }
    )
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institution: '',
      email: '',
      firstName: '',
      lastName: '',
      name: '',
      idType: '',
      idNumber: '',
      password: ''
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Aquí iría la lógica para enviar los datos a la API de registro
  };

  return (
    <div className="h-screen w-screen min-h-screen fixed inset-0 overflow-hidden">      
        {/* Imagen izquierda */}      
        <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden bg-amber-300">
            <img 
            src={ImageBackground} 
            alt="Background Left" 
            className="w-full h-full object-cover"
            />
        </div>
      
        {/* Imagen derecha */}
        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden bg-amber-700">
            <img 
            src={ImageBackground} 
            alt="Background Right"
            className="w-full h-full object-cover"
            />
        </div>

        {/* Contenido del formulario */}        <div className="relative z-10 h-full w-full flex items-center justify-center p-4">
            <Card className='w-full max-w-2xl p-10 bg-white/90 backdrop-blur-3xl min-h-[900px] min-w-[1100px] overflow-y-auto'><div className="flex flex-col items-center justify-center mb-1">
                    <div className="flex items-center">
                        <img src={Logo} alt="Logo" className="w-[211px] h-[155px] -mt-3 -mr-12" />
                        <span className="text-[60px] font-extrabold text-black font-montserrat leading-tight">HitchHop</span>
                    </div>
                    <h2 className="text-[24px] font-bold text-center mt-0 mb-2">Cree una cuenta en HitchHop</h2>
                </div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-3">                            <FormField
                                control={form.control}
                                name="institution"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-normal">
                                            Institución <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <Select 
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="universidad1">Universidad 1</SelectItem>
                                                <SelectItem value="universidad2">Universidad 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-normal">
                                            Correo institucional <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-normal">
                                            Primer Apellido <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-normal">
                                            Segundo Apellido <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-normal">
                                            Nombre <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                              <FormField
                                control={form.control}
                                name="idType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-normal">
                                            Tipo de ID <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <Select 
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Seleccionar" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="cedula">Cédula</SelectItem>
                                                <SelectItem value="pasaporte">Pasaporte</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-normal">
                                            Contraseña <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input 
                                                    type={showPassword ? "text" : "password"} 
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                tabIndex={-1}
                                            >
                                                {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                ) : (
                                                <svg width="20" height="20" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.76011 6.26562C5.58818 6.42581 5.45027 6.61907 5.35462 6.83367C5.25898 7.04834 5.20755 7.2801 5.2034 7.51507C5.19925 7.75003 5.24248 7.98342 5.33049 8.20136C5.41851 8.41923 5.54951 8.61722 5.71569 8.78341C5.88186 8.94954 6.07984 9.08056 6.29771 9.16858C6.51565 9.25661 6.74904 9.29983 6.98401 9.29569C7.21897 9.29155 7.45073 9.2401 7.66534 9.14443C7.88001 9.04882 8.07321 8.91087 8.23345 8.73896" stroke="#747474" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M6.25781 3.46464C6.50357 3.43402 6.75096 3.41843 6.99865 3.41797C11.082 3.41797 12.832 7.5013 12.832 7.5013C12.5712 8.05961 12.2441 8.58449 11.8578 9.06464" stroke="#747474" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M3.85323 4.35938C2.69313 5.14957 1.76482 6.23494 1.16406 7.50354C1.16406 7.50354 2.91406 11.5869 6.9974 11.5869C8.115 11.5899 9.2087 11.2632 10.1416 10.6477" stroke="#747474" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M1.16406 1.66797L12.8307 13.3346" stroke="#747474" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                )}
                                            </button>
                                        </div>
                                        <div className="flex items-start gap-1.5 mt-2">
                                            <Info className="h-4 w-4 text-gray-500 mt-0.5" />
                                            <p className="text-xs text-gray-500">
                                                Mínimo 8 caracteres, con al menos 1 letra mayúscula, 1 letra minúscula, y 1 número.
                                            </p>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="idNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-normal">
                                            Número de ID <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>                        <div className="flex flex-col items-center space-y-2 mt-6">
                            <p className="text-xs text-red-500">* Información obligatoria</p>
                            <p className="text-sm">
                                Al continuar, usted acepta los <span className="font-semibold">Términos y Condiciones</span> del servicio
                            </p>
                            
                            <div className="flex items-center gap-4 mt-2">
                                <p className="text-sm">¿Tienes cuenta?</p>
                                <Button variant="link" className="p-0 h-auto text-indigo-500">
                                    Inicia sesión
                                </Button>
                            </div>
                            
                            <Button
                                type="submit"
                                className="bg-[#7875F8] hover:bg-[#5e5bcf] mt-2 w-[137px] h-[48px] text-[18px] transition-colors"
                            >
                                Continuar
                            </Button>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    </div>
  );
}
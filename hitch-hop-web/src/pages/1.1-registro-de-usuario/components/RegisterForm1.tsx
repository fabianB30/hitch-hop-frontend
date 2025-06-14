import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Info } from 'lucide-react';
import TermsAndConditionsDialog from './TermsAndConditionsDialog';
import * as z from 'zod';

// Esquema para la primera etapa del registro
const firstStepSchema = z.object({
  institution: z.string().min(1, { message: 'Institución es requerida' }),
  email: z.string()
    .email({ message: 'Correo electrónico inválido' })
    .refine(
      (email) => /^[a-zA-Z0-9._%+-]+@(itcr\.ac\.cr|estudiantec\.cr)$/i.test(email),
      { message: 'El correo debe ser institucional (@itcr.ac.cr o @estudiantec.cr)' }
    ),
  firstName: z.string().min(1, { message: 'Primer apellido es requerido' }),
  lastName: z.string().min(1, { message: 'Segundo apellido es requerido' }),
  name: z.string().min(1, { message: 'Nombre es requerido' }),
  idType: z.string().min(1, { message: 'Tipo de Identificación es requerido' }),
  idNumber: z.string().min(1, { message: 'Número de Identificación es requerido' }),
  password: z.string().min(8, {
    message: 'La contraseña debe tener al menos 8 caracteres, con al menos 1 letra mayúscula, 1 letra minúscula y 1 número.'
  })
    .refine(
      (password) => /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password),
      { message: 'La contraseña debe contener al menos 1 letra mayúscula, 1 letra minúscula y 1 número.' }
    )
});

type FirstStepData = z.infer<typeof firstStepSchema>;

interface RegisterForm1Props {
  onNext: (data: FirstStepData) => void;
  initialData?: Partial<FirstStepData>;
}

export default function RegisterForm1({ onNext, initialData }: RegisterForm1Props) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FirstStepData>({
    resolver: zodResolver(firstStepSchema),
    defaultValues: {
      institution: initialData?.institution || '',
      email: initialData?.email || '',
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      name: initialData?.name || '',
      idType: initialData?.idType || '',
      idNumber: initialData?.idNumber || '',
      password: initialData?.password || ''
    },
  });

  const onSubmit = (values: FirstStepData) => {
    onNext(values);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mb-1">
        <h2 className="text-xl md:text-[25px] font-semibold text-center mt-[-20px] ml-[40px]">
          Cree una cuenta en HitchHop
        </h2>
      </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-6">

            {/* Institución */}
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => {
              const showAsterisk = !field.value || form.formState.errors.institution;
              return (
              <FormItem className="ml-25 min-h-[80px]">
                <FormLabel className="text-base md:text-[20px] font-semibold">
                  Institución {showAsterisk && <span className="text-red-500">*</span>}
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                  <SelectTrigger className="w-[288px] h-[40px] bg-[#FFFFFF] border-[#A5A3A3] flex items-center">
                    <SelectValue placeholder="Seleccionar" className="truncate" />
                  </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  <SelectItem value="cartago">Instituto Tecnológico de Costa Rica - Sede Central Cartago</SelectItem>
                  <SelectItem value="sanjose">Instituto Tecnológico de Costa Rica - Sede San José</SelectItem>
                  <SelectItem value="alajuela">Instituto Tecnológico de Costa Rica - Sede Alajuela</SelectItem>
                  <SelectItem value="limon">Instituto Tecnológico de Costa Rica - Sede Limón</SelectItem>
                  <SelectItem value="san_carlos">Instituto Tecnológico de Costa Rica - Sede San Carlos</SelectItem>
                  </SelectContent>
                </Select>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
                </FormItem>
              );
              }}
            />

            {/* Correo institucional */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                const showAsterisk = !field.value || form.formState.errors.email;
                return (
                  <FormItem className="max-[80px]">
                    <FormLabel className=" md:text-[20px] text-base font-semibold">
                      Correo institucional {showAsterisk && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className='w-[288px] h-[40px]' />
                    </FormControl>
                    <div className="min-h-[30px] mt-[-5px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                );
              }}
            />

            {/* Nombre */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                const showAsterisk = !field.value || form.formState.errors.name;
                return (
                  <FormItem className="ml-25 min-h-[80px]">
                    <FormLabel className="text-base md:text-[20px] font-semibold">
                      Nombre {showAsterisk && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className='w-[288px] h-[40px]' />
                    </FormControl>
                    <div className="min-h-[20px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                );
              }}
            />

            {/* Primer Apellido */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => {
                const showAsterisk = !field.value || form.formState.errors.firstName;
                return (
                  <FormItem className="min-h-[80px]">
                    <FormLabel className="text-base md:text-[20px] font-semibold">
                      Primer Apellido {showAsterisk && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className='w-[288px] h-[40px]' />
                    </FormControl>
                    <div className="min-h-[20px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                );
              }}
            />

            {/* Segundo Apellido */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => {
                const showAsterisk = !field.value || form.formState.errors.lastName;
                return (
                  <FormItem className="ml-25 min-h-[80px]">
                    <FormLabel className="text-base md:text-[20px] font-semibold">
                      Segundo Apellido {showAsterisk && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className='w-[288px] h-[40px]' />
                    </FormControl>
                    <div className="min-h-[20px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                );
              }}
            />

            {/* Tipo de ID */}
            <FormField
              control={form.control}
              name="idType"
              render={({ field }) => {
              const showAsterisk = !field.value || form.formState.errors.idType;
              return (
                <FormItem className="min-h-[80px] mb-4">
                <FormLabel className="text-base md:text-[20px] font-semibold">
                  Tipo de Identificación {showAsterisk && <span className="text-red-500">*</span>}
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                  <SelectTrigger className="w-[288px] h-[40px] bg-[#FFFFFF] border-[#A5A3A3]">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  <SelectItem value="cedula">Cédula</SelectItem>
                  <SelectItem value="pasaporte">Pasaporte</SelectItem>
                  </SelectContent>
                </Select>
                <div className="max-h-[3px]">
                  <FormMessage />
                </div>
                </FormItem>
              );
              }}
            />

            {/* Contraseña */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                const showAsterisk = !field.value || form.formState.errors.password;
                return (
                  <FormItem className="ml-25 min-h-[140px] mt-[-4px]">
                    <FormLabel className="text-base md:text-[20px] font-semibold">
                      Contraseña {showAsterisk && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className='w-[288px] h-[40px]'
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.76011 6.26562C5.58818 6.42581 5.45027 6.61907 5.35462 6.83367C5.25898 7.04834 5.20755 7.2801 5.2034 7.51507C5.19925 7.75003 5.24248 7.98342 5.33049 8.20136C5.41851 8.41923 5.54951 8.61722 5.71569 8.78341C5.88186 8.94954 6.07984 9.08056 6.29771 9.16858C6.51565 9.25661 6.74904 9.29983 6.98401 9.29569C7.21897 9.29155 7.45073 9.2401 7.66534 9.14443C7.88001 9.04882 8.07321 8.91087 8.23345 8.73896" stroke="#747474" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.25781 3.46464C6.50357 3.43402 6.75096 3.41843 6.99865 3.41797C11.082 3.41797 12.832 7.5013 12.832 7.5013C12.5712 8.05961 12.2441 8.58449 11.8578 9.06464" stroke="#747474" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3.85323 4.35938C2.69313 5.14957 1.76482 6.23494 1.16406 7.50354C1.16406 7.50354 2.91406 11.5869 6.9974 11.5869C8.115 11.5899 9.2087 11.2632 10.1416 10.6477" stroke="#747474" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1.16406 1.66797L12.8307 13.3346" stroke="#747474" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className="flex items-start gap-1.5 mt-2">
                      <Info className={`h-4 w-4 mt-0.5 ${form.formState.errors.password ? 'text-red-500' : 'text-gray-500'}`} />
                      <p className={`text-[14px] ${form.formState.errors.password ? 'text-red-500' : 'text-gray-500'}`}>
                      Mínimo 8 caracteres, con al menos 1 letra mayúscula, 1 letra minúscula, y 1 número.
                      </p>
                    </div>
                  </FormItem>
                );
              }}
            />

            {/* Número de ID */}
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => {
                const showAsterisk = !field.value || form.formState.errors.idNumber;
                return (
                  <FormItem className="min-h-[120px] mt-[-4px]">
                    <FormLabel className="text-base md:text-[20px] mb-[14px] font-semibold">
                      Número de Identificación {showAsterisk && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl className='mt-[-15px]'>
                      <Input placeholder="" {...field} className='w-[288px] h-[40px]'/>
                    </FormControl>
                    <div className="flex items-start gap-1.5 mt-[5px]">
                      <p className="text-sm">¿Tienes cuenta?</p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-indigo-500"
                        type="button"
                        onClick={() => window.location.href = '/login'}
                      >
                        Inicia sesión
                      </Button>
                    </div>
                    <div className="min-h-[20px] mt-[-10px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                );
              }}
            />
          </div>
          
          <div className="flex flex-col items-center space-y-2 mt-[-20px]">
            <p className="text-[16px] text-red-500">* Información obligatoria</p>

            <p className="text-[18px] text-center">
              Al continuar, usted acepta los
              <TermsAndConditionsDialog>
                <button type="button" className="font-semibold underline text-[#7875F8] hover:text-[#5e5bcf] ml-1 mr-1">
                  Términos y Condiciones
                </button>
              </TermsAndConditionsDialog>
              del servicio
            </p>

            <Button
              type="submit"
              className="bg-[#7875F8] hover:bg-[#5e5bcf] mt-2 w-[137px] h-[48px] text-[18px] transition-colors"
            >
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

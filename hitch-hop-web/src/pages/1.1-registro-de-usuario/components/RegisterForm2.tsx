import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Info, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ImagePerfil from '@/assets/1.1-Image-Perfil.png';
import * as z from 'zod';

// Esquema para la segunda etapa del registro
const secondStepSchema = z.object({
  username: z.string().min(3, { message: 'Nombre de usuario debe tener al menos 3 caracteres' }),
  rol: z.string().min(1, { message: 'Tipo de usuario es requerido' }),
  birthDate: z.date({ required_error: "Fecha de nacimiento es requerida" }),
  phone: z.string().min(8, { message: 'Teléfono debe tener al menos 8 dígitos' }),
  gender: z.string().min(1, { message: 'Género es requerido' }),
});

type SecondStepData = z.infer<typeof secondStepSchema>;

interface RegisterForm2Props {
  onSubmit: (data: SecondStepData) => void;
  onBack: (data?: SecondStepData) => void;
  profileImage: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  initialData?: Partial<SecondStepData>;
  isSubmitting?: boolean;
  parameters: any[];
}

export default function RegisterForm2({ 
  onSubmit, 
  onBack, 
  profileImage, 
  onImageUpload, 
  initialData,
  isSubmitting = false,
  parameters
}: RegisterForm2Props) {
  const form = useForm<SecondStepData>({
    resolver: zodResolver(secondStepSchema),
    defaultValues: {
      username: initialData?.username || '',
      rol: initialData?.rol || '',
      phone: initialData?.phone || '',
      gender: initialData?.gender || '',
      birthDate: initialData?.birthDate,
    },
  });

  const handleSubmit = (values: SecondStepData) => {
    onSubmit(values);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-center">
          Últimos pasos para crear su cuenta
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sección de foto de perfil */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg md:text-[20px] font-semibold mb-4">Foto de perfil</h3>
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden bg-[#ECECFF] mb-4 flex items-center justify-center shadow-[0_4px_4px_0_rgba(135,94,255,0.25)]">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={ImagePerfil}
                alt="Perfil por defecto"
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full max-w-[159px] h-[36px] mb-2 bg-[#FFAB00] hover:bg-[#e59400] text-black" 
            onClick={() => document.getElementById('profile-upload')?.click()}
          >
            Editar foto de perfil
          </Button>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
          />
        </div>
        
        {/* Formulario */}        
        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Nombre de usuario */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => {
                  const showAsterisk = !field.value || form.formState.errors.username;
                  return (
                    <FormItem className="min-h-[80px]">
                      <FormLabel className="text-base md:text-lg font-medium">
                        Nombre de usuario {showAsterisk && <span className="text-red-500">*</span>}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  );
                }}
              />              
              {/* Fecha de nacimiento */}
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => {
                  const showAsterisk = !field.value || form.formState.errors.birthDate;
                  return (
                    <FormItem className="flex flex-col min-h-[80px] mt-[-10px]">
                      <FormLabel className="text-base md:text-lg font-medium">
                        Fecha de nacimiento {showAsterisk && <span className="text-red-500">*</span>}
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full pl-3 text-left font-normal border-[#A5A3A3] bg-[#FFFFFF]"
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy", { locale: es })
                              ) : (
                                <span className="text-muted-foreground">DD/MM/AAAA</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: Date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            locale={es}
                            captionLayout="dropdown-buttons"
                            fromYear={1900}
                            toYear={new Date().getFullYear()}
                            classNames={{
                              dropdown_month: "text-sm",
                              dropdown_year: "text-sm",
                              caption_dropdowns: "flex gap-2 justify-center items-center",
                              vhidden: "hidden",
                              caption_label: "hidden"
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  );
                }}
              />

              {/* Teléfono */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => {
                  const showAsterisk = !field.value || form.formState.errors.phone;
                  return (
                    <FormItem className="min-h-[80px]">
                      <FormLabel className="text-base md:text-lg font-medium">                        Teléfono {showAsterisk && <span className="text-red-500">*</span>}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  );
                }}
              />

              <div className="flex flex-col md:flex-row gap-6">
                {/* Género */}
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => {
                      const showAsterisk = !field.value || form.formState.errors.gender;
                      return (
                        <FormItem className="min-h-[80px]">
                          <FormLabel className="text-base md:text-lg font-medium">
                            Género {showAsterisk && <span className="text-red-500">*</span>}
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full bg-[#FFFFFF] border-[#A5A3A3]">
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                            </FormControl>                            <SelectContent>
                              {parameters.find(p => p.parameterName === "Géneros")?.parameterList?.map((option: string) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              )) || []}
                            </SelectContent>
                          </Select>
                          <div className="min-h-[20px]">
                            <FormMessage />
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                
                {/* Tipo de usuario */}
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="rol"
                    render={({ field }) => {
                      const showAsterisk = !field.value || form.formState.errors.rol;
                      return (
                        <FormItem className="min-h-[100px]">
                          <FormLabel className="text-base md:text-lg font-medium">
                            Tipo de usuario {showAsterisk && <span className="text-red-500">*</span>}
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full bg-[#FFFFFF] border-[#A5A3A3]">
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                            </FormControl>                            
                            <SelectContent>
                              {parameters.find(p => p.parameterName === "Rol")?.parameterList?.map((option: string) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              )) || []}
                            </SelectContent>
                          </Select>
                          <div className="flex items-center gap-1 mt-1">
                            <Info className="h-4 w-4 text-gray-500" />
                            <p className="text-xs text-gray-500">
                              Una vez creada la cuenta puede ser modificado
                            </p>
                          </div>
                          <div className="min-h-[20px]">
                            <FormMessage />
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                </div>              </div>

              <p className="text-base md:text-lg text-red-500 mt-4">* Información obligatoria</p>              {/* Botones */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-6 pt-4">                <Button 
                  type="button" 
                  onClick={() => {
                    // Obtener los valores actuales del formulario y pasarlos al volver
                    const currentValues = form.getValues();
                    // Solo pasar los datos si al menos un campo tiene valor
                    const hasAnyValue = Object.values(currentValues).some(value => 
                      value !== undefined && value !== null && value !== ''
                    );
                    onBack(hasAnyValue ? currentValues : undefined);
                  }}
                  disabled={isSubmitting}
                  className="w-full sm:w-[110px] h-[48px] bg-[#7875F8] hover:bg-[#5e5bcf] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Volver
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-[151px] h-[48px] bg-[#7875F8] hover:bg-[#5e5bcf] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creando...' : 'Crear perfil'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import { Card } from './ui/card';
import ImageBackground from '@/assets/1.1-Image-1-bg.png';
import Logo from '@/assets/1.1-Image-1-Logo.png';
import ImagePerfil from '@/assets/1.1-Image-Perfil.png';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger, AlertDialogCancel } from './ui/alert-dialog';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Info, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Esquema para la primera etapa del registro
const firstStepSchema = z.object({
	institution: z.string().min(1, { message: 'Institución es requerida' }),	email: z.string()
		.email({ message: 'Correo electrónico inválido' })
		.refine(
			(email) => /^[a-zA-Z0-9._%+-]+@(itcr\.ac\.cr|estudiantec\.cr)$/i.test(email),
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

// Esquema para la segunda etapa del registro
const secondStepSchema = z.object({
	username: z.string().min(3, { message: 'Nombre de usuario debe tener al menos 3 caracteres' }),
	userType: z.string().min(1, { message: 'Tipo de usuario es requerido' }),
	birthDate: z.date({ required_error: "Fecha de nacimiento es requerida" }),
	phone: z.string().min(8, { message: 'Teléfono debe tener al menos 8 dígitos' }),
	gender: z.string().min(1, { message: 'Género es requerido' }),
});

export default function Register() {
	const [showPassword, setShowPassword] = useState(false);
	const [currentStep, setCurrentStep] = useState(1); // Estado para controlar la etapa del formulario
	const [firstStepData, setFirstStepData] = useState<z.infer<typeof firstStepSchema> | null>(null);
	const [profileImage, setProfileImage] = useState<string | null>(null);
	
	// Formulario para la primera etapa
	const firstStepForm = useForm<z.infer<typeof firstStepSchema>>({
		resolver: zodResolver(firstStepSchema),
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

	// Formulario para la segunda etapa
	const secondStepForm = useForm<z.infer<typeof secondStepSchema>>({
		resolver: zodResolver(secondStepSchema),
		defaultValues: {
			username: '',
			userType: '',
			phone: '',
			gender: '',
		},
	});

	// Manejar el envío de la primera etapa
	const onSubmitFirstStep = (values: z.infer<typeof firstStepSchema>) => {
		console.log("Primera etapa:", values);
		setFirstStepData(values);
		setCurrentStep(2); // Avanzar a la segunda etapa
	};

	// Manejar el envío de la segunda etapa
	const onSubmitSecondStep = (values: z.infer<typeof secondStepSchema>) => {
		console.log("Segunda etapa:", values);
		console.log("Datos completos:", { ...firstStepData, ...values, profileImage });
		// Aquí iría la lógica para enviar todos los datos a la API de registro
		
	};

	// Función para manejar la carga de imagen de perfil
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					setProfileImage(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	// Función para volver a la primera etapa
	const handleBack = () => {
		setCurrentStep(1);
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

			{/* Contenido del formulario */}
			<div className="relative z-10 h-full w-full flex items-center justify-center p-4">
				<Card className='w-full max-w-2xl p-10 bg-white/90 backdrop-blur-3xl min-h-[900px] min-w-[1100px] overflow-y-auto'>
					{currentStep === 1 ? (
						<>
							<div className="flex flex-col items-center justify-center mb-1">
								<div className="flex items-center mr-20">
									<img src={Logo} alt="Logo" className="w-[211px] h-[155px] -mt-3 -mr-12" />
									<span className="text-[60px] font-extrabold text-black font-montserrat leading-tight">HitchHop</span>
								</div>
								<h2 className="text-[25px] font-semibold text-center mt-0 mb-2">Cree una cuenta en HitchHop</h2>
							</div>
							<Form {...firstStepForm}>
								<form onSubmit={firstStepForm.handleSubmit(onSubmitFirstStep)} className="space-y-4 mt-2">
									<div className="grid grid-cols-2 gap-x-8 gap-y-3">
										{/* Institución */}
										<FormField
											control={firstStepForm.control}
											name="institution"
											render={({ field }) => {
												const showAsterisk = !field.value || firstStepForm.formState.errors.institution;
												return (
													<FormItem>
														<FormLabel className="text-[20px] font-normal">
															Institución {showAsterisk && <span className="text-red-500">*</span>}
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
																<SelectItem value="cartago">Instituto Tecnológico de Costa Rica - Sede Central Cartago</SelectItem>
																<SelectItem value="sanjose">Instituto Tecnológico de Costa Rica - Sede San José</SelectItem>
																<SelectItem value="alajuela">Instituto Tecnológico de Costa Rica - Sede Alajuela</SelectItem>
																<SelectItem value="limon">Instituto Tecnológico de Costa Rica - Sede Limón</SelectItem>
																<SelectItem value="san_carlos">Instituto Tecnológico de Costa Rica - Sede San Carlos</SelectItem>
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												);
											}}
										/>

										{/* Correo institucional */}
										<FormField
											control={firstStepForm.control}
											name="email"
											render={({ field }) => {
												const showAsterisk = !field.value || firstStepForm.formState.errors.email;
												return (
													<FormItem>
														<FormLabel className="text-[20px] font-normal">
															Correo institucional {showAsterisk && <span className="text-red-500">*</span>}
														</FormLabel>
														<FormControl>
															<Input placeholder="" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												);
											}}
										/>

										{/* Primer Apellido */}
										<FormField
											control={firstStepForm.control}
											name="firstName"
											render={({ field }) => {
												const showAsterisk = !field.value || firstStepForm.formState.errors.firstName;
												return (
													<FormItem>
														<FormLabel className="text-[20px] font-normal">
															Primer Apellido {showAsterisk && <span className="text-red-500">*</span>}
														</FormLabel>
														<FormControl>
															<Input placeholder="" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												);
											}}
										/>

										{/* Segundo Apellido */}
										<FormField
											control={firstStepForm.control}
											name="lastName"
											render={({ field }) => {
												const showAsterisk = !field.value || firstStepForm.formState.errors.lastName;
												return (
													<FormItem>
														<FormLabel className="text-[20px] font-normal">
															Segundo Apellido {showAsterisk && <span className="text-red-500">*</span>}
														</FormLabel>
														<FormControl>
															<Input placeholder="" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												);
											}}
										/>

										{/* Nombre */}
										<FormField
											control={firstStepForm.control}
											name="name"
											render={({ field }) => {
												const showAsterisk = !field.value || firstStepForm.formState.errors.name;
												return (
													<FormItem>
														<FormLabel className="text-[20px] font-normal">
															Nombre {showAsterisk && <span className="text-red-500">*</span>}
														</FormLabel>
														<FormControl>
															<Input placeholder="" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												);
											}}
										/>

										{/* Tipo de ID */}
										<FormField
											control={firstStepForm.control}
											name="idType"
											render={({ field }) => {
												const showAsterisk = !field.value || firstStepForm.formState.errors.idType;
												return (
													<FormItem>
														<FormLabel className="text-[20px] font-normal">
															Tipo de ID {showAsterisk && <span className="text-red-500">*</span>}
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
												);
											}}
										/>

										{/* Contraseña */}
										<FormField
											control={firstStepForm.control}
											name="password"
											render={({ field }) => {
												const showAsterisk = !field.value || firstStepForm.formState.errors.password;
												return (
													<FormItem>
														<FormLabel className="text-[20px] font-normal">
															Contraseña {showAsterisk && <span className="text-red-500">*</span>}
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
															<Info className="h-4 w-4 text-gray-500 mt-0.5" />
															<p className="text-xs text-gray-500">
																Mínimo 8 caracteres, con al menos 1 letra mayúscula, 1 letra minúscula, y 1 número.
															</p>
														</div>
														<FormMessage />
													</FormItem>
												);
											}}
										/>

										{/* Número de ID */}
										<FormField
											control={firstStepForm.control}
											name="idNumber"
											render={({ field }) => {
												const showAsterisk = !field.value || firstStepForm.formState.errors.idNumber;
												return (
													<FormItem>
														<FormLabel className="text-[20px] font-normal">
															Número de ID {showAsterisk && <span className="text-red-500">*</span>}
														</FormLabel>
														<FormControl>
															<Input placeholder="" {...field} />
														</FormControl>
														<div className="flex items-start gap-1.5 mt-2">
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
														<FormMessage />
													</FormItem>
												);
											}}
										/>
									</div>
									<div className="flex flex-col items-center space-y-2 mt-6">
										<p className="text-xs text-red-500">* Información obligatoria</p>

										<p className="text-sm">
											Al continuar, usted acepta los
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<button type="button" className="font-semibold underline text-[#7875F8] hover:text-[#5e5bcf] ml-1 mr-1">Términos y Condiciones </button>
												</AlertDialogTrigger>
												<AlertDialogContent className="min-w-[900px] p-8">
													<AlertDialogHeader>
														<AlertDialogTitle className="text-2xl font-bold text-center mb-2">Términos y Condiciones</AlertDialogTitle>
													</AlertDialogHeader>
													<AlertDialogDescription asChild>
														<div className="max-h-[70vh] overflow-y-auto text-gray-700 text-[15px] font-normal leading-relaxed">
															<p className="mb-2 font-semibold">HitchHop - Comparte tu viaje, conecta tu camino</p>
															<p className="mb-2">Última actualización: 10/4/2025</p>
															<p className="mb-4">Este documento establece los Términos y Condiciones de Uso (en adelante, “Términos”) aplicables al uso de la plataforma móvil y web HitchHop, un sistema exclusivo para compartir transporte entre miembros de una misma institución. El uso de esta aplicación implica la aceptación plena de estos Términos por parte de todos sus usuarios, ya sea como conductor, pasajero o administrador.</p>
															<p className="mb-2 font-semibold">1. Descripción general del servicio</p>
															<p className="mb-4">HitchHop es una aplicación móvil disponible exclusivamente para dispositivos Android que permite a miembros de una misma institución (educativa o laboral) organizar viajes compartidos. El objetivo principal es facilitar la movilidad interna mediante la publicación y solicitud de rutas de transporte, promoviendo la sostenibilidad, la economía y la colaboración.</p>
															<p className="mb-4">Además, HitchHop cuenta con una plataforma web dirigida a administradores autorizados de la institución para realizar consultas, visualizar estadísticas y monitorear el uso general del sistema.</p>
															<p className="mb-2 font-semibold">2. Registro y acceso a la plataforma</p>
															<p className="mb-1">2.1 El registro de usuarios está limitado exclusivamente a miembros verificados de la institución, mediante el uso de credenciales institucionales válidas.</p>
															<p className="mb-1">2.2 El acceso y uso de la app requiere aceptar expresamente estos Términos y Condiciones.</p>
															<p className="mb-4">2.3 El usuario es responsable de mantener la confidencialidad de sus credenciales y de cualquier actividad realizada desde su cuenta.</p>
															<p className="mb-2 font-semibold">3. Gestión de perfiles</p>
															<p className="mb-4">Al completar el registro, los usuarios deben proporcionar cierta información personal, como:</p>
															<p className="mb-1">3.1 Nombre completo</p>
															<p className="mb-1">3.2 Correo electrónico institucional</p>
															<p className="mb-1">3.3 Teléfono de contacto</p>
															<p className="mb-1">3.4 Rol (conductor o pasajero)</p>
															<p className="mb-1">3.5 Género y edad (opcional, con fines estadísticos)</p>
															<p className="mb-4">Esta información se utilizará exclusivamente para la correcta operación de la plataforma y no será compartida con terceros sin consentimiento.</p>
															<p className="mb-2 font-semibold">4. Publicación y solicitud de viajes</p>
															<p className="mb-2">Para conductores:</p>
															<p className="mb-1">4.1.1 Origen y destino del viaje</p>
															<p className="mb-1">4.1.2 Horario de salida y llegada estimado</p>
															<p className="mb-1">4.1.3 Capacidad máxima de pasajeros</p>
														</div>
													</AlertDialogDescription>
													<div className="flex justify-end mt-6">
														<AlertDialogCancel asChild>
															<Button variant="outline">Volver</Button>
														</AlertDialogCancel>
													</div>
												</AlertDialogContent>
											</AlertDialog>
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
					) : (
                        <>
                            <div className="flex flex-col items-center justify-center mb-6">
                                <div className="flex items-center mr-20">
                                    <img src={Logo} alt="Logo" className="w-[211px] h-[155px] -mt-3 -mr-12" />
                                    <span className="text-[60px] font-extrabold text-black font-montserrat leading-tight">HitchHop</span>
                                </div>
                                <h2 className="text-2xl font-bold text-center mt-4">Últimos pasos para crear su cuenta</h2>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-8">
                                <div className="flex flex-col items-center ml-16">
                                    <h3 className="text-[20px] font-semibold mb-4">Foto de perfil</h3>
                                    <div
                                        className="w-44 h-44 rounded-full overflow-hidden bg-[#ECECFF] mb-4 flex items-center justify-center shadow-[0_4px_4px_0_rgba(135,94,255,0.25)]"
                                    >
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
                                        className="w-[159px] h-[36px] mb-2 bg-[#FFAB00] hover:bg-[#e59400] text-black" 
                                        onClick={() => document.getElementById('profile-upload')?.click()}
                                    >
                                        Editar foto de perfil
                                    </Button>
                                    <input
                                        id="profile-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                                
                                <div>									
                                    <Form {...secondStepForm}>
                                        <form className="space-y-2">
                                            {/* Nombre de usuario */}
                                            <FormField
                                                control={secondStepForm.control}
                                                name="username"
                                                render={({ field }) => {
                                                    const showAsterisk = !field.value || secondStepForm.formState.errors.username;
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="text-lg font-medium">
                                                                Nombre de usuario {showAsterisk && <span className="text-red-500">*</span>}
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />

                                            {/* Fecha de nacimiento */}
                                            <FormField
                                                control={secondStepForm.control}
                                                name="birthDate"
                                                render={({ field }) => {
                                                    const showAsterisk = !field.value || secondStepForm.formState.errors.birthDate;
                                                    return (
                                                        <FormItem className="flex flex-col">
                                                            <FormLabel className="text-lg font-medium">
                                                                Fecha de nacimiento {showAsterisk && <span className="text-red-500">*</span>}
                                                            </FormLabel>															<Popover>
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
                                                                        disabled={(date) =>
                                                                            date > new Date() || date < new Date("1900-01-01")
                                                                        }
                                                                        initialFocus
                                                                        locale={es}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />

                                            {/* Teléfono */}
                                            <FormField
                                                control={secondStepForm.control}
                                                name="phone"
                                                render={({ field }) => {
                                                    const showAsterisk = !field.value || secondStepForm.formState.errors.phone;
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="text-lg font-medium">
                                                                Teléfono {showAsterisk && <span className="text-red-500">*</span>}
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />

                                            <div className="flex gap-2">
                                                {/* Género */}
                                                <div className="flex-1">
                                                    <FormField
                                                        control={secondStepForm.control}
                                                        name="gender"
                                                        render={({ field }) => {
                                                            const showAsterisk = !field.value || secondStepForm.formState.errors.gender;
                                                            return (
                                                                <FormItem>
                                                                    <FormLabel className="text-lg font-medium">
                                                                        Género {showAsterisk && <span className="text-red-500">*</span>}
                                                                    </FormLabel>
                                                                    <Select
                                                                        onValueChange={field.onChange}
                                                                        defaultValue={field.value}
                                                                    >
                                                                        <FormControl>
                                                                            <SelectTrigger className="w-[200px]">
                                                                                <SelectValue placeholder="Seleccionar" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            <SelectItem value="male">Masculino</SelectItem>
                                                                            <SelectItem value="female">Femenino</SelectItem>
                                                                            <SelectItem value="other">Otro</SelectItem>
                                                                            <SelectItem value="prefer_not_to_say">Prefiero no decir</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                {/* Tipo de usuario */}
                                                <div className="flex-1">
                                                    <FormField
                                                        control={secondStepForm.control}
                                                        name="userType"
                                                        render={({ field }) => {
                                                            const showAsterisk = !field.value || secondStepForm.formState.errors.userType;
                                                            return (
                                                                <FormItem>
                                                                    <FormLabel className="text-lg font-medium">
                                                                        Tipo de usuario {showAsterisk && <span className="text-red-500">*</span>}
                                                                    </FormLabel>
                                                                    <Select
                                                                        onValueChange={field.onChange}
                                                                        defaultValue={field.value}
                                                                    >
                                                                        <FormControl>
                                                                            <SelectTrigger className="w-[250px]">
                                                                                <SelectValue placeholder="Seleccionar" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            <SelectItem value="passenger">Pasajero</SelectItem>
                                                                            <SelectItem value="driver">Conductor</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <div className="flex items-center gap-1">
                                                                        <Info className="h-5 w-5 text-gray-500 -mt-4" />
                                                                        <p className="text-sm text-gray-500">Una vez creada la cuenta puede ser modificado</p>
                                                                    </div>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <p className="text-lg text-red-500 mt-4">* Información obligatoria</p>
                                        </form>
                                    </Form>
                                </div>
                            </div>                            
                            <div className="flex justify-center items-center gap-5 mt-6">
                                <Button 
                                    type="button" 
                                    onClick={handleBack}
                                    className="w-[110px] h-[48px] bg-[#7875F8] hover:bg-[#5e5bcf] text-white"
                                >
                                    Volver
                                </Button>
                                <Button 
                                    type="button"
                                    onClick={() => secondStepForm.handleSubmit(onSubmitSecondStep)()}
                                    className="bg-[#7875F8] hover:bg-[#5e5bcf] w-[151px] h-[48px]"
                                >
                                    Crear perfil
                                </Button>
                            </div>
                        </>
					)}
				</Card>
			</div>
		</div>
	);
}
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import ImageBackground from '@/assets/1.1-Image-1-bg.png';
import RegisterHeader from '@/pages/1.1-registro-de-usuario/components/RegisterHeader';
import RegisterForm1 from '@/pages/1.1-registro-de-usuario/components/RegisterForm1';
import RegisterForm2 from '@/pages/1.1-registro-de-usuario/components/RegisterForm2';
import { useAuth } from '@/Context/auth-context';
import { useNavigate } from 'react-router-dom';
import { getAllParametersRequest } from '@/interconnection/paremeter';
import { getAllInstitutionsRequest } from '@/interconnection/institution';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
// Tipos locales para el registro
type FirstStepData = {
  institution: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  idType: string;
  idNumber: string;
  password: string;
};

type SecondStepData = {
  username: string;
  rol: string;
  birthDate: Date;
  phone: string;
  gender: string;
};

export default function Register() {
	const [currentStep, setCurrentStep] = useState(1);
	const [firstStepData, setFirstStepData] = useState<FirstStepData | null>(null);
	const [secondStepData, setSecondStepData] = useState<SecondStepData | null>(null);
	const [profileImage, setProfileImage] = useState<string | null>(null);	const [isSubmitting, setIsSubmitting] = useState(false);
	const [parameters, setParameters] = useState<any[]>([]);
	const [institutions, setInstitutions] = useState<any[]>([]);
	const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const handleClose = () => setShowAlertDialog(false);
	
	const { signUp } = useAuth();
	const navigate = useNavigate();

	// Cargar parámetros e instituciones al montar el componente
	useEffect(() => {
		const loadData = async () => {
			try {
				// Cargar parámetros y instituciones en paralelo
				const [parametersData, institutionsData] = await Promise.all([
					getAllParametersRequest(),
					getAllInstitutionsRequest()
				]);
				
				if (parametersData) {
					setParameters(parametersData);
				}
				
				if (institutionsData) {
					setInstitutions(institutionsData);
				}
			} catch (error) {
				console.error('Error cargando datos:', error);
			}
		};
		
		loadData();	}, []);

	// Manejar el envío de la primera etapa
	const handleFirstStepNext = (data: FirstStepData) => {
		console.log("Primera etapa:", data);
		setFirstStepData(data);
		setCurrentStep(2);
	};	// Manejar el envío de la segunda etapa
	const handleSecondStepSubmit = async (data: SecondStepData) => {
		if (!firstStepData) return;
		
		setIsSubmitting(true);
		
		try {
			// Preparar datos para el backend según el tipo User
			const registrationData = {
				name: firstStepData.name,
				firstSurname: firstStepData.firstName,
				secondSurname: firstStepData.lastName,
				username: data.username,
				email: firstStepData.email,
				password: firstStepData.password,
				institutionId: firstStepData.institution.toString(),
				identificationTypeId: firstStepData.idType,
				identificationNumber: parseInt(firstStepData.idNumber) || 0,
				birthDate: data.birthDate.toISOString(),
				genre: data.gender,
				photoKey: profileImage || "",
				photoUrl: "",
				phone: parseInt(data.phone) || 0,
				type: "Usuario" as const,
				role: data.rol === "Conductor" ? "Conductor" as const : "Pasajero" as const,
				vehicles: [],
				notifications: []
			};
					// Llamar a la API de registro
			const result = await signUp(registrationData);
			
			// Verificar si hay un usuario válido (éxito)
			if (result && typeof result === 'object' && result.email) {
				console.log("Registro exitoso:", result);
				// Redirigir a la página de éxito
				navigate('/registro-exitoso');
				setIsSubmitting(false);
			} else if (typeof result === 'string') {
				// Si user es un string, es un mensaje de error
				console.log("Error del backend:", result);
				setSuccessMessage(result);
				setShowAlertDialog(true);
				setIsSubmitting(false);
			} else if (result === null) {
				setSuccessMessage(result);
				setShowAlertDialog(true);
				setIsSubmitting(false);
			} else {
				// Fallback para casos inesperados
				setSuccessMessage('Error inesperado durante el registro. Por favor, inténtelo de nuevo.');
				setShowAlertDialog(true);
				setIsSubmitting(false);
			}

		} catch (error: any) {
			console.error('Error en el registro:', error);
			setSuccessMessage('Error al registrar usuario. Por favor, verifique su conexión a internet e inténtelo de nuevo.');
			setShowAlertDialog(true);
			setIsSubmitting(false);
		}
	};
	// Función para manejar la carga de imagen de perfil
	const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			try {
				// Comprimir la imagen antes de guardarla
				const compressedImage = await compressImage(file);
				setProfileImage(compressedImage);
			} catch (error) {
				console.error('Error comprimiendo imagen:', error);
				// Fallback: usar FileReader sin compresión pero solo para archivos pequeños
				if (file.size < 100000) { // Solo si es menor a 100KB
					const reader = new FileReader();
					reader.onload = (e) => {
						if (e.target?.result) {
							setProfileImage(e.target.result as string);
						}
					};
					reader.readAsDataURL(file);
				} else {
					alert('La imagen es demasiado grande. Por favor, seleccione una imagen más pequeña.');
				}
			}
		}
	};

	// Función para comprimir imagen
	const compressImage = (file: File, maxWidth: number = 200, quality: number = 0.7): Promise<string> => {
		return new Promise((resolve) => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			const img = new Image();
			
			img.onload = () => {
				// Calcular nuevas dimensiones manteniendo la proporción
				const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
				canvas.width = img.width * ratio;
				canvas.height = img.height * ratio;
				
				// Dibujar imagen redimensionada
				ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
				
				// Convertir a base64 con compresión
				const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
				resolve(compressedDataUrl);
			};
			
			img.src = URL.createObjectURL(file);
		});
	};
	// Función para volver a la primera etapa
	const handleBack = (data?: SecondStepData) => {
		// Guardar los datos del segundo formulario si se proporcionan
		if (data) {
			setSecondStepData(data);
		}
		setCurrentStep(1);
	};

	return (
		<div className="min-h-screen w-full flex">					
		<AlertDialog open={showAlertDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className="text-[18px] text-black font-semibold">
							Registro
						</AlertDialogTitle>
						<AlertDialogDescription className="text-[16px] text-gray-700">
							{successMessage}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<button 
							onClick={handleClose} 
							className="px-4 py-2 rounded-lg bg-[#7875F8] text-white hover:bg-[#6b68f5] transition-colors"
						>
							Aceptar
						</button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Imagen de fondo izquierda - Oculta en móvil */}
			<div className="hidden lg:block absolute top-0 left-0 w-1/2 h-full overflow-hidden bg-amber-300">
				<img
					src={ImageBackground}
					alt="Background Left"
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Imagen de fondo derecha - Oculta en móvil */}
			<div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full overflow-hidden bg-amber-700">
				<img
					src={ImageBackground}
					alt="Background Right"
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Contenido del formulario */}
			<div className="relative z-10 h-full w-full flex items-center justify-center p-4">
				<Card className="w-full max-w-4xl p-4 md:p-10 bg-white/90 backdrop-blur-3xl min-h-[600px] max-h-[95vh] overflow-y-auto">
					<div className="flex items-center justify-center mr-13">
						<RegisterHeader/>
					</div>					
					{currentStep === 1 ? (
						<RegisterForm1 
							onNext={handleFirstStepNext}
							initialData={firstStepData || undefined}
							parameters={parameters}
							institutions={institutions}
						/>					) : (
						<RegisterForm2 
							onSubmit={handleSecondStepSubmit}
							onBack={handleBack}
							profileImage={profileImage}
							onImageUpload={handleImageUpload}
							initialData={secondStepData || undefined}
							isSubmitting={isSubmitting}
							parameters={parameters}
						/>
					)}
				</Card>
			</div>
		</div>
	);
}

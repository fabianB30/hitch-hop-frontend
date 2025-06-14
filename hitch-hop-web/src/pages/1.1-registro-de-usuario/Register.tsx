import { useState } from 'react';
import { Card } from '@/components/ui/card';
import ImageBackground from '@/assets/1.1-Image-1-bg.png';
import RegisterHeader from '@/pages/1.1-registro-de-usuario/components/RegisterHeader';
import RegisterForm1 from '@/pages/1.1-registro-de-usuario/components/RegisterForm1';
import RegisterForm2 from '@/pages/1.1-registro-de-usuario/components/RegisterForm2';

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
  userType: string;
  birthDate: Date;
  phone: string;
  gender: string;
};

type RegistrationData = FirstStepData & SecondStepData & { profileImage?: string };

export default function Register() {
	const [currentStep, setCurrentStep] = useState(1);
	const [firstStepData, setFirstStepData] = useState<FirstStepData | null>(null);
	const [profileImage, setProfileImage] = useState<string | null>(null);

	// Manejar el envío de la primera etapa
	const handleFirstStepNext = (data: FirstStepData) => {
		console.log("Primera etapa:", data);
		setFirstStepData(data);
		setCurrentStep(2);
	};

	// Manejar el envío de la segunda etapa
	const handleSecondStepSubmit = (data: SecondStepData) => {
		console.log("Segunda etapa:", data);
		const completeData: RegistrationData = { 
			...firstStepData!, 
			...data, 
			profileImage: profileImage || undefined
		};
		console.log("Datos completos:", completeData);
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
		<div className="min-h-screen w-full flex">
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
						/>
					) : (
						<RegisterForm2 
							onSubmit={handleSecondStepSubmit}
							onBack={handleBack}
							profileImage={profileImage}
							onImageUpload={handleImageUpload}
						/>
					)}
				</Card>
			</div>
		</div>
	);
}

import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from "expo-router";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialogBackdrop } from "@/components/ui/alert-dialog";
import { Text } from '@/components/ui/text';
import { TouchableOpacity } from 'react-native';
import { useFonts, Exo_400Regular, Exo_500Medium, Exo_600SemiBold, Exo_700Bold } from '@expo-google-fonts/exo';
import TyCScreen from './components/TyC';
import RegisterStep1 from './components/RegisterStep1';
import RegisterStep2 from './components/RegisterStep2';
import { useAuth } from '@/app/(tabs)/Context/auth-context';



export default function RegisterScreen() {
    const router = useRouter();
    const { signUp } = useAuth(); 
    const [fontsLoaded] = useFonts({
        Exo_400Regular,
        Exo_700Bold,
        Exo_500Medium,
        Exo_600SemiBold,
    });    
    const [currentStep, setCurrentStep] = useState(1);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [firstFormData, setFirstFormData] = useState({
        email: '',
        password: '',
        institution: '',
        institutionId: '',
        name: '',
        lastName: '',
        secondLastName: '',
    });
    const [secondFormData, setSecondFormData] = useState({
        avatar: '',
        username: '',
        phone: '',
        identificationType: '',
        identificationNumber: '',
        userType: '',
        genre: '',
        birthDate: '',
    });
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleClose = () => setShowAlertDialog(false);

    const handleStep1Next = (data: any) => {
        setFirstFormData(data);
        setCurrentStep(2); // Ir a TyC (paso 2)
    };

    // Cuando acepta términos y condiciones
    const handleTermsAccept = () => {
        setTermsAccepted(true);
        setCurrentStep(3); // Ir a RegisterStep2 (paso 3)
    };

    // Cuando rechaza términos y condiciones
    const handleTermsReject = () => {
        setCurrentStep(1); // Volver a RegisterStep1
    };

    // Cuando quiere volver desde RegisterStep2 a TyC
    const handleStep2Back = (data: any) => {
        setSecondFormData(data); // Guardar datos del paso 2
        setCurrentStep(2); // Volver a TyC
    };

   // Cuando termina RegisterStep2
    const handleStep2Next = async (data: any) => {
        setSecondFormData(data);
        
        // Combinar todos los datos y proceder con el registro
        const completeData = {
            ...firstFormData,
            ...data
        };
        
        // Registrar directamente (ya aceptó términos en paso 2)
        await handleFinishRegistration(completeData);
    };
        
    const handleFinishRegistration = async (completeData: any) => {
        // Verificar que los términos han sido aceptados
        if (!termsAccepted) {
            setSuccessMessage('Debe aceptar los términos y condiciones para continuar.');
            setShowAlertDialog(true);
            return;
        }
        
        try {
            // Preparar datos para el backend según el tipo User
            const registrationData = {
                name: completeData.name,
                fisrtSurname: completeData.lastName,        // Usar lastName del step 1
                secondSurname: completeData.secondLastName, // Usar secondLastName del step 1
                username: completeData.username,
                email: completeData.email,
                password: completeData.password,
                institutionId: completeData.institutionId,
                identificationTypeId: completeData.identificationType,
                identificationNumber: parseInt(completeData.identificationNumber) || 0,
                birthDate: completeData.birthDate,
                genre: completeData.genre,
                photoKey: completeData.avatar,
                photoUrl: "",
                phone: parseInt(completeData.phone) || 0,
                type: "Usuario" as const,
                role: completeData.rol === "Conductor" ? "Conductor" as const : "Pasajero" as const, // Usar 'rol' no 'userType'
                vehicles: [],
                notifications: []
            };
            
            // Llamar a la API de registro
            const result = await signUp(registrationData);
            // Verificar si el resultado es un objeto con propiedades de usuario (éxito)
            if (result && typeof result === 'object' && result.email) {
                // regidirir a ventana de bienvenida correspondiente
                if(result.role === 'Conductor') {
                    router.push('/Bienvenida/C_bienvenida');
                } else if(result.role === 'Pasajero') {
                    router.push('/Bienvenida/P_bienvenida');
                }
                
            } else if (result && typeof result === 'string') {
                // Si el resultado es un string, es un mensaje de error
                setSuccessMessage(result);
                setShowAlertDialog(true);
            } else if (result === null) {
                // Si es null, mostrar mensaje genérico
                setSuccessMessage('Error al registrar usuario. Por favor, inténtelo de nuevo.');
                setShowAlertDialog(true);
            } else {
                // Fallback para casos inesperados
                setSuccessMessage('Error inesperado durante el registro.');
                setShowAlertDialog(true);
            }

        } catch (error) {
            console.error('Registration error:', error);
            setSuccessMessage('Error al registrar usuario. Por favor, verifique su conexión a internet e inténtelo de nuevo.');
            setShowAlertDialog(true);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
                <AlertDialogBackdrop className="bg-black/80" />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Text className="text-[18px] text-black" style={{ fontFamily: 'Exo_600SemiBold' }}>
                            Registro
                        </Text>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mb-5 top-5">
                        <Text className="text-[16px] text-gray-700" style={{ fontFamily: 'Exo_400Regular' }}>
                            {successMessage}
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <TouchableOpacity onPress={handleClose} className="px-4 py-2 rounded-lg bg-[#7875F8]">
                            <Text className="text-white" style={{ fontFamily: 'Exo_400Regular' }}>Aceptar</Text>
                        </TouchableOpacity>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {currentStep === 1 && (
                <RegisterStep1 
                    initialData={firstFormData}
                    onNext={handleStep1Next} 
                />
            )}           
            
            {currentStep === 2 && (
                <TyCScreen 
                    onAccept={handleTermsAccept}
                    onReject={handleTermsReject}
                />
            )}

            {currentStep === 3 && (
                <RegisterStep2 
                    firstFormData={firstFormData}
                    secondFormData={secondFormData}
                    onBack={handleStep2Back}
                    onFinish={handleStep2Next}
                />
            )}
        </View>
    );
}
import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from "expo-router";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialogBackdrop } from "@/components/ui/alert-dialog";
import { Text } from '@/components/ui/text';
import { TouchableOpacity } from 'react-native';
import { useFonts, Exo_400Regular, Exo_500Medium, Exo_600SemiBold, Exo_700Bold } from '@expo-google-fonts/exo';
import RegisterStep1 from './components/RegisterStep1';
import RegisterStep2 from './components/RegisterStep2';
import { Avatar } from '@/components/ui/avatar';


export default function RegisterScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Exo_400Regular,
        Exo_700Bold,
        Exo_500Medium,
        Exo_600SemiBold,
    });    const [currentStep, setCurrentStep] = useState(1);
    const [firstFormData, setFirstFormData] = useState({
        email: '',
        password: '',
        institution: '',
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
        setCurrentStep(2);
    };    const handleStep2Back = (data: any) => {
        // Guardar los datos del segundo formulario antes de volver
        setSecondFormData(data);
        setCurrentStep(1);
    };

    const handleFinishRegistration = async (completeData: any) => {
        try {
            // API de registro
            
            console.log('Datos completos de registro:', completeData);
            
            // Simular éxito
            setSuccessMessage('¡Registro exitoso! Bienvenido a HitchHop.');
            setShowAlertDialog(true);
            
            // Redirigir al login después de un tiempo
            setTimeout(() => {
                router.push('/InicioSesion/login');
            }, 2000);

        } catch (error) {
            console.error('Registration error:', error);
            setSuccessMessage('Error al registrar usuario. Por favor, inténtelo de nuevo.');
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
                <RegisterStep1 onNext={handleStep1Next} />
            )}            
            {currentStep === 2 && (
                <RegisterStep2 
                    firstFormData={firstFormData}
                    secondFormData={secondFormData}
                    onBack={handleStep2Back}
                    onFinish={handleFinishRegistration}
                />
            )}
        </View>
    );
}
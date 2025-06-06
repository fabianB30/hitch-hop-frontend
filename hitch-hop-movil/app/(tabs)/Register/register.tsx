import React, { useState } from 'react';
import { View, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { ChevronDown } from "lucide-react-native"
import { FormControl } from '@/components/ui/form-control';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectIcon,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select"
import {AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialogBackdrop, } from "@/components/ui/alert-dialog"
import { useFonts, Exo_400Regular, Exo_500Medium, Exo_600SemiBold, Exo_700Bold } from '@expo-google-fonts/exo';


export default function RegisterScreen() {
    const [fontsLoaded] = useFonts({
        Exo_400Regular,
        Exo_700Bold,
        Exo_500Medium,
        Exo_600SemiBold,
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [institution, setInstitution] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [secondLastName, setSecondLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showAlertDialog, setShowAlertDialog] = React.useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const handleClose = () => setShowAlertDialog(false)


    const handleRegister = async () => {
        // Validación campos vacíos
        if (!email || !password || !institution || !name || !lastName || !secondLastName) {
            setErrorMessage('Asegúrese de que todos los campos estén llenos y tenga la información adecuada.');
            setShowAlertDialog(true);
            return;
        }
        // Validación correo Institucional del TEC
        const emailPattern = /^[a-zA-Z0-9._%+-]+@(estudiantec\.cr|itcr\.ac\.cr)$/;
        if (!emailPattern.test(email)) {
            setErrorMessage('El correo ingresado no está asociado a la intitución seleccionada. Si lo considera un error contacte a su intitución.');
            setShowAlertDialog(true);
            return;
        }
        // Validación contraseña
        if (password.length < 6) {
            setErrorMessage('Asegúrese de que su contraseña cumpla con los requerimientos mínimos.');
            setShowAlertDialog(true);
            return;
        }

        // Guardar datos de la cuenta y continuar con el registro
        setLoading(true);
        try {
            // Guardar los datos de registro en el estado del primer formulario
            console.log('Datos de registro primer formulario:', {
                email,
                password,
                institution,
                name,
                lastName,
                secondLastName,
            });

            // avanzar al siguiente formulario de registro
            
            
        
        } catch (error) {
            console.error('Register error:', error);
            setErrorMessage('Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
            setShowAlertDialog(true);
        } finally {
            setLoading(false);
        }
    };    
  
    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        >
        <View className="flex-1 items-center">
            <StatusBar style="light" />
            <ImageBackground
                source={require('@/assets/images/fondo-HitchHop.png')}
                className="absolute inset-0 w-[360px] h-[588px] left-[0px] top-[-53px] "
                resizeMode="contain"
            />
            {/* Logo*/}
            <View className="absolute justify-center items-center h-[80px] w-[270px] top-[40px]">
                <ImageBackground
                    source={require('@/assets/images/logo-HitchHop.png')}
                    className="w-[270px] h-[80px]"
                    resizeMode="contain"
                />
            </View>

            {/* Login Card */}
            <View className="top-[130px] w-[360px] h-[722px] items-center bg-white rounded-[30px] ">
                <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
                    <AlertDialogBackdrop className="bg-black/80" />
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <Text className="text-[18px] text-black" style={{ fontFamily: 'Exo_600SemiBold' }}>Datos Inválidos</Text>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mb-5 top-5">
                        <Text className="text-[16px] text-gray-700" style={{ fontFamily: 'Exo_400Regular' }}>
                        {errorMessage}
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <TouchableOpacity onPress={handleClose} className="px-4 py-2 rounded-lg bg-[#7875F8]">
                        <Text className="text-white" style={{ fontFamily: 'Exo_400Regular' }}>Aceptar</Text>
                        </TouchableOpacity>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Text className="text-[24px] text-gray-800 text-center mb-1 top-[17px]" style={{ fontFamily: 'Exo_700Bold' }}>
                    Crear cuenta
                </Text>
                <FormControl className='top-[35px]'>
                    {/* Intitucion Select */}
                    <View className="mb-3">
                        <View className="flex-row mb-2">
                            <Text className="text-[19px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                            Institución
                            </Text>
                            {institution === '' && (
                                <Text className="text-[20px] text-red-500 ml-1" style={{ fontFamily: 'Exo_700Bold' }}>
                                    *
                                </Text>
                            )}
                        </View>
                        <Select onValueChange={setInstitution}>
                            <SelectTrigger variant="outline" size="md" className="border border-gray-300 rounded-lg bg-gray-50 h-[44px] w-[264px]">
                                <SelectInput placeholder="Select option" className="flex-1" />
                                <SelectIcon className="ml-auto mr-3" as={ChevronDown} />
                            </SelectTrigger>
                            <SelectPortal>
                                <SelectBackdrop />
                                <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg">
                                    <SelectDragIndicatorWrapper>
                                        <SelectDragIndicator />
                                    </SelectDragIndicatorWrapper>
                                    <SelectItem label="Instituto Tecnológico De Costa Rica" value="ITCR" />
                                    <SelectItem label="Universidad De Costa Rica" value="UCR" />
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                    </View>
                    {/* Correo Institucional Field */}
                    <View className="mb-3">
                        <View className="flex-row mb-2">
                            <Text className="text-[19px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                            Correo Institucional
                            </Text>
                            {email === '' && (
                                <Text className="text-[20px] text-red-500 ml-1" style={{ fontFamily: 'Exo_700Bold' }}>
                                    *
                                </Text>
                            )}
                        </View>
                        <Input className="border border-gray-300 rounded-lg bg-gray-50 h-[44px] w-[264px]">
                            <InputField
                            value={email}
                            onChangeText={setEmail}
                            placeholder=""
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="text-base text-gray-800 px-3 py-3"
                            />
                        </Input>
                    </View>
                    {/* Nombre Field */}
                    <View className="mb-3">
                        <View className="flex-row mb-2">
                            <Text className="text-[19px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                            Nombre
                            </Text>
                            {name === '' && (
                                <Text className="text-[20px] text-red-500 ml-1" style={{ fontFamily: 'Exo_700Bold' }}>
                                    *
                                </Text>
                            )}
                        </View>
                        <Input className="border border-gray-300 rounded-lg bg-gray-50 h-[44px] w-[264px]">
                            <InputField
                            value={name}
                            onChangeText={setName}
                            placeholder=""
                            className="text-base text-gray-800 px-3 py-3"
                            />
                        </Input>
                    </View>
                    {/* Apellidos Field */}
                    <View className="flex-row mb-3">
                        <View className="flex-col">
                            <View className="flex-row mb-2">
                                <Text className="text-[19px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                                1° Apellido
                                </Text>
                                {(lastName === '') && (
                                    <Text className="text-[20px] text-red-500 ml-1" style={{ fontFamily: 'Exo_700Bold' }}>
                                        *
                                    </Text>
                                )}
                            </View>
                            <Input className="border border-gray-300 rounded-lg bg-gray-50 h-[44px] w-[128px]">
                                <InputField
                                value={lastName}
                                onChangeText={setLastName}
                                className="text-base text-gray-800 px-3 py-3"
                                />
                            </Input>
                        </View>
                        <View className="flex-col ml-2">
                            <View className="flex-row mb-2">
                                <Text className="text-[19px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                                2° Apellido
                                </Text>
                                {(secondLastName === '') && (
                                    <Text className="text-[20px] text-red-500 ml-1" style={{ fontFamily: 'Exo_700Bold' }}>
                                        *
                                    </Text>
                                )}
                            </View>
                            <Input className="border border-gray-300 rounded-lg bg-gray-50 h-[44px] w-[128px]">
                                <InputField
                                value={secondLastName}
                                onChangeText={setSecondLastName}
                                className="text-base text-gray-800 px-3 py-3"
                                />
                            </Input>
                        </View> 
                    </View>

                    {/* Contraseña Field */}
                    <View className="mb-1">
                        <View className="flex-row mb-2">
                            <Text className="text-[19px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                            Contraseña
                            </Text>
                            {password === '' && (
                                <Text className="text-[20px] text-red-500 ml-1" style={{ fontFamily: 'Exo_700Bold' }}>
                                    *
                                </Text>
                            )}
                        </View>
                        <Input className="border border-gray-300 rounded-lg bg-gray-50  h-[44px] w-[264px]">
                            <InputField
                            value={password}
                            onChangeText={setPassword}
                            placeholder=""
                            secureTextEntry={!showPassword}
                            className="text-base text-gray-800 px-3 py-3"
                            />
                            <InputSlot className="pr-3">
                            <TouchableOpacity onPress={toggleShowPassword}>
                                <Ionicons 
                                name={showPassword ? "eye" : "eye-off"} 
                                size={20} 
                                color="#9CA3AF"
                                />
                            </TouchableOpacity>
                            </InputSlot>
                        </Input>
                        <Text className="text-[16px] text-gray-500 mt-1" style={{ fontFamily: 'Exo_400Regular' }}>
                            Debe tener al menos 6 caracteres
                        </Text>
                        <Text className="text-[16px] text-red-600 mt-1" style={{ fontFamily: 'Exo_400Regular' }}>
                            * Información obligatoria
                        </Text>
                    </View>
                    

                    {/* Buttons */}
                    <View className="flex-row justify-center items-center mb-6 top-[5px]  mr-7 ml-2">
                        <TouchableOpacity 
                            className="flex-1 py-3 rounded-lg items-center w-[70px] h-[40px]"
                            onPress={() => router.back()}
                        >
                            <Text className="text-[16px] text-[#7875F8]" style={{ fontFamily: 'Exo_500Medium' }}>
                            Volver
                            </Text>
                        </TouchableOpacity>
                            
                        <TouchableOpacity 
                            className={`flex-1 bg-[#7875F8] py-3 rounded-lg items-center w-[102px] h-[47px] ${
                            loading ? 'opacity-70' : ''
                            }`}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            <Text className="text-[16px] text-white" style={{ fontFamily: 'Exo_500Medium' }}>
                            {loading ? 'Cargando...' : 'Siguiente'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* Register link */}
                    <View className="flex-row ml-6 top-[10px]">
                        <Text className="text-[15px] text-black" style={{ fontFamily: 'Exo_500Medium' }}>
                            ¿Ya tienes cuenta?{' '}
                        </Text>
                        <Text 
                            className="text-[15px] text-[#7875F8]"
                            style={{ fontFamily: 'Exo_500Medium' }}
                            onPress={() => Alert.alert('Info', 'Función de registro próximamente')}
                        >
                            Inicia sesión
                        </Text>
                    </View>
                </FormControl>          
            </View>
        </View>
        </KeyboardAvoidingView>
    );
}
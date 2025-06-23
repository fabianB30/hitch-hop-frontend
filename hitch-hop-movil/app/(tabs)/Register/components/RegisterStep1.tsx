import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StatusBar } from 'expo-status-bar';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { FormControl } from '@/components/ui/form-control';
import { Select } from '@/components/ui/select';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialogBackdrop, } from "@/components/ui/alert-dialog"
import { useFonts, Exo_400Regular, Exo_500Medium, Exo_600SemiBold, Exo_700Bold } from '@expo-google-fonts/exo';
import { useRouter } from "expo-router";
import { getAllInstitutionsRequest } from '@/interconnection/institution';

interface RegisterStep1Props {
    initialData?: {
        email: string;
        password: string;
        institution: string;
        institutionId: string;
        name: string;
        lastName: string;
        secondLastName: string;
    };
    onNext: (data: {
        email: string;
        password: string;
        institution: string;
        institutionId: string;
        name: string;
        lastName: string;
        secondLastName: string;
    }) => void;
}

export default function RegisterStep1({ initialData, onNext }: RegisterStep1Props) {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Exo_400Regular,
        Exo_700Bold,
        Exo_500Medium,
        Exo_600SemiBold,
    });
    // Inicializar estados con datos previos si existen
    const [email, setEmail] = useState(initialData?.email || '');
    const [password, setPassword] = useState(initialData?.password || '');
    const [institution, setInstitution] = useState(initialData?.institution || '');
    const [institutionId, setInstitutionId] = useState(initialData?.institutionId || '');
    const [institutions, setInstitutions] = useState<{ _id: string; nombre: string }[]>([]);
    const [name, setName] = useState(initialData?.name || '');
    const [lastName, setLastName] = useState(initialData?.lastName || '');
    const [secondLastName, setSecondLastName] = useState(initialData?.secondLastName || '');

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleClose = () => setShowAlertDialog(false)

    useEffect(() => {
        async function loadSelects() {
            try {
                const result = await getAllInstitutionsRequest();

                if (result && result.length > 0) {
                    setInstitutions(result);
                } else {
                    setInstitutions([]);
                }

            } catch (error) {
                console.error("Error al obtener instituciones:", error);
                setInstitutions([]);
            }
        }
        loadSelects();
    }, []);

    // Efecto para sincronizar institutionId cuando se cargan las instituciones
    useEffect(() => {
        if (initialData?.institution && institutions.length > 0 && !institutionId) {
            const selectedInstitution = institutions.find(inst => inst.nombre === initialData.institution);
            if (selectedInstitution) {
                setInstitutionId(selectedInstitution._id);
            }
        }
    }, [institutions, initialData?.institution, institutionId]);

    // Función para manejar el cambio de institución
    const handleInstitutionChange = (selectedName: string) => {
        setInstitution(selectedName);

        // Encontrar el ID correspondiente al nombre seleccionado
        const selectedInstitution = institutions.find(inst => inst.nombre === selectedName);

        if (selectedInstitution) {
            setInstitutionId(selectedInstitution._id);
        } else {
            console.error('No se encontró la institución:', selectedName);
            setInstitutionId('');
        }
    };

    const handleRegister = async () => {
        // Validación campos vacíos
        if (!email || !password || !institution || !name || !lastName || !secondLastName) {
            setErrorMessage('Asegúrese de que todos los campos estén llenos y tenga la información adecuada.');
            setShowAlertDialog(true);
            return;
        }

        // Validación de caracteres especiales y números en nombre y apellidos
        const onlyLettersRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

        if (!onlyLettersRegex.test(name)) {
            setErrorMessage('El nombre no debe contener números ni caracteres especiales.');
            setShowAlertDialog(true);
            return;
        }
        if (!onlyLettersRegex.test(lastName)) {
            setErrorMessage('El primer apellido no debe contener números ni caracteres especiales.');
            setShowAlertDialog(true);
            return;
        }
        if (!onlyLettersRegex.test(secondLastName)) {
            setErrorMessage('El segundo apellido no debe contener números ni caracteres especiales.');
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

        // Pasar los datos al componente padre
        onNext({
            email,
            password,
            institution,
            institutionId,
            name,
            lastName,
            secondLastName,
        });
    };

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: '#fff' }}
            contentContainerStyle={{ flexGrow: 1, padding: 0 }}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            extraHeight={120}
            extraScrollHeight={120}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <View className="flex-1 items-center">
                <StatusBar style="light" />
                <ImageBackground
                    source={require('@/assets/images/fondo-HitchHop.png')}
                    className="absolute inset-0 w-full h-[588px] left-[0px] top-[-53px] "
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

                {/* Register Card */}
                <View style={{ marginTop: 130, width: '100%', backgroundColor: 'white', borderRadius: 30, paddingVertical: 20, paddingHorizontal: 25, alignItems: 'center', }}>
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
                            <Select
                                options={institutions.map(inst => inst.nombre)}
                                selectedValue={institution}
                                onValueChange={handleInstitutionChange}
                                placeholder="Selecciona una institución"

                            />
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
                            <Input className="border border-gray-300 rounded-lg bg-gray-50 h-[44px]">
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
                            <Input className="border border-gray-300 rounded-lg bg-gray-50 h-[44px]">
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
                                <Input className="border border-gray-300 rounded-lg bg-gray-50 h-[44px] w-[153px]">
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
                                <Input className="border border-gray-300 rounded-lg bg-gray-50 h-[44px] w-[153px]">
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
                            <Input className="border border-gray-300 rounded-lg bg-gray-50  h-[44px] ">
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
                        <View className="flex-row justify-center items-center mb-6 top-[10px]  mr-7 ml-2">
                            <TouchableOpacity
                                className="flex-1 py-3 rounded-lg items-center w-[70px] h-[60px]"
                                onPress={() => router.push("/VentanaInicial")}
                            >
                                <Text className="text-[16px] text-[#7875F8]" style={{ fontFamily: 'Exo_500Medium' }}>
                                    Volver
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className={`flex-1 bg-[#7875F8] py-3 rounded-lg items-center w-[102px] h-[50px] ${loading ? 'opacity-70' : ''
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
                                onPress={() => router.push("/InicioSesion/login")}
                            >
                                Inicia sesión
                            </Text>
                        </View>
                    </FormControl>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

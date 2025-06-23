import React, { useState, useEffect, use } from 'react';
import { View, TouchableOpacity, ImageBackground, Alert, ActionSheetIOS, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StatusBar } from 'expo-status-bar';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { FormControl } from '@/components/ui/form-control';
import { Select } from '@/components/ui/select';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialogBackdrop } from "@/components/ui/alert-dialog";
import { useFonts, Exo_400Regular, Exo_500Medium, Exo_600SemiBold, Exo_700Bold } from '@expo-google-fonts/exo';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Avatar } from '@/components/ui/avatar';
import { Camera } from 'lucide-react-native';

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { getAllParametersRequest } from '@/interconnection/paremeter';

interface RegisterStep2Props {
    firstFormData: {
        email: string;
        password: string;
        institution: string;
        institutionId: string;
        name: string;
        lastName: string;
        secondLastName: string;
    };
    secondFormData?: {
        avatar: string;
        username: string;
        phone: string;
        identificationType: string;
        identificationNumber: string;
        userType: string;
        genre: string;
        birthDate: string;
    };
    onBack: (secondFormData: any) => void;
    onFinish: (completeData: any) => void;
}

export default function RegisterStep2({ firstFormData, secondFormData, onBack, onFinish }: RegisterStep2Props) {
    const [fontsLoaded] = useFonts({
        Exo_400Regular,
        Exo_700Bold,
        Exo_500Medium,
        Exo_600SemiBold,
    });

    // Estados para el segundo formulario - inicializar con datos previos si existen
    const [base64Image, setBase64Image] = useState('');
    const [avatar, setAvatar] = useState(secondFormData?.avatar || '');
    const [username, setUsername] = useState(secondFormData?.username || '');
    const [phone, setPhone] = useState(secondFormData?.phone || '');
    const [identificationType, setIdentificationType] = useState(secondFormData?.identificationType || '');
    const [identificationNumber, setIdentificationNumber] = useState(secondFormData?.identificationNumber || '');
    const [rol, setRol] = useState(secondFormData?.userType || '');
    const [genre, setGenre] = useState(secondFormData?.genre || '');
    const [birthDate, setBirthDate] = useState(secondFormData?.birthDate ? new Date(secondFormData.birthDate) : new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [identificationTypes, setIdentificationTypes] = useState<string[]>([]);
    const [generos, setGeneros] = useState<string[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    const [loadingParameters, setLoadingParameters] = useState(true);

    // Estados para almacenar los IDs de los parámetros
    const [identificationTypesData, setIdentificationTypesData] = useState<any>(null);
    const [generosData, setGenerosData] = useState<any>(null);
    const [rolesData, setRolesData] = useState<any>(null);

    const handleClose = () => setShowAlertDialog(false);
    useEffect(() => {
        const loadParameters = async () => {
            try {
                console.log('Cargando parámetros desde la API...');
                const parameters = await getAllParametersRequest();
                console.log('Parámetros recibidos:', parameters);

                if (parameters) {
                    // Buscar y cargar tipos de identificación
                    const identificationParam = parameters.find(param =>
                        param.parameterName === 'Tipo de identificación'
                    );
                    if (identificationParam) {
                        console.log('Tipos de identificación encontrados:', identificationParam.parameterList);
                        setIdentificationTypes(identificationParam.parameterList);
                        setIdentificationTypesData(identificationParam);
                    } else {
                        console.log('No se encontraron tipos de identificación');
                    }

                    // Buscar y cargar géneros
                    const genderParam = parameters.find(param =>
                        param.parameterName === 'Géneros'
                    );
                    if (genderParam) {
                        console.log('Géneros encontrados:', genderParam.parameterList);
                        setGeneros(genderParam.parameterList);
                        setGenerosData(genderParam);
                    } else {
                        console.log('No se encontraron géneros');
                    }

                    // Buscar y cargar roles
                    const roleParam = parameters.find(param =>
                        param.parameterName === 'Rol'
                    );
                    if (roleParam) {
                        console.log('Roles encontrados:', roleParam.parameterList);
                        setRoles(roleParam.parameterList);
                        setRolesData(roleParam); // Guardar el objeto completo
                    } else {
                        console.log('No se encontraron roles');
                    }
                }
            } catch (error) {
                console.error('Error al cargar parámetros:', error);
            } finally {
                setLoadingParameters(false);
            }
        };

        loadParameters();
    }, []);

    // Función para comprimir imagen en React Native
    const compressImage = async (imageUri: string, maxWidth: number = 200, quality: number = 0.7): Promise<string> => {
        try {
            // Comprimir y redimensionar la imagen
            const manipulatedImage = await ImageManipulator.manipulateAsync(
                imageUri,
                [
                    { resize: { width: maxWidth } } // Mantiene la proporción automáticamente
                ],
                {
                    compress: quality,
                    format: ImageManipulator.SaveFormat.JPEG,
                    base64: true
                }
            );

            // Retornar la imagen en formato base64 con el prefijo correcto
            return `data:image/jpeg;base64,${manipulatedImage.base64}`;
        } catch (error) {
            console.error('Error al comprimir imagen:', error);
            throw error;
        }
    };

    // Función para manejar el cambio de tipo de identificación
    const handleIdentificationTypeChange = (selectedType: string) => {
        setIdentificationType(selectedType);
    };

    // Función para manejar el cambio de rol
    const handleRolChange = (selectedRol: string) => {
        setRol(selectedRol);
    };

    // Función para manejar el cambio de género
    const handleGenreChange = (selectedGenre: string) => {
        setGenre(selectedGenre);
    };

    if (!fontsLoaded || loadingParameters) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text>Cargando...</Text>
            </View>
        );
    }

    // Función para mostrar opciones de imagen
    const showImagePickerOptions = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancelar', 'Tomar Foto', 'Elegir de Galería'],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) {
                        openCamera();
                    } else if (buttonIndex === 2) {
                        openGallery();
                    }
                }
            );
        } else {
            Alert.alert(
                'Seleccionar Imagen',
                'Elige una opción',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Cámara', onPress: openCamera },
                    { text: 'Galería', onPress: openGallery },
                ],
                { cancelable: true }
            );
        }
    };

    // Función para abrir la cámara
    const openCamera = async () => {
        try {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

            if (permissionResult.granted === false) {
                setErrorMessage("Se requieren permisos de cámara para tomar fotos");
                setShowAlertDialog(true);
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.3,
            });

            if (!result.canceled) {
                await processImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error al abrir cámara:', error);
            setErrorMessage('No se pudo abrir la cámara. Por favor, inténtelo de nuevo.');
            setShowAlertDialog(true);
        }
    };

    // Función para abrir la galería
    const openGallery = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                setErrorMessage("Se requieren permisos para acceder a la galería");
                setShowAlertDialog(true);
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.3,
            });

            if (!result.canceled) {
                await processImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error al abrir galería:', error);
            setErrorMessage('No se pudo abrir la galería. Por favor, inténtelo de nuevo.');
            setShowAlertDialog(true);
        }
    };
    // Función para procesar la imagen y convertirla a base64 comprimida
    const processImage = async (imageUri: string) => {
        try {
            // Comprimir la imagen antes de convertirla a base64
            const compressedBase64 = await compressImage(imageUri, 200, 0.7);

            // Guardar base64 comprimido para enviar al backend
            setBase64Image(compressedBase64);
            setAvatar(compressedBase64);

        } catch (error) {
            console.error('Error al procesar imagen:', error);
            setErrorMessage('Error al procesar la imagen. Por favor, inténtelo de nuevo.');
            setShowAlertDialog(true);
        }
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setBirthDate(selectedDate);
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES');
    };
    const validateForm = () => {
        // Verificar la condición completa
        const isFormValid = !(!phone || !identificationType || !identificationNumber || !rol || !genre);

        // Verificar campos obligatorios
        if (!phone || !identificationType || !identificationNumber || !rol || !genre) {
            let missingFields = [];
            if (!phone) missingFields.push('teléfono');
            if (!identificationType) missingFields.push('tipo de identificación');
            if (!identificationNumber) missingFields.push('número de identificación');
            if (!rol) missingFields.push('tipo de usuario');
            if (!genre) missingFields.push('género');

            setErrorMessage(`Faltan los siguientes campos obligatorios: ${missingFields.join(', ')}.`);
            setShowAlertDialog(true);
            return false;
        }

        // Validar teléfono (8 dígitos)
        const phonePattern = /^\d{8}$/;
        if (!phonePattern.test(phone)) {
            setErrorMessage('El número de teléfono debe tener 8 dígitos.');
            setShowAlertDialog(true);
            return false;
        }
        // Validar identificación según el tipo
        if (identificationType === 'Cédula') {
            const cedulaPattern = /^\d{9}$/;
            if (!cedulaPattern.test(identificationNumber)) {
                setErrorMessage('La cédula debe tener 9 dígitos.');
                setShowAlertDialog(true);
                return false;
            }
        }

        return true;
    };

    const handleBackWithData = () => {
        // Guardar los datos actuales antes de volver
        const currentSecondFormData = {
            avatar,
            username,
            phone,
            identificationType,
            identificationNumber,
            userType: rol,
            genre,
            birthDate: birthDate.toISOString(),
        };
        onBack(currentSecondFormData);
    }; const handleFinishRegistration = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            // Combinar datos de ambos formularios
            const completeRegistrationData = {
                ...firstFormData,
                avatar,
                username,
                phone,
                identificationType: identificationType,
                identificationNumber,
                rol: rol,
                genre: genre,
                birthDate: birthDate.toISOString(),
            };
            onFinish(completeRegistrationData);

        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('Error al registrar usuario. Por favor, inténtelo de nuevo.');
            setShowAlertDialog(true);
        } finally {
            setLoading(false);
        }
    };

    // Mostrar pantalla de carga mientras se cargan los parámetros
    if (loadingParameters) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-[16px] text-gray-600" style={{ fontFamily: 'Exo_400Regular' }}>
                    Cargando formulario...
                </Text>
            </View>
        );
    }

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: '#fff' }}
            contentContainerStyle={{ paddingBottom: 60 }}
            enableOnAndroid={true}
            extraScrollHeight={100}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
        >
            <View className="flex-1 items-center">
                <StatusBar style="light" />
                <ImageBackground
                    source={require('@/assets/images/fondo-HitchHop.png')}
                    className="absolute inset-0 w-full h-[588px] left-[0px] top-[-53px]"
                    resizeMode="contain"
                />

                <View className="absolute justify-center items-center h-[80px] w-[270px] top-[2px]">
                    <Text className="text-[24px] text-gray-800 text-center mb-1 top-[17px]" style={{ fontFamily: 'Exo_700Bold' }}>
                        Personaliza tu perfil
                    </Text>
                </View>

                <View className="top-[110px] w-full items-center bg-white rounded-[30px] pb-10">
                    <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
                        <AlertDialogBackdrop className="bg-black/80" />
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <Text className="text-[18px] text-black" style={{ fontFamily: 'Exo_600SemiBold' }}>
                                    Información de Usuario
                                </Text>
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

                    <View className="flex-row w-full px-6 mb-0 mt-[10px] z-20">
                        <View style={{ position: 'relative' }}>
                            <Avatar
                                className="w-[96px] h-[96px] rounded-full bg-[#ECECFF] justify-center items-center overflow-hidden"
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 8,
                                    elevation: 8,
                                }}
                            >
                                {avatar && avatar.startsWith('data:image') ? (
                                    <ImageBackground
                                        source={{ uri: avatar }}
                                        className="w-full h-full rounded-full"
                                        resizeMode="cover"
                                        style={{ borderRadius: 48 }}
                                    />
                                ) : (
                                    <ImageBackground
                                        source={require('@/assets/images/Meli2.png')}
                                        className="w-full h-full rounded-full"
                                        resizeMode="cover"
                                        style={{ borderRadius: 48 }}
                                    />
                                )}
                            </Avatar>

                            {/* Botón flotante de cámara */}
                            <TouchableOpacity
                                onPress={showImagePickerOptions}
                                style={{
                                    position: 'absolute',
                                    bottom: -2,
                                    right: -2,
                                    zIndex: 100,
                                    width: 34,
                                    height: 34,
                                    borderRadius: 17,
                                    backgroundColor: '#FFC750',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                            >
                                <Camera size={20} color="#000000" />
                            </TouchableOpacity>
                        </View>
                    </View>



                    <FormControl className='top-[-70px]'>
                        {/* Nombre de Usuario */}
                        <View className="flex-row ml-[87px]">
                            <View className="flex-col">
                                <View className="flex-row mb-2">
                                    <Text className="text-[19px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                                        Nombre de usuario
                                    </Text>
                                    {username === '' && (
                                        <Text className="text-[20px] text-red-500 ml-1" style={{ fontFamily: 'Exo_700Bold' }}>
                                            *
                                        </Text>
                                    )}
                                </View>
                                <Input className="border border-gray-300 rounded-lg bg-gray-50 h-[44px]">
                                    <InputField
                                        value={username}
                                        onChangeText={setUsername}
                                        className="text-base text-gray-800 px-3 py-3"
                                    />
                                </Input>
                            </View>
                        </View>

                        {/* Teléfono */}
                        <View className="mb-3">
                            <View className="flex-row mb-2">
                                <Text className="text-[19px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                                    Teléfono
                                </Text>
                                {phone === '' && (
                                    <Text className="text-[20px] text-red-500 ml-1" style={{ fontFamily: 'Exo_700Bold' }}>
                                        *
                                    </Text>
                                )}
                            </View>
                            <Input className="border border-gray-300 rounded-lg bg-gray-50 h-[44px]">
                                <InputField
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="numeric"
                                    maxLength={8}
                                    className="text-base text-gray-800 px-3 py-3"
                                />
                            </Input>
                        </View>

                        {/* Tipo de identificación */}
                        <View className="mb-3">
                            <View className="flex-row mb-2">
                                <Text className="text-[19px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                                    Tipo de identificación
                                </Text>
                                {identificationType === '' && (
                                    <Text className="text-[20px] text-red-500 ml-1" style={{ fontFamily: 'Exo_700Bold' }}>
                                        *
                                    </Text>
                                )}
                            </View>
                            <Select
                                options={identificationTypes}
                                selectedValue={identificationType}
                                onValueChange={handleIdentificationTypeChange}
                                placeholder="Seleccionar"
                            />
                        </View>

                        {/* Número de identificación */}
                        <View className="mb-3">
                            <View className="flex-row mb-2">
                                <Text className="text-[19px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                                    Identificación
                                </Text>
                                {identificationNumber === '' && (
                                    <Text className="text-[20px] text-red-500 ml-1" style={{ fontFamily: 'Exo_700Bold' }}>
                                        *
                                    </Text>
                                )}
                            </View>
                            <Input className="border border-gray-300 rounded-lg bg-gray-50 h-[44px]">
                                <InputField
                                    value={identificationNumber}
                                    onChangeText={setIdentificationNumber}
                                    placeholder=""
                                    keyboardType="numeric"
                                    className="text-base text-gray-800 px-3 py-3"
                                />
                            </Input>
                        </View>

                        {/* Tipo de usuario */}
                        <View className="mb-3">
                            <View className="flex-row mb-2">
                                <Text className="text-[19px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                                    Tipo de usuario
                                </Text>
                                {rol === '' && (
                                    <Text className="text-[20px] text-red-500 ml-1" style={{ fontFamily: 'Exo_700Bold' }}>
                                        *
                                    </Text>
                                )}
                            </View>
                            <Select
                                options={roles}
                                selectedValue={rol}
                                onValueChange={handleRolChange}
                                placeholder="Seleccionar"
                                className=" border border-gray-300 rounded-lg bg-white"
                            />
                        </View>

                        {/* Género */}
                        <View className="mb-3">
                            <View className="flex-row mb-2">
                                <Text className="text-[19px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                                    Género
                                </Text>
                                {genre === '' && (
                                    <Text className="text-[20px] text-red-500 ml-1" style={{ fontFamily: 'Exo_700Bold' }}>
                                        *
                                    </Text>
                                )}
                            </View>
                            <Select
                                options={generos}
                                selectedValue={genre}
                                onValueChange={handleGenreChange}
                                placeholder="Seleccionar"
                            />
                        </View>

                        {/* Fecha de nacimiento */}
                        <View className="mb-3">
                            <View className="flex-row mb-2">
                                <Text className="text-[19px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                                    Fecha de nacimiento
                                </Text>
                                {!birthDate && (
                                    <Text className="text-[20px] text-red-500 ml-1" style={{ fontFamily: 'Exo_700Bold' }}>
                                        *
                                    </Text>
                                )}

                            </View>
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                className="border border-gray-300 rounded-lg bg-gray-50 h-[44px] justify-center px-3"
                            >
                                <Text className="text-base text-gray-800">
                                    {formatDate(birthDate)}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {showDatePicker && (
                            <DateTimePicker
                                value={birthDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                                maximumDate={new Date()}
                            />
                        )}

                        <Text className="text-[16px] text-red-600 mt-1 mb-4" style={{ fontFamily: 'Exo_400Regular' }}>
                            * Información obligatoria
                        </Text>

                        {/* Buttons */}
                        <View className="flex-row justify-center items-center mb-2 top-[5px] mr-7 ml-2">
                            <TouchableOpacity
                                className="flex-1 py-3 rounded-lg items-center w-[70px] h-[50px]"
                                onPress={handleBackWithData}
                            >
                                <Text className="text-[16px] text-[#7875F8]" style={{ fontFamily: 'Exo_500Medium' }}>
                                    Volver
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className={`flex-1 bg-[#7875F8] py-3 rounded-lg items-center w-[102px] h-[47px] ${loading ? 'opacity-70' : ''
                                    }`}
                                onPress={handleFinishRegistration}
                                disabled={loading}
                            >
                                <Text className="text-[16px] text-white" style={{ fontFamily: 'Exo_500Medium' }}>
                                    {loading ? 'Registrando...' : 'Finalizar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </FormControl>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

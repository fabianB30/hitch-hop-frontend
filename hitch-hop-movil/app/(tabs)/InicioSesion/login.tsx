import React, { useState } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StatusBar } from 'expo-status-bar';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { FormControl } from '@/components/ui/form-control';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialogBackdrop, } from "@/components/ui/alert-dialog"
import { useFonts, Exo_400Regular, Exo_500Medium, Exo_600SemiBold, Exo_700Bold } from '@expo-google-fonts/exo';
import { useRouter } from "expo-router";
import { useAuth } from '../Context/auth-context';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, errors } = useAuth();
  const [fontsLoaded] = useFonts({
    Exo_400Regular,
    Exo_700Bold,
    Exo_500Medium,
    Exo_600SemiBold,
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const handleClose = () => setShowAlertDialog(false)

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Asegúrese de que el correo y contraseña que ingresó sean correctos.');
      setShowAlertDialog(true);
      return;
    }
    // Validación email intitucional (estudiantec.cr/itcr.ac.cr)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(estudiantec\.cr|itcr\.ac\.cr)$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('El correo electrónico debe ser institucional (estudiantec.cr/itcr.ac.cr)');
      setShowAlertDialog(true);
      return;
    }

    setLoading(true);

    try {
      const user = await signIn({ email: email, password: password});
      // Navegar a la pantalla principal
      if (user) {
        if (user.role === 'Pasajero'){
          console.log(user.name);
          router.push('../HomePasajero');
        } else {
          router.push('../HomeConductor');
        }
      } else {
        console.log('Login error');
      }
      

    } catch (error) {
      console.error('Login error:', error);
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
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
        />
        {/* Logo*/}
        <View className="absolute justify-center items-center h-[80px] w-[270px] top-[80px]">
          <ImageBackground
            source={require('@/assets/images/logo-HitchHop.png')}
            className="w-[270px] h-[80px]"
            resizeMode="contain"
          />
        </View>

        {/* Login Card */}
        <View className="top-[200px] w-[360px] h-[622px] items-center bg-white rounded-[30px] ">
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
          <Text className="text-[30px] text-gray-800 text-center mb-8 top-[27px]" style={{ fontFamily: 'Exo_700Bold' }}>
            Iniciar Sesión
          </Text>
          <FormControl className='top-[62px]'>
            {/* Email Field */}
            <View className="mb-5">
              <View className="flex-row mb-2">
                <Text className="text-[20px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
                  Email
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

            {/* Password Field */}
            <View className="mb-3">
              <View className="flex-row mb-2">
                <Text className="text-[20px] text-black" style={{ fontFamily: 'Exo_700Bold' }}>
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
            </View>

            {/* Remember me checkbox */}
            <View className="flex-row items-center mb-3 ml-2">
              <TouchableOpacity
                className="mr-2"
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View className={`w-4 h-4 border-2 border-gray-400 rounded items-center justify-center ${rememberMe ? 'bg-[#7875F8] border-gray-500' : 'bg-white'
                  }`}>
                  {rememberMe && (
                    <Ionicons name="checkmark" size={10} color="white" />
                  )}
                </View>
              </TouchableOpacity>
              <Text className="text-[14px] text-gray-600 " style={{ fontFamily: 'Exo_400Regular' }}>
                Guardar los datos de acceso
              </Text>
            </View>

            {/* Buttons */}
            <View className="flex-row justify-center items-center mb-6 top-[67px]  mr-7 ml-2">
              <TouchableOpacity
                className="flex-1 py-3 rounded-lg items-center w-[70px] h-[40px]"
                onPress={() => router.push("/VentanaInicial")}
              >
                <Text className="text-[16px] text-[#7875F8]" style={{ fontFamily: 'Exo_500Medium' }}>
                  Volver
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 bg-[#7875F8] py-3 rounded-lg items-center w-[102px] h-[47px] ${loading ? 'opacity-70' : ''
                  }`}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text className="text-[16px] text-white" style={{ fontFamily: 'Exo_500Medium' }}>
                  {loading ? 'Cargando...' : 'Siguiente'}
                </Text>
              </TouchableOpacity>
            </View>
          </FormControl>
          {/* Register link */}
          <View className="items-center top-[210px]">
            <Text className="text-[16px] text-black" style={{ fontFamily: 'Exo_500Medium' }}>
              ¿No tienes cuenta?{' '}
              <Text
                className="text-[15px] text-[#7875F8]"
                style={{ fontFamily: 'Exo_500Medium' }}
                onPress={() => router.push("/Register/register")}
              >
                ¡Crea una aquí!
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

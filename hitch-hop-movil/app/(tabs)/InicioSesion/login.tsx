import React, { useState } from 'react';
import { View, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { FormControl } from '@/components/ui/form-control';
import { useFonts, Exo_400Regular, Exo_500Medium, Exo_700Bold } from '@expo-google-fonts/exo';



export default function LoginScreen() {
    const [fontsLoaded] = useFonts({
      Exo_400Regular,
      Exo_700Bold,
      Exo_500Medium,
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
        }

        setLoading(true);
        
        try {
        // Aquí irá tu lógica de autenticación
        console.log('Login attempt:', { email, password });
        
        // Simular una petición
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Si el login es exitoso, mostrar mensaje
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
            // Navegar a la pantalla principal (puedes cambiar la ruta)
        router.push('/(tabs)');
        
        } catch (error) {
        Alert.alert('Error', 'Credenciales incorrectas');
        } finally {
        setLoading(false);
        }
    };    const toggleShowPassword = () => {
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
        {/* Login Card */}
        <View className="top-[200px] w-[360px] h-[622px] items-center bg-white rounded-[30px] ">
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
                <View className={`w-4 h-4 border-2 border-gray-400 rounded items-center justify-center ${
                  rememberMe ? 'bg-purple-600 border-purple-600' : 'bg-white'
                }`}>
                  {rememberMe && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
              </TouchableOpacity>
              <Text className="text-[14px] text-gray-600 " style={{ fontFamily: 'Exo_400Regular' }}>
                Guardar los datos de acceso
              </Text>
            </View>

            {/* Buttons */}
            <View className="flex-row justify-center items-center mb-6 top-[67px]  mr-7 ml-3">
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
                className="text-[16px] text-[#7875F8]"
                style={{ fontFamily: 'Exo_500Medium' }}
                onPress={() => Alert.alert('Info', 'Función de registro próximamente')}
              >
                ¡Crea una aquí!
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
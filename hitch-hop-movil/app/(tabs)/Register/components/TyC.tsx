import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Exo_400Regular, Exo_700Bold, Exo_500Medium, Exo_600SemiBold } from '@expo-google-fonts/exo';
import { Ionicons } from '@expo/vector-icons';

interface TyCProps {
    onAccept: () => void;
    onReject: () => void;
}

export default function TyCScreen({ onAccept, onReject }: TyCProps) {
    const router = useRouter();
    const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [fontsLoaded] = useFonts({
        Exo_400Regular,
        Exo_700Bold,
        Exo_500Medium,
        Exo_600SemiBold,
    });

    const handleScroll = (event: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isScrolledToEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        setHasScrolledToEnd(isScrolledToEnd);
    };

    const handleAccept = () => {
        if (accepted) {
            onAccept();
        }
    };

    const handleReject = () => {
        onReject(); // Esto regresará a RegisterStep1
    };

    if (!fontsLoaded) {
        return null;
    }    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                {/* Background */}
                <ImageBackground
                    source={require('@/assets/images/TyC-background.png')}
                    style={{
                        position: 'absolute',
                        width: 360,
                        height: 588,
                        top: -69
                    }}
                    resizeMode="contain"
                />
                {/* Logo*/}
                <View style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 27,
                    width: 225,
                    top: 60,
                    left: '7%',
                }}>
                    <ImageBackground
                        source={require('@/assets/images/TyC-title.png')}
                        style={{ width: 225, height: 27 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Card */}
                <View style={[
                    {
                        position: 'absolute',
                        top: 90,
                        width: 312,
                        height: 599,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 15,
                        // Sombra para iOS
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        // Sombra para Android
                        elevation: 5,
                    }
                ]}>
                    {/* Contenido scrollable */}
                    <ScrollView 
                        style={styles.scrollContainer}
                        contentContainerStyle={styles.scrollContent}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={true}
                    >
                        <Text style={styles.sectionHeader}>HitchHop - Conecta tu ruta, comparte tu camino</Text>

                        <Text style={styles.sectionText}>Actualizado el 10 de abril de 2025.</Text>

                        <Text style={styles.sectionHeader}>Términos y Condiciones del Servicio</Text>
                        <Text style={styles.sectionTitle}>
                            El presente documento constituye el marco normativo que regula el uso de HitchHop, tanto en su versión móvil como web. Este es un sistema creado específicamente para facilitar el transporte compartido entre personas pertenecientes a una misma organización institucional. Al acceder y utilizar esta herramienta digital, cada usuario—ya sea en calidad de conductor, pasajero o administrador—manifiesta su conformidad absoluta con las disposiciones aquí establecidas.
                        </Text>

                        <Text style={styles.sectionHeader}>1. Naturaleza del Servicio</Text>
                        <Text style={styles.sectionText}>
                            HitchHop constituye una solución tecnológica exclusiva para dispositivos Android que posibilita la organización colaborativa de desplazamientos entre miembros de entidades educativas o laborales específicas. Su propósito fundamental radica en optimizar la movilidad interna mediante un sistema estructurado de publicación y solicitud de trayectos, fomentando prácticas sostenibles, ahorro económico y espíritu colaborativo.
                        </Text>
                        <Text style={styles.sectionText}>
                            Complementariamente, HitchHop incorpora una interfaz web destinada al personal administrativo autorizado, facilitando la consulta, análisis estadístico y supervisión integral del funcionamiento del sistema.
                        </Text>

                        <Text style={styles.sectionHeader}>2. Proceso de Incorporación y Acceso</Text>
                        <Text style={styles.sectionSubheader}>2.1</Text>
                        <Text style={styles.sectionText}>
                            La incorporación como usuario queda estrictamente reservada a integrantes verificados de la institución, mediante validación de credenciales oficiales.
                        </Text>
                        <Text style={styles.sectionSubheader}>2.2</Text>
                        <Text style={styles.sectionText}>
                            Para acceder y beneficiarse de las funcionalidades ofrecidas, resulta imprescindible la aceptación expresa del presente marco normativo.
                        </Text>
                        <Text style={styles.sectionSubheader}>2.3</Text>
                        <Text style={styles.sectionText}>
                            Cada usuario asume plena responsabilidad respecto a la confidencialidad de sus datos de acceso y cualquier actividad realizada desde su perfil personal.
                        </Text>

                        <Text style={styles.sectionHeader}>3. Administración de Información Personal</Text>
                        <Text style={styles.sectionText}>
                            Durante el proceso de registro, se solicita al usuario proporcionar determinados datos personales:
                        </Text>
                        <Text style={styles.sectionSubheader}>3.1</Text>
                        <Text style={styles.sectionText}>Identificación nominal completa</Text>
                        <Text style={styles.sectionSubheader}>3.2</Text>
                        <Text style={styles.sectionText}>Dirección electrónica institucional</Text>
                        <Text style={styles.sectionSubheader}>3.3</Text>
                        <Text style={styles.sectionText}>Número telefónico de contacto</Text>
                        <Text style={styles.sectionSubheader}>3.4</Text>
                        <Text style={styles.sectionText}>Modalidad de participación (conductor/pasajero)</Text>
                        <Text style={styles.sectionSubheader}>3.5</Text>
                        <Text style={styles.sectionText}>Características demográficas básicas (opcional, con finalidad estadística)</Text>
                        <Text style={styles.sectionText}>
                            Esta información se empleará exclusivamente para garantizar el funcionamiento adecuado del sistema, sin transmisión a terceros salvo consentimiento expreso.
                        </Text>

                        <Text style={styles.sectionHeader}>4. Gestión de Desplazamientos</Text>
                        <Text style={styles.sectionSubheader}>Para quienes conducen:</Text>
                        <Text style={styles.sectionSubheader}>4.1</Text>
                        <Text style={styles.sectionText}>Podrán registrar itinerarios especificando:</Text>
                        <Text style={styles.sectionBullet}>• Punto inicial y terminal del recorrido</Text>
                        <Text style={styles.sectionBullet}>• Cronograma temporal (salida y llegada aproximada)</Text>
                        <Text style={styles.sectionBullet}>• Plazas disponibles</Text>
                        <Text style={styles.sectionBullet}>• Ubicaciones potenciales para recoger pasajeros</Text>
                        <Text style={styles.sectionBullet}>• Contribución económica solicitada (facultativo)</Text>
                        <Text style={styles.sectionSubheader}>4.2</Text>
                        <Text style={styles.sectionText}>Las transacciones monetarias se efectuarán directamente entre las partes mediante efectivo o SINPE Móvil.</Text>
                        <Text style={styles.sectionSubheader}>4.3</Text>
                        <Text style={styles.sectionText}>Todo desplazamiento deberá ajustarse a los protocolos institucionales de seguridad y responsabilidad.</Text>
                        <Text style={styles.sectionSubheader}>4.4</Text>
                        <Text style={styles.sectionText}>Quien conduce se compromete a respetar la planificación horaria publicada y mantener trato cordial hacia los acompañantes.</Text>

                        <Text style={styles.sectionSubheader}>Para pasajeros:</Text>
                        <Text style={styles.sectionSubheader}>4.5</Text>
                        <Text style={styles.sectionText}>Podrán examinar las opciones disponibles, visualizar detalles completos del itinerario y seleccionar ubicación de encuentro dentro del trayecto establecido.</Text>
                        <Text style={styles.sectionSubheader}>4.6</Text>
                        <Text style={styles.sectionText}>El pasajero deberá presentarse puntualmente en el punto acordado.</Text>
                        <Text style={styles.sectionSubheader}>4.7</Text>
                        <Text style={styles.sectionText}>La interacción conductor-pasajero tiene carácter voluntario, asumiendo ambas partes la responsabilidad sobre el cumplimiento del trayecto pactado.</Text>

                        <Text style={styles.sectionHeader}>5. Registro Histórico de Desplazamientos</Text>
                        <Text style={styles.sectionSubheader}>5.1</Text>
                        <Text style={styles.sectionText}>Todos los participantes mantendrán acceso a un registro cronológico detallado de sus participaciones en la plataforma.</Text>
                        <Text style={styles.sectionSubheader}>5.2</Text>
                        <Text style={styles.sectionText}>Esta característica permite mantener un control personal de utilización y rutas frecuentadas.</Text>

                        <Text style={styles.sectionHeader}>6. Marco Institucional y Limitaciones</Text>
                        <Text style={styles.sectionSubheader}>6.1</Text>
                        <Text style={styles.sectionText}>La plataforma HitchHop ha sido concebida para uso exclusivo en contextos institucionales específicos.</Text>
                        <Text style={styles.sectionSubheader}>6.2</Text>
                        <Text style={styles.sectionText}>Queda vedada su utilización con personas ajenas a la entidad correspondiente.</Text>
                        <Text style={styles.sectionSubheader}>6.3</Text>
                        <Text style={styles.sectionText}>Se prohíbe expresamente el aprovechamiento de la aplicación para actividades comerciales, transporte público no regulado, distribución mercantil o cualquier finalidad distinta a la originalmente prevista.</Text>

                        <Text style={styles.sectionHeader}>7. Protocolos de Convivencia y Seguridad</Text>
                        <Text style={styles.sectionSubheader}>7.1</Text>
                        <Text style={styles.sectionText}>La comunidad de usuarios debe caracterizarse por prácticas respetuosas, inclusivas y responsables.</Text>
                        <Text style={styles.sectionSubheader}>7.2</Text>
                        <Text style={styles.sectionText}>Resulta imperativo cumplir con los compromisos temporales adquiridos al participar en un trayecto.</Text>
                        <Text style={styles.sectionSubheader}>7.3</Text>
                        <Text style={styles.sectionText}>Cualquier incidente o comportamiento inadecuado deberá notificarse inmediatamente a través de los canales establecidos.</Text>
                        <Text style={styles.sectionSubheader}>7.4</Text>
                        <Text style={styles.sectionText}>La integridad física y emocional de quienes utilizan la plataforma constituye una responsabilidad compartida entre conductores, pasajeros y la institución.</Text>

                        <Text style={styles.sectionHeader}>8. Sistema de Administración Institucional</Text>
                        <Text style={styles.sectionSubheader}>8.1</Text>
                        <Text style={styles.sectionText}>La aplicación incorpora una interfaz web restringida para personal administrativo autorizado, permitiendo:</Text>
                        <Text style={styles.sectionBullet}>• Examinar parámetros generales sobre desplazamientos, perfiles, rutas y tarifas</Text>
                        <Text style={styles.sectionBullet}>• Acceder a métricas clasificadas por edad, género, frecuencia de utilización y otros indicadores relevantes</Text>
                        <Text style={styles.sectionBullet}>• Consultar representaciones visuales para facilitar análisis estratégicos</Text>
                        <Text style={styles.sectionSubheader}>8.2</Text>
                        <Text style={styles.sectionText}>La información presentada en esta interfaz mantiene carácter anónimo, destinándose exclusivamente a la optimización interna del servicio.</Text>

                        <Text style={styles.sectionHeader}>9. Salvaguarda de Información Personal</Text>
                        <Text style={styles.sectionSubheader}>9.1</Text>
                        <Text style={styles.sectionText}>El tratamiento de datos personales se realizará conforme a la normativa vigente en materia de protección informativa.</Text>
                        <Text style={styles.sectionSubheader}>9.2</Text>
                        <Text style={styles.sectionText}>Su utilización quedará restringida a funciones vinculadas directamente con la operatividad de HitchHop.</Text>
                        <Text style={styles.sectionSubheader}>9.3</Text>
                        <Text style={styles.sectionText}>El personal administrativo únicamente accederá a información agregada o despersonalizada.</Text>
                        <Text style={styles.sectionSubheader}>9.4</Text>
                        <Text style={styles.sectionText}>Cada usuario mantiene el derecho de solicitar modificaciones o eliminación de su información personal mediante comunicación dirigida a nuestro departamento de soporte.</Text>

                        <Text style={styles.sectionHeader}>10. Procedimientos de Restricción de Acceso</Text>
                        <Text style={styles.sectionSubheader}>10.1</Text>
                        <Text style={styles.sectionText}>La plataforma se reserva la facultad de limitar temporal o definitivamente el acceso a usuarios que incumplan esta normativa, realicen usos indebidos o generen situaciones conflictivas para la comunidad institucional.</Text>
                        <Text style={styles.sectionSubheader}>10.2</Text>
                        <Text style={styles.sectionText}>Ante infracciones graves, la institución podrá implementar medidas complementarias según su reglamentación interna.</Text>

                        <Text style={styles.sectionHeader}>11. Exención de Responsabilidades</Text>
                        <Text style={styles.sectionSubheader}>11.1</Text>
                        <Text style={styles.sectionText}>HitchHop no asume responsabilidad referente a la puntualidad, condiciones de seguridad o resultado final del servicio ofrecido entre usuarios.</Text>
                        <Text style={styles.sectionSubheader}>11.2</Text>
                        <Text style={styles.sectionText}>La aplicación funciona exclusivamente como canal facilitador entre las partes involucradas.</Text>
                        <Text style={styles.sectionSubheader}>11.3</Text>
                        <Text style={styles.sectionText}>Cualquier contingencia, perjuicio, extravío o discrepancia derivada del uso del servicio recae bajo la responsabilidad exclusiva de los participantes directos.</Text>

                        <Text style={styles.sectionHeader}>12. Actualización del Marco Normativo</Text>
                        <Text style={styles.sectionSubheader}>12.1</Text>
                        <Text style={styles.sectionText}>La administración de HitchHop mantiene la potestad de modificar estas disposiciones cuando las circunstancias lo requieran.</Text>
                        <Text style={styles.sectionSubheader}>12.2</Text>
                        <Text style={styles.sectionText}>Las modificaciones serán comunicadas mediante la plataforma, considerándose aceptadas tácitamente al continuar utilizando el servicio.</Text>

                        <Text style={styles.sectionHeader}>13. Vías de Comunicación</Text>
                        <Text style={styles.sectionSubheader}>13.1</Text>
                        <Text style={styles.sectionText}>Para consultas, asistencia técnica o notificaciones, puede contactarnos en: 📧 soporte@hitchhop.com</Text>

                        <Text style={styles.sectionHeader}>14. Tratamiento de Información Personal</Text>
                        <Text style={styles.sectionSubheader}>14.1</Text>
                        <Text style={styles.sectionText}>Nuestra plataforma recopila datos personales con el objetivo específico de proporcionar una experiencia segura, eficiente y personalizada para la comunidad institucional.</Text>
                        <Text style={styles.sectionSubheader}>14.2</Text>
                        <Text style={styles.sectionText}>La información proporcionada durante el registro (identificación, correo institucional, función, características demográficas y contacto telefónico) se utiliza para:</Text>
                        <Text style={styles.sectionBullet}>• Corroborar la pertenencia institucional del usuario</Text>
                        <Text style={styles.sectionBullet}>• Adaptar la experiencia según perfil y preferencias</Text>
                        <Text style={styles.sectionBullet}>• Administrar funcionalidades esenciales como publicación de rutas y gestión de participantes</Text>
                        <Text style={styles.sectionBullet}>• Elaborar análisis estadísticos orientados a la mejora continua</Text>
                        <Text style={styles.sectionSubheader}>14.3</Text>
                        <Text style={styles.sectionText}>Los datos de localización, cuando son recopilados, se emplean exclusivamente para la operatividad directa de la funcionalidad correspondiente, sin almacenamiento ni transmisión de información geográfica en tiempo real.</Text>
                        <Text style={styles.sectionSubheader}>14.4</Text>
                        <Text style={styles.sectionText}>Garantizamos que sus datos personales jamás serán comercializados, transferidos o utilizados con fines promocionales por entidades externas. El acceso queda restringido al personal estrictamente necesario para la administración del sistema o requerimientos institucionales legítimos.</Text>
                        <Text style={styles.sectionSubheader}>14.5</Text>
                        <Text style={styles.sectionText}>Los administradores institucionales acceden únicamente a información consolidada, anónima y categorizada, destinada a evaluar el impacto del servicio, perfeccionar directrices internas y desarrollar iniciativas de seguridad o sostenibilidad.</Text>
                        <Text style={styles.sectionSubheader}>14.6</Text>
                        <Text style={styles.sectionText}>Nuestra organización implementa medidas técnicas y estructurales apropiadas para garantizar la seguridad, confidencialidad e integridad de la información almacenada.</Text>
                        <Text style={styles.sectionSubheader}>14.7</Text>
                        <Text style={styles.sectionText}>En cualquier momento, usted puede ejercer su derecho a consultar, rectificar o solicitar la eliminación de su información personal mediante comunicación escrita dirigida a: soporte@hitchhop.com</Text>

                        <View style={{ height: 40 }} />
                    </ScrollView>
                </View>
            </View>
            {/* Footer con checkbox y botones */}
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.checkboxContainer}
                    onPress={() => setAccepted(!accepted)}
                >
                    <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
                        {accepted && <Ionicons name="checkmark" size={16} color="#fff" />}
                    </View>
                    <Text style={styles.checkboxText}>
                        He leído y acepto los términos y condiciones
                    </Text>
                </TouchableOpacity>                
                <View style={styles.buttonContainer} className='flex-row justify-between mr-8 ml-8'>
                    <TouchableOpacity
                        onPress={handleReject}
                        style={[styles.button, styles.cancelButton]}
                    >
                        <Text style={[styles.buttonText, styles.cancelButtonText]}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleAccept}
                        style={[
                            styles.button, 
                            styles.acceptButton,
                            !accepted && { opacity: 0.5 } // Deshabilitar visualmente si no está aceptado
                        ]}
                        disabled={!accepted} // Deshabilitar funcionalmente
                    >
                        <Text style={[styles.buttonText, styles.acceptButtonText]}>
                            Siguiente
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontFamily: 'Exo_700Bold',
        fontSize: 28,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    headerSubtitle: {
        fontFamily: 'Exo_400Regular',
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        opacity: 0.9,
        lineHeight: 20,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    sectionTitle: {
        fontFamily: 'Exo_400Regular',
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 20,
        textAlign: 'justify',
    },
    sectionHeader: {
        fontFamily: 'Exo_600SemiBold',
        fontSize: 16,
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
    },
    sectionSubheader: {
        fontFamily: 'Exo_500Medium',
        fontSize: 14,
        color: '#444',
        marginTop: 10,
        marginBottom: 5,
    },
    sectionText: {
        fontFamily: 'Exo_400Regular',
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 10,
        textAlign: 'justify',
    },
    sectionBullet: {
        fontFamily: 'Exo_400Regular',
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 5,
        marginLeft: 10,
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#7875F8',
        borderRadius: 4,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#7875F8',
    },
    checkboxText: {
        fontFamily: 'Exo_600SemiBold',
        fontSize: 14,
        color: '#333',
        flex: 1,
    },    
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },    
    cancelButton: {
        backgroundColor: 'transparent',
    },
    acceptButton: {
        backgroundColor: '#7875F8',
    },
    buttonText: {
        fontFamily: 'Exo_600SemiBold',
        fontSize: 16,
    },
    cancelButtonText: {
        color: '#7875F8',
    },
    acceptButtonText: {
        color: '#fff',
    },
});
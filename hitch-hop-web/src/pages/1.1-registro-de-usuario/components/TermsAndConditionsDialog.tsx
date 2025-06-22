import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface TermsAndConditionsDialogProps {
  children: React.ReactNode;
}

export default function TermsAndConditionsDialog({ children }: TermsAndConditionsDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[90vw] max-w-[900px] p-8 max-h-[90vh] overflow-hidden">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-center mb-2">
            Términos y Condiciones
          </AlertDialogTitle>
        </AlertDialogHeader>        <AlertDialogDescription asChild>
          <div className="max-h-[70vh] overflow-y-auto text-gray-700 text-[15px] font-normal leading-relaxed">
            <h3 className="mb-2 font-semibold text-lg">HitchHop - Conecta tu ruta, comparte tu camino</h3>

            <p className="mb-2">Actualizado el 10 de abril de 2025.</p>

            <h3 className="mb-2 font-semibold text-lg">Términos y Condiciones del Servicio</h3>
            <p className="mb-4">
              El presente documento constituye el marco normativo que regula el uso de HitchHop, tanto en su versión móvil como web. Este es un sistema creado específicamente para facilitar el transporte compartido entre personas pertenecientes a una misma organización institucional. Al acceder y utilizar esta herramienta digital, cada usuario—ya sea en calidad de conductor, pasajero o administrador—manifiesta su conformidad absoluta con las disposiciones aquí establecidas.
            </p>

            <h3 className="mb-2 font-semibold text-lg">1. Naturaleza del Servicio</h3>
            <p className="mb-4">
              HitchHop constituye una solución tecnológica exclusiva para dispositivos Android que posibilita la organización colaborativa de desplazamientos entre miembros de entidades educativas o laborales específicas. Su propósito fundamental radica en optimizar la movilidad interna mediante un sistema estructurado de publicación y solicitud de trayectos, fomentando prácticas sostenibles, ahorro económico y espíritu colaborativo.
            </p>
            <p className="mb-4">
              Complementariamente, HitchHop incorpora una interfaz web destinada al personal administrativo autorizado, facilitando la consulta, análisis estadístico y supervisión integral del funcionamiento del sistema.
            </p>

            <h3 className="mb-2 font-semibold text-lg">2. Proceso de Incorporación y Acceso</h3>
            <h4 className="font-semibold">2.1</h4>
            <p className="mb-2">
              La incorporación como usuario queda estrictamente reservada a integrantes verificados de la institución, mediante validación de credenciales oficiales.
            </p>
            <h4 className="font-semibold">2.2</h4>
            <p className="mb-2">
              Para acceder y beneficiarse de las funcionalidades ofrecidas, resulta imprescindible la aceptación expresa del presente marco normativo.
            </p>
            <h4 className="font-semibold">2.3</h4>
            <p className="mb-4">
              Cada usuario asume plena responsabilidad respecto a la confidencialidad de sus datos de acceso y cualquier actividad realizada desde su perfil personal.
            </p>

            <h3 className="mb-2 font-semibold text-lg">3. Administración de Información Personal</h3>
            <p className="mb-2">
              Durante el proceso de registro, se solicita al usuario proporcionar determinados datos personales:
            </p>
            <h4 className="font-semibold">3.1</h4>
            <p className="mb-1">Identificación nominal completa</p>
            <h4 className="font-semibold">3.2</h4>
            <p className="mb-1">Dirección electrónica institucional</p>
            <h4 className="font-semibold">3.3</h4>
            <p className="mb-1">Número telefónico de contacto</p>
            <h4 className="font-semibold">3.4</h4>
            <p className="mb-1">Modalidad de participación (conductor/pasajero)</p>
            <h4 className="font-semibold">3.5</h4>
            <p className="mb-1">Características demográficas básicas (opcional, con finalidad estadística)</p>
            <p className="mb-4">
              Esta información se empleará exclusivamente para garantizar el funcionamiento adecuado del sistema, sin transmisión a terceros salvo consentimiento expreso.
            </p>

            <h3 className="mb-2 font-semibold text-lg">4. Gestión de Desplazamientos</h3>
            <h4 className="font-semibold mb-2">Para quienes conducen:</h4>
            <h4 className="font-semibold">4.1</h4>
            <p className="mb-2">Podrán registrar itinerarios especificando:</p>
            <p className="mb-1 ml-4">• Punto inicial y terminal del recorrido</p>
            <p className="mb-1 ml-4">• Cronograma temporal (salida y llegada aproximada)</p>
            <p className="mb-1 ml-4">• Plazas disponibles</p>
            <p className="mb-1 ml-4">• Ubicaciones potenciales para recoger pasajeros</p>
            <p className="mb-2 ml-4">• Contribución económica solicitada (facultativo)</p>
            <h4 className="font-semibold">4.2</h4>
            <p className="mb-2">Las transacciones monetarias se efectuarán directamente entre las partes mediante efectivo o SINPE Móvil.</p>
            <h4 className="font-semibold">4.3</h4>
            <p className="mb-2">Todo desplazamiento deberá ajustarse a los protocolos institucionales de seguridad y responsabilidad.</p>
            <h4 className="font-semibold">4.4</h4>
            <p className="mb-4">Quien conduce se compromete a respetar la planificación horaria publicada y mantener trato cordial hacia los acompañantes.</p>

            <h4 className="font-semibold mb-2">Para pasajeros:</h4>
            <h4 className="font-semibold">4.5</h4>
            <p className="mb-2">Podrán examinar las opciones disponibles, visualizar detalles completos del itinerario y seleccionar ubicación de encuentro dentro del trayecto establecido.</p>
            <h4 className="font-semibold">4.6</h4>
            <p className="mb-2">El pasajero deberá presentarse puntualmente en el punto acordado.</p>
            <h4 className="font-semibold">4.7</h4>
            <p className="mb-4">La interacción conductor-pasajero tiene carácter voluntario, asumiendo ambas partes la responsabilidad sobre el cumplimiento del trayecto pactado.</p>

            <h3 className="mb-2 font-semibold text-lg">5. Registro Histórico de Desplazamientos</h3>
            <h4 className="font-semibold">5.1</h4>
            <p className="mb-2">Todos los participantes mantendrán acceso a un registro cronológico detallado de sus participaciones en la plataforma.</p>
            <h4 className="font-semibold">5.2</h4>
            <p className="mb-4">Esta característica permite mantener un control personal de utilización y rutas frecuentadas.</p>

            <h3 className="mb-2 font-semibold text-lg">6. Marco Institucional y Limitaciones</h3>
            <h4 className="font-semibold">6.1</h4>
            <p className="mb-2">La plataforma HitchHop ha sido concebida para uso exclusivo en contextos institucionales específicos.</p>
            <h4 className="font-semibold">6.2</h4>
            <p className="mb-2">Queda vedada su utilización con personas ajenas a la entidad correspondiente.</p>
            <h4 className="font-semibold">6.3</h4>
            <p className="mb-4">Se prohíbe expresamente el aprovechamiento de la aplicación para actividades comerciales, transporte público no regulado, distribución mercantil o cualquier finalidad distinta a la originalmente prevista.</p>

            <h3 className="mb-2 font-semibold text-lg">7. Protocolos de Convivencia y Seguridad</h3>
            <h4 className="font-semibold">7.1</h4>
            <p className="mb-2">La comunidad de usuarios debe caracterizarse por prácticas respetuosas, inclusivas y responsables.</p>
            <h4 className="font-semibold">7.2</h4>
            <p className="mb-2">Resulta imperativo cumplir con los compromisos temporales adquiridos al participar en un trayecto.</p>
            <h4 className="font-semibold">7.3</h4>
            <p className="mb-2">Cualquier incidente o comportamiento inadecuado deberá notificarse inmediatamente a través de los canales establecidos.</p>
            <h4 className="font-semibold">7.4</h4>
            <p className="mb-4">La integridad física y emocional de quienes utilizan la plataforma constituye una responsabilidad compartida entre conductores, pasajeros y la institución.</p>

            <h3 className="mb-2 font-semibold text-lg">8. Sistema de Administración Institucional</h3>
            <h4 className="font-semibold">8.1</h4>
            <p className="mb-2">La aplicación incorpora una interfaz web restringida para personal administrativo autorizado, permitiendo:</p>
            <p className="mb-1 ml-4">• Examinar parámetros generales sobre desplazamientos, perfiles, rutas y tarifas</p>
            <p className="mb-1 ml-4">• Acceder a métricas clasificadas por edad, género, frecuencia de utilización y otros indicadores relevantes</p>
            <p className="mb-2 ml-4">• Consultar representaciones visuales para facilitar análisis estratégicos</p>
            <h4 className="font-semibold">8.2</h4>
            <p className="mb-4">La información presentada en esta interfaz mantiene carácter anónimo, destinándose exclusivamente a la optimización interna del servicio.</p>

            <h3 className="mb-2 font-semibold text-lg">9. Salvaguarda de Información Personal</h3>
            <h4 className="font-semibold">9.1</h4>
            <p className="mb-2">El tratamiento de datos personales se realizará conforme a la normativa vigente en materia de protección informativa.</p>
            <h4 className="font-semibold">9.2</h4>
            <p className="mb-2">Su utilización quedará restringida a funciones vinculadas directamente con la operatividad de HitchHop.</p>
            <h4 className="font-semibold">9.3</h4>
            <p className="mb-2">El personal administrativo únicamente accederá a información agregada o despersonalizada.</p>
            <h4 className="font-semibold">9.4</h4>
            <p className="mb-4">Cada usuario mantiene el derecho de solicitar modificaciones o eliminación de su información personal mediante comunicación dirigida a nuestro departamento de soporte.</p>

            <h3 className="mb-2 font-semibold text-lg">10. Procedimientos de Restricción de Acceso</h3>
            <h4 className="font-semibold">10.1</h4>
            <p className="mb-2">La plataforma se reserva la facultad de limitar temporal o definitivamente el acceso a usuarios que incumplan esta normativa, realicen usos indebidos o generen situaciones conflictivas para la comunidad institucional.</p>
            <h4 className="font-semibold">10.2</h4>
            <p className="mb-4">Ante infracciones graves, la institución podrá implementar medidas complementarias según su reglamentación interna.</p>

            <h3 className="mb-2 font-semibold text-lg">11. Exención de Responsabilidades</h3>
            <h4 className="font-semibold">11.1</h4>
            <p className="mb-2">HitchHop no asume responsabilidad referente a la puntualidad, condiciones de seguridad o resultado final del servicio ofrecido entre usuarios.</p>
            <h4 className="font-semibold">11.2</h4>
            <p className="mb-2">La aplicación funciona exclusivamente como canal facilitador entre las partes involucradas.</p>
            <h4 className="font-semibold">11.3</h4>
            <p className="mb-4">Cualquier contingencia, perjuicio, extravío o discrepancia derivada del uso del servicio recae bajo la responsabilidad exclusiva de los participantes directos.</p>

            <h3 className="mb-2 font-semibold text-lg">12. Actualización del Marco Normativo</h3>
            <h4 className="font-semibold">12.1</h4>
            <p className="mb-2">La administración de HitchHop mantiene la potestad de modificar estas disposiciones cuando las circunstancias lo requieran.</p>
            <h4 className="font-semibold">12.2</h4>
            <p className="mb-4">Las modificaciones serán comunicadas mediante la plataforma, considerándose aceptadas tácitamente al continuar utilizando el servicio.</p>

            <h3 className="mb-2 font-semibold text-lg">13. Vías de Comunicación</h3>
            <h4 className="font-semibold">13.1</h4>
            <p className="mb-4">Para consultas, asistencia técnica o notificaciones, puede contactarnos en: 📧 soporte@hitchhop.com</p>

            <h3 className="mb-2 font-semibold text-lg">14. Tratamiento de Información Personal</h3>
            <h4 className="font-semibold">14.1</h4>
            <p className="mb-2">Nuestra plataforma recopila datos personales con el objetivo específico de proporcionar una experiencia segura, eficiente y personalizada para la comunidad institucional.</p>
            <h4 className="font-semibold">14.2</h4>
            <p className="mb-2">La información proporcionada durante el registro (identificación, correo institucional, función, características demográficas y contacto telefónico) se utiliza para:</p>
            <p className="mb-1 ml-4">• Corroborar la pertenencia institucional del usuario</p>
            <p className="mb-1 ml-4">• Adaptar la experiencia según perfil y preferencias</p>
            <p className="mb-1 ml-4">• Administrar funcionalidades esenciales como publicación de rutas y gestión de participantes</p>
            <p className="mb-2 ml-4">• Elaborar análisis estadísticos orientados a la mejora continua</p>
            <h4 className="font-semibold">14.3</h4>
            <p className="mb-2">Los datos de localización, cuando son recopilados, se emplean exclusivamente para la operatividad directa de la funcionalidad correspondiente, sin almacenamiento ni transmisión de información geográfica en tiempo real.</p>
            <h4 className="font-semibold">14.4</h4>
            <p className="mb-2">Garantizamos que sus datos personales jamás serán comercializados, transferidos o utilizados con fines promocionales por entidades externas. El acceso queda restringido al personal estrictamente necesario para la administración del sistema o requerimientos institucionales legítimos.</p>
            <h4 className="font-semibold">14.5</h4>
            <p className="mb-2">Los administradores institucionales acceden únicamente a información consolidada, anónima y categorizada, destinada a evaluar el impacto del servicio, perfeccionar directrices internas y desarrollar iniciativas de seguridad o sostenibilidad.</p>
            <h4 className="font-semibold">14.6</h4>
            <p className="mb-2">Nuestra organización implementa medidas técnicas y estructurales apropiadas para garantizar la seguridad, confidencialidad e integridad de la información almacenada.</p>
            <h4 className="font-semibold">14.7</h4>
            <p className="mb-6">En cualquier momento, usted puede ejercer su derecho a consultar, rectificar o solicitar la eliminación de su información personal mediante comunicación escrita dirigida a: soporte@hitchhop.com</p>
          </div>
        </AlertDialogDescription>
        <div className="flex justify-end mt-6">
          <AlertDialogCancel asChild>
            <Button variant="outline">Volver</Button>
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

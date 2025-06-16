import { Button } from '@/components/ui/button';
import registroExitoso from '@/assets/1.1-Image-registroExitoso.png';
import Logo from '@/assets/1.1-Image-1-Logo.png';

export default function RegisterSuccessful() {
  const handleGoToLogin = () => {
    window.location.href = '/download-app';
  };

  return (
    <div className="min-h-screen w-full flex">

        {/* Imagen de la derecha */}
        <div className="hidden lg:block absolute top-0 right-0 w-1/2 xl:w-[60%] 2xl:w-[60%] h-full overflow-hidde">
          <img
            src={registroExitoso}
            alt="Background Right"
            className="w-[1100px] h-[1100px] object-cover mt-[-100px] lg:mt-[-60px] xl:mt-[-80px] 2xl:mt-[-100px]"
          />
        </div>

        {/* Contenido principal */}
        <div className="flex-col items-center relative z-10 h-full ml-[250px] w-full lg:w-1/2 xl:w-[40%] 2xl:w-[30%] justify-center p-4">
          <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-3xl text-center">
            <div className="flex-col items-center justify-center mb-8 mt-[40px] ml-10">
              <img src={Logo} alt="Logo" className="w-32 h-24 md:w-[211px] md:h-[155px] -mr-4 ml-[80px] md:-mr-12" />
              <span className="text-3xl md:text-[50px] font-extrabold text-black leading-tight" style={{ fontFamily: 'Montserrat' }}>
                HitchHop
              </span>
            </div> 
            {/* Título */}
            <h1 className="text-[36px] md:text-3xl font-bold text-[#171717] mb-6 ml-10">
              ¡El registro fue exitoso!
            </h1>

            {/* Mensaje */}
            <div className='w-[498px] h-[128px] ml-[-30px]'>
              <p className="text-black text-[24px] leading-relaxed">
              Para empezar a utilizar nuestros beneficios le solicitamos descargar la aplicación móvil e ingresar con su usuario.
              </p>
              <p className="text-black mb-8 text-[24px] leading-relaxed">
                ¡Le deseamos una muy buena experiencia!
              </p>
            </div>
            
            {/* Botón */}
            <div className="space-y-4 mt-20 ml-20">
              <Button 
                onClick={handleGoToLogin}
                className="w-full h-12 bg-[#FFAB00] hover:bg-[#e59400] text-white text-lg font-medium"
              >
                Descargar aplicación móvil
              </Button>
            </div>
          </div>
        </div>
    </div>
  );
}

import React from 'react';
import Imagen1 from '../assets/1.3-Imagen-1.png';
import logo from '../assets/1.3-Imagen-2.png';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';


import { useState } from 'react';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 flex flex-row items-start justify-between bg-white shadow-md overflow-hidden min-h-screen w-full">
      {/* Panel izquierdo */}
      <div className="flex flex-col items-center justify-center h-full w-full pl-16 pt-[5vh]">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-[127px] h-[103px] -mt-4" />
          <span className="ml-[1px] text-[60px] font-extrabold text-black font-montserrat leading-tight">HitchHop</span>
        </div>

        <form className="flex flex-col items-center justify-center w-full mt-8">
          <span className="w-[371px] h-[32px] mt-[32px] mb-4 text-[24px] font-semibold leading-[100%] font-exo text-center">
            Inicie sesión con sus credenciales
          </span>
            
          <div className="flex flex-col w-full max-w-[440px] mb-4">
            <label className="text-[20px] font-medium text-gray-700 select-none mb-1 text-left">
              Correo
            </label>
            <Input type="email" placeholder="Correo electrónico" className="w-full h-[37px]" />
          </div>

          <div className="flex flex-col w-full max-w-[440px] mb-4">
            <label className="text-[20px] font-medium text-gray-700 select-none mb-1 text-left">
              Contraseña
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="w-full h-[37px] pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.76011 6.26562C5.58818 6.42581 5.45027 6.61907 5.35462 6.83367C5.25898 7.04834 5.20755 7.2801 5.2034 7.51507C5.19925 7.75003 5.24248 7.98342 5.33049 8.20136C5.41851 8.41923 5.54951 8.61722 5.71569 8.78341C5.88186 8.94954 6.07984 9.08056 6.29771 9.16858C6.51565 9.25661 6.74904 9.29983 6.98401 9.29569C7.21897 9.29155 7.45073 9.2401 7.66534 9.14443C7.88001 9.04882 8.07321 8.91087 8.23345 8.73896" stroke="#747474" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.25781 3.46464C6.50357 3.43402 6.75096 3.41843 6.99865 3.41797C11.082 3.41797 12.832 7.5013 12.832 7.5013C12.5712 8.05961 12.2441 8.58449 11.8578 9.06464" stroke="#747474" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.85323 4.35938C2.69313 5.14957 1.76482 6.23494 1.16406 7.50354C1.16406 7.50354 2.91406 11.5869 6.9974 11.5869C8.115 11.5899 9.2087 11.2632 10.1416 10.6477" stroke="#747474" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.16406 1.66797L12.8307 13.3346" stroke="#747474" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
            
          <div className="flex items-center w-full max-w-[440px] mb-4">
            <Checkbox id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-sm font-medium text-gray-700 select-none">
              Guardar los datos de acceso
            </label>
          </div>
            
          <Button type="submit" className="w-full max-w-[166px] h-[48px] text-[18px] bg-[#7875F8] ">
            Iniciar sesión
          </Button>

          <span className="w-[371px] h-[32px] mt-[32px] mb-4 text-[16px] font-semibold leading-[100%] font-exo text-center">
            ¿No tienes una cuenta? <a href="/register" className="text-blue-500">Registra una cuenta</a>
          </span>
        </form>
      </div>

      {/* Panel derecho */}
      <div className="flex flex-col items-center h-full w-full max-w-[750px] justify-center  pr-16 pt-[0vh]">
        <img
          src={Imagen1}
          alt="Imagen decorativa"
          className="w-full max-w-[750px] h-full rounded-[30px] object-contain"
        />
      </div>
    </div>
  );
};

export default Login;

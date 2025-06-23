import React from 'react';
import logo from '@/assets/1.3-Imagen-2.png';
import Imagen1 from '@/assets/1.3-Imagen-3.png';
import GooglePlayImage from '@/assets/1.3-GooglePlay.png';
import AppStoreImage from '@/assets/1.3-AppStore.png';
import { Link } from "react-router-dom";

const DownloadApp: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-stretch w-screen h-screen overflow-hidden">
            <div className="flex flex-col items-center justify-start w-[60%] h-full fixed top-20 bottom-0">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="w-[180px] h-[147px] -mt-4" />
                        <span className="ml-[1px] text-[90px] font-extrabold text-black font-montserrat leading-tight">HitchHop</span>
                    </Link>
                </div>
                <div className="flex flex-col items-left justify-center w-full mt-8 pl-40">
                    <h1 className="text-black text-[48px] font-bold mb-4 text-start">Descargue la app y comience a viajar</h1>
                    <p className="text-black text-[28px] text-left font-semibold">
                        Una app.
                    </p>
                    <p className="text-black text-[28px] text-left font-semibold">
                        Cero complicaciones.
                    </p>
                </div>
                <div className="flex flex-row items-center justify-start w-full mt-10 pl-40 gap-6">
                    <img src={GooglePlayImage} alt="Google Play" className="w-[317px] h-[94px]" />
                    <img src={AppStoreImage} alt="App Store" className="w-[317px] h-[94px]" />
                </div>
            </div>
            <div className="flex flex-col items-center justify-end w-[46%] h-full fixed right-0 top-5 bottom-50">
                <img src={Imagen1} alt="Imagen 1" className="mt-8" />
            </div>
        </div>
    );
};

export default DownloadApp;

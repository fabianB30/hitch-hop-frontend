import logo from "@/assets/logo.png";
import carImage from "@/assets/landing-car.png";

const Home = () => {
  return (
    <div className="w-[1440px] h-[960px] fixed bg-white overflow-hidden font-[Exo]">
      {/* Botones superior izquierda */}
      <div className="fixed top-[30px] left-[40px] flex gap-3">
        <button className="h-[40px] px-6 text-[16px] font-medium text-[#7875F8] border border-[#7875F8] rounded-md font-[Exo]">
          Iniciar sesión
        </button>
        <button className="h-[40px] px-6 text-[16px] font-medium text-white bg-[#7875F8] rounded-md font-[Exo]">
          Registrarse
        </button>
      </div>

      {/* Logo superior derecha */}
      <div className="fixed top-[15px] right-[50px] flex items-center gap-2">
        <img src={logo} alt="Logo HitchHop" className="w-[44px] h-auto" />
        <span className="text-[40px] font-extrabold text-[#171717]" style={{ fontFamily: "Montserrat, sans-serif" }}>
          HitchHop
        </span>
      </div>

      {/* Título */}
      <div
        className="fixed left-[110px] top-[245px] text-[60px] font-extrabold text-[#171717]"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        HitchHop
      </div>

      {/* Subtítulo */}
      <div className="fixed left-[110px] top-[340px] text-[#171717] text-[35px] font-medium leading-snug font-[Exo]">
        Viajes a un <br />
        salto de distancia
      </div>

      {/* Cuadro naranja */}
      <div className="fixed w-[200px] h-[200px] bg-[#FFAB00] rounded-[24px] left-[680px] top-[450px] z-10" />

      {/* Imagen del carro */}
      <img
        src={carImage}
        alt="Carro ilustración"
        className="fixed w-[690px] h-[650px] left-[700px] top-[50px] object-contain z-0"
      />
    </div>
  );
};

export default Home;

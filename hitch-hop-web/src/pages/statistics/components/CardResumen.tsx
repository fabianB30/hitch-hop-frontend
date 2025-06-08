type CardResumenProps = {
  titulo: string;
  valor: string;
  cambio: string;
};

const CardResumen = ({ titulo, valor, cambio }: CardResumenProps) => {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-4 w-full h-[125px]">
      <p className="text-sm font-semibold text-[#171717]">{titulo}</p>
      <p className="text-3xl font-bold text-[#171717] mt-1">{valor}</p>
      <p className="text-sm text-gray-500 mt-2">{cambio} del mes pasado</p>
    </div>
  );
};

export default CardResumen;

import Logo from '@/assets/1.1-Image-1-Logo.png';
import { Link } from "react-router-dom";

interface RegisterHeaderProps {
  step?: 1 | 2;
}

export default function RegisterHeader({ }: RegisterHeaderProps) {
  return (
    <div className="flex items-center justify-center">
      <Link to="/" className="flex items-center">
        <img
          src={Logo}
          alt="Logo"
          className="w-32 h-24 md:w-[211px] md:h-[155px] -mt-3 -mr-4 md:-mr-12"
        />
        <span
          className="text-3xl md:text-[50px] font-extrabold text-black leading-tight"
          style={{ fontFamily: 'Montserrat' }}
        >
          HitchHop
        </span>
      </Link>
    </div>

  );
}

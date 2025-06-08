import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function IndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('./home/Pasajero');
  }, [router]);

  return null;
}


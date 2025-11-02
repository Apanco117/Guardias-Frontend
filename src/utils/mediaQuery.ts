import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // Asegurarnos de que 'window' existe (evita errores en SSR)
        if (typeof window === 'undefined') {
            return;
        }

        const media = window.matchMedia(query);
        
        // Sincronizar el estado inicial
        if (media.matches !== matches) {
        setMatches(media.matches);
        }
        
        // Escuchar cambios
        const listener = () => {
        setMatches(media.matches);
        };

        // 'addEventListener' es el método moderno
        media.addEventListener('change', listener);
        
        // Limpieza al desmontar
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
};
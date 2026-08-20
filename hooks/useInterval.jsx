import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) { //callback: çalıştırılacak fonksiyon, delay: interval süresi(kaç ms bekleyece)
    const savedCallback = useRef(); //render olsa bile kaydeder 
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]); //en güncel callback çalışacak. 

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {//oyun durunca interval kurulmayacak dolayısıyla tetro da düşmez
            const id = setInterval(tick, delay); //interval kurulumu
            return () => {
                clearInterval(id); 
            };
        }
    }, [delay]);
}
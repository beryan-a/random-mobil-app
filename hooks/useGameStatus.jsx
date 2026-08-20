import { useState, useEffect, useCallback } from 'react';
const LINE_POINTS = [40, 100, 300, 1200]; //scoring sistemi: 1 satır 40, 2 satır 100, 3 satır 300, 4 satır 1200 puan

export const useGameStatus = rowsCleared => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    // const [level, setLevel] = useState(0);

    

    const calcScore = useCallback(() => { // useCallback ile fonksiyonun sadece  değişiklik old. reder yapmasını sağlıyoruz. Bu gereksiz render'ları önler.
        // We have score
        console.log("rowsCleared:", rowsCleared);
        if (rowsCleared > 0) {
            // This is how original Tetris score is calculated
            // veri güncelleme
            setScore(prev => prev + LINE_POINTS[rowsCleared - 1]);
            setRows(prev => prev + rowsCleared);
        }
    }, [LINE_POINTS, rowsCleared]);

    useEffect(() => { // bağımlılıklardan biri değişirse puanı tekrar hesaplar
        calcScore();
    }, [calcScore, rowsCleared, score]);

    return [score, setScore, rows, setRows];
};
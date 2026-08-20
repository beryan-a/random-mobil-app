import { useState, useEffect } from 'react';
import { createStage } from '@/helpers/gameHelpers';

//oyun boardını(alanını) yönetiyor.
export const useStage = (player, resetPlayer) => {

    //stage: oyunun boardını oluşturuyoruz
    const [stage, setStage] = useState(createStage());

    //score için silinen satırlar gerekli
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => { //board sürekli güncelleniyor.
        setRowsCleared(0);

        //dolu satırları temizlemek
        const sweepRows = newStage => //dolmuş satır kontrol ve satır silme
            newStage.reduce((ack, row) => { //ack: accumulator, row: currentValue
                if (row.findIndex(cell => cell[0] === 0) === -1) { //satır full doluysa findIndex -1 döndürecek
                    
                    console.log("ROW CLEARED");

                    setRowsCleared(prev => prev + 1); //score u arttırmak için silinen satır sayısını arttırıp güncelliyoruz.

                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear'])); //yeni satır oluşturup en başa ekliyoruz.
                    return ack;
                }
                ack.push(row); //satır dolu değilse olduğu gibi ekliyoruz.
                return ack;
            }, []);



        //hareket eden talı silmek
        const updateStage = prevStage => { //prevStage: mevcut stage duruu
            // her block hareketinde stage güncelleniyor.
            // First flush the stage
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)) //hareket eden taşı ilerletmek için önce stage temizleniyor. clear olanlar temizleniyor, merged olanlar kalıyor. 
            );

            // tetrominoyu çiziyoruz 
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) { //boş değilse ex: 0 değil T
                        //tetromino içindeki kordinatlar stagee uygulanıyor.
                        const yPos = y + player.pos.y; 
                        const xPos = x + player.pos.x;

                        if (yPos >= 0 && yPos < newStage.length && xPos >= 0 && xPos < newStage[0].length) { //ekran dışına çıkmaması için kontroller
                            newStage[yPos][xPos] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,  //çizim(çarpışma varsa merged, yoksa clear)
                            ];
                        }
                    }
                });
            });
            // 
            if (player.collided) { //çarpışma olunca resetplayer ile yeni termomino oluşturuyoruz
                resetPlayer();
                return sweepRows(newStage); 
            }
            return newStage; //hareket eden bloklardan temizlenmiş durumda newStage
        };

        // Here are the updates
        setStage(prev => updateStage(prev));
    }, [
        player.collided,
        player.pos.x,
        player.pos.y,
        player.tetromino,
        resetPlayer,
    ]);

    return [stage, setStage, rowsCleared];
};


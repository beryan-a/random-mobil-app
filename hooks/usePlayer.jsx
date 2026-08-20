import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '@/helpers/tetrominos';
import { STAGE_WIDTH, checkCollision } from '@/helpers/gameHelpers';


//player ile ilgili her şeyi bu hookta kontrol ediyorz.

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        //başlangıç durumu
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    //for next piece preview
    const [nextTetromino, setNextTetromino] =
    useState(randomTetromino());


    // rotate , sadec matrisi döndürecek matematiksel olarak oyuncu ile hiç bir alakası yok.
    function rotate(matrix, dir) { //dir = direction (1-clockwise, -1-counter clockwise)
        const mtrx = [];
        // Transpose
        for (let i = 0; i < matrix.length; i++) {
            mtrx[i] = [];
            for (let j = 0; j < matrix.length; j++) {
                mtrx[i][j] = matrix[j][i];
            }
        }
        // clockwise
        if (dir > 0) {
            for (let i = 0; i < mtrx.length; i++) {
                mtrx[i].reverse();
            }
            return mtrx;
        }
        // counter clockwise
        mtrx.reverse();
        return mtrx;
    }

    /**function rotate(matrix, dir) { //dir = direction (1-clockwise, -1-counter clockwise)
        //(transpose) col<=>row
        const mtrx = matrix.map((_, index) => matrix.map(column => column[index])); // (_, index) == (item,index) sadece item değişknei kullanılmadığı için _(başka bir şey de yazılabilir)
        // Reverse each row to get a rotaded matrix
        if (dir > 0) {
            return mtrx.map(row => row.reverse());
        }
            
        return mtrx.reverse();
    }*/

    //rotates player in
    function playerRotate(stage, dir) {
        const clonedPlayer = JSON.parse(JSON.stringify(player)); // JSON: stringify: objecti stringe çevirir. parse: stringi objecte çevirir. (deep clone)
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x; //ilk halini kaydet (duvara çarpınca geri dönmek için)

        let offset = 1; //ilk denenecek kaydırma imkanı (dödürürken duvara çarparsa sağdan veya soldan kaydırmak için)
        while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) { 
            clonedPlayer.pos.x += offset;
            //collision varsa başka kaydırma denenecek
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos; //eski x e geri 
                return;
            }
        }

        //eğer çarpışma olmaza normal olarak rotate olan clonedPlayer playerı set ediyoruz.
        setPlayer(clonedPlayer);
    }

    const updatePlayerPos = ({ x, y, collided }) => { // Destructuring: bir objnin içindeki değerleri değişkenlere atama. (eski object aynen kalır)
        setPlayer(prev => ({ //prev: önceki playerın durumunu alırız ve ye
        ...prev, // butun alanları kopyalar.
        pos: {
            x: prev.pos.x + x,
            y: prev.pos.y + y,
        },
        collided, // collided: collided, ile aynı. çünkü key ve value aynı isimde.(js te Eğer parametre adı ile object içindeki anahtar aynıysa kısa yazabilirm.)
        }));
    };

    const resetPlayer = useCallback(() => { //yeni oyuncu oluşturma (start ve taş yere basınca)

        const currentTetromino = nextTetromino; //next piece

        //useCallback: Bu fonksiyonu tekrar tekrar oluşturmamak için.
        setPlayer({
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 }, // -2 yi, centerda ortalansın diye ekledik.
        tetromino: currentTetromino.shape,
        collided: false,
        });

        setNextTetromino(randomTetromino()); //generate random next piece

    }, [nextTetromino]);

    return [player, updatePlayerPos, resetPlayer, playerRotate, nextTetromino];
};
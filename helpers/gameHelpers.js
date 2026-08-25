export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => { //boş stage oluşturuyoruz
    return Array.from({ length: STAGE_HEIGHT }, () =>
        Array.from({ length: STAGE_WIDTH }, () => [0, 'clear'])
    ); //0:block tipi, clear: block tipi, clear mi merged mi --clear: şimdi düşmekte olan --merged: sabitlenmiş
};

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {

    // Return ve break için for kullandım. forEach ile olmaz bu.
    for (let y = 0; y < player.tetromino.length; y++) { // traverse rows
        for (let x = 0; x < player.tetromino[y].length; x++) { //traverse cells in rows
            // 1. Check that we're on an actual Tetromino cell
            if (player.tetromino[y][x] !== 0) {
                if (
                    !stage[y + player.pos.y + moveY] || //oyunucu aşağı inerse o satır var mı yoksa çarpışma var tabanla

                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] || //  col kontrolu , duvarlara çarpar mı

                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear' // başka bir tetroya çarpar mı merged olan bir blocka
                ) {
                    return true;
                }
            }
        }
    }
    // çarpışma tesit edilmez ise
    return false;
};
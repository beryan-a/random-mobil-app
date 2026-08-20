import { checkCollision } from "@/helpers/gameHelpers";

export const useGameMovement = (
    player,
    stage,
    updatePlayerPos,
    playerRotate,
    setGameOver,
    setDropTime,
    gameOver,
    speed
) => {

    const movePlayer = dir => {//dir = direction (left or right)
    // checkcollision, duvar veya block var mı ?
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    };

    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({
                x: 0,
                y: 1,
                collided: false
            });
        } else {
            //Game Over!
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }

            updatePlayerPos({
                x: 0,
                y: 0,
                collided: true
            });
        }
    };

    const dropPlayer = () => {
        // We don't need to run the interval when we use the arrow down to
        // move the tetromino downwards. So deactivate it for now.
        setDropTime(null);
        drop();
    };

    const move = ({ keyCode }) => {
        if (keyCode === 37) {
            movePlayer(-1); //left (x + (-1))
        } else if (keyCode === 39) {
            movePlayer(1);//right (x + 1)
        } else if (keyCode === 40) {
            dropPlayer();//down (for faster drop) (?/ y + (-1))
        } else if (keyCode === 38) {
            playerRotate(stage, 1);// rotate (clockwise) (up arrow)
        }
    };

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
          // Activate the interval again when user releases down arrow.
          if (keyCode === 40) {
            setDropTime(speed);  // 1sn/level + 1(current level) = drop time. The higher the level, the faster the drop time. //speed set up from slider
          }
        }
    };
    
    return {move, drop, dropPlayer, keyUp };
};
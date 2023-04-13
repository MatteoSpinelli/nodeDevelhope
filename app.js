function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }

async function agetResults(){
    try{
        for (player of ["Tina", "Jorge", "Julien"]){
            const res = await luckyDraw(player)
            console.log(res)
        }

    } catch (err){
        console.error(err)
    }
}
agetResults()
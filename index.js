let haslo = [...hasla]
    .sort(() => Math.random() - 0.5)
    .splice(0, 25);

let container = document.querySelector('.container');

function createTile(index) {
    let tile = document.createElement('div');
    if (index != 12) {
        tile.addEventListener('click', checkTile);
        tile.innerText = haslo[index];
    } else {
        tile.classList.add('checked');
        tile.innerText = 'Free space';
    }
    tile.classList.add('tile');
    container.appendChild(tile);
}

function checkTile(e) {
    let tile = e.target;
    console.log(tile);
    if (tile.classList.contains('checked')){
        tile.classList.remove('checked');
    } else{
        tile.classList.add('checked');
    }
}

for (let index = 0; index < 25; index++) {
    createTile(index);
}
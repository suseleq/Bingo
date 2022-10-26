let keyword = [];

const tilesContainer = document.querySelector('.tiles-container');
const rerollButton = document.querySelector('.reroll-button');

rerollButton.addEventListener('click', () =>{
    localStorage.setItem('checked', JSON.stringify([]));
    createBingo();
    let tiles = tilesContainer.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        tile.innerText = keyword[index];
        tile.classList.remove('checked');
    });
});

function startBingo() {
    for (let index = 0; index < 25; index++) {
        createTile(index);
    }
    if(!localStorage.getItem('keywords')) {
        createBingo();
    } else {
        keyword = JSON.parse(localStorage.getItem('keywords'));
        if (!!localStorage.getItem('checked')) {
            let tiles = tilesContainer.querySelectorAll('.tile');
            let checked = JSON.parse(localStorage.getItem('checked'));
            for (let index = 0; index < checked.length; index++) {
                tiles[parseInt(checked[index])].classList.add('checked');
            }
        }
    }
    showKeywords();
}


function showKeywords() {
    let tiles = tilesContainer.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        tile.classList.add(index);
        tile.innerText = keyword[index];
    });
}


function createBingo() {
    keyword = [...keywords]
        .sort(() => Math.random() - 0.5)
        .splice(0, 25);
    localStorage.setItem('keywords', JSON.stringify(keyword))
} 

function createTile(index) {
    let tile = document.createElement('div');
    if (index != 12) {
        tile.addEventListener('click', checkTile);
        tile.classList.add('tile');
    } else {
        tile.classList.add('free-space');
        tile.innerText = 'Free space';
    }
    tilesContainer.appendChild(tile);
}

function checkTile(e) {
    let tile = e.target;
    if (tile.classList.contains('checked')){
        tile.classList.remove('checked');
        removeCheckedKeyword(tile.classList[1]);
    } else{
        tile.classList.add('checked');
        saveCheckedKeywords(tile.classList[1]);
    }
}

function checkKeywords(){
    if(!localStorage.getItem('keywords')){
        return checkedTodos = [];
    }else{
        return checkedTodos = JSON.parse(localStorage.getItem('keywords'));
    }
}

function checkCheckedKeywords(){
    if(!localStorage.getItem('checked')){
        return checkedTodos = [];
    }else{
        return checkedTodos = JSON.parse(localStorage.getItem('checked'));
    }
}

function saveCheckedKeywords(index) {
    let checkedKeywords = checkCheckedKeywords();
    checkedKeywords.push(index);
    localStorage.setItem('checked', JSON.stringify(checkedKeywords))
}

function removeCheckedKeyword(index){
    let checkedKeywords = checkCheckedKeywords();
    let indexOfTile = checkedKeywords.indexOf(index);
    checkedKeywords.splice(indexOfTile, 1);
    localStorage.setItem('checked', JSON.stringify(checkedKeywords));
}

startBingo();

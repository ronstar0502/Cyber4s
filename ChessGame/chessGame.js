// let selectedCell;
let selectedPiece;
let myTable;
//let dataBoard;
let gameLogic;
let isWinner;

function addImg(cell,color,name){
    const image =document.createElement('img');
    image.src ='images/'+color+'/'+name+'.png';
    image.id=name;
    cell.appendChild(image);
}

function showPieceMovements(row,col){
    selectedPiece=gameLogic.dataBoard.getPiece(row,col);
    for (let i = 0; i < 8; i++) { //removing all the css classess form possible moves
        for (let j = 0; j < 8; j++) {
          myTable.rows[i].cells[j].classList.remove('movement');
          myTable.rows[i].cells[j].classList.remove('enemyPointer');
          myTable.rows[i].cells[j].classList.remove('selected'); 
        }
    }
        const piece = gameLogic.dataBoard.getPiece(row, col);
    for (let piece of gameLogic.dataBoard.pieces) {
        if (piece.row === row && piece.col === col) {
            let possibleMoves = selectedPiece.getPossibleMovements(gameLogic.dataBoard);
            for (let possibleMove of possibleMoves){
                const currentMove=gameLogic.dataBoard.getPiece(possibleMove[0],possibleMove[1]); //checking for enemy or undefined player cell
                if(currentMove!=undefined&&currentMove.color != selectedPiece.color){
                    myTable.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('enemyPointer');
                }else{
                    myTable.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('movement');  
                }
            }
        }
    }
    
    myTable.rows[row].cells[col].classList.add('selected'); //adding css class from selected piece
    console.log(selectedPiece);
    selectedPiece=piece;
}

function onClick(row,col) {
    if(selectedPiece==undefined){
        showPieceMovements(row,col);
    }else{
        if(gameLogic.tryMove(selectedPiece,row,col)){
            selectedPiece=undefined;  
            createChessBoard(gameLogic.dataBoard);
        }else{
            showPieceMovements(row,col);
        }
    }
}

function initialGame(){
    gameLogic=new Game('white');
    createChessBoard(gameLogic.dataBoard)
}

function announceWinner(){
    const myDiv =document.createElement('div');
    let winnerUC =gameLogic.winner.charAt(0).toUpperCase()+gameLogic.winner.slice(1);
    myDiv.textContent = winnerUC +" is the Winner!";
    myDiv.classList.add('winnerAnnouncer');
    myTable.appendChild(myDiv);
}

function createChessBoard(dataBoard){
    if(myTable!=null){ //updating the board with new board after an action has accured
        myTable.remove();
    }
    // Creating elements
    const myBody= document.querySelector("body");
    myTable = document.createElement('table');
    // Adding classes
    myTable.className = 'chess-board';
    // Adding elements to the DOM
    myBody.appendChild(myTable);                
    for(let i=0;i<8;i++){
        const myTr=myTable.insertRow();
        for(let j=0;j<8;j++){
            const myTd=myTr.insertCell();
            myTd.id = "cell-" + i.toString() + "_" + j.toString();
            if((i+j)%2==0){
             myTd.classList.add('light');
            }else{
                myTd.classList.add('dark');
            }  
            myTd.addEventListener('click',()=>onClick(i,j));     
        }
    }
    for (let piece of dataBoard.pieces) {
        const cell = myTable.rows[piece.row].cells[piece.col];
        addImg(cell, piece.color, piece.name);
    }
    if(gameLogic.winner!==undefined){
        announceWinner();
        setTimeout(initialGame,4000); //reseting the game automaticly after 3 seconds of a win
    }
}
window.addEventListener('load' , initialGame);




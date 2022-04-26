// let selectedCell;
let selectedPiece;
let myTable;
let dataBoard;

function showPieceMovements(row,col){
    selectedPiece=dataBoard.getPiece(row,col);
    for (let i = 0; i < 8; i++) { //removing all the css classess form possible moves
        for (let j = 0; j < 8; j++) {
          myTable.rows[i].cells[j].classList.remove('movement');
          myTable.rows[i].cells[j].classList.remove('enemyPointer');
          myTable.rows[i].cells[j].classList.remove('selected'); 
        }
    }
    for (let piece of dataBoard.pieces) {
        if (piece.row === row && piece.col === col) {
          let possibleMoves = selectedPiece.getPossibleMovements(dataBoard);
          for (let possibleMove of possibleMoves){
              const currentMove=dataBoard.getPiece(possibleMove[0],possibleMove[1]); //checking for enemy or undefined player cell
              if(currentMove&&currentMove.color != selectedPiece.color){
                myTable.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('enemyPointer');
              }else{
                myTable.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('movement');  
              }
          }
        }
    }
    myTable.rows[row].cells[col].classList.add('selected'); //adding css class from selected piece
    console.log(selectedPiece);
    selectedPiece=currentMove;
}

function tryMove(piece , row , col){
    const possibleMoves = piece.getPossibleMovements(dataBoard);
    for(const possibleMove of possibleMoves){
        if(possibleMove[0]==row && possibleMove[1]==col){ // checks if its a legal move
            dataBoard.removePiece(row,col); // removes the current piece from the location piece
            piece.row=row; // moves the piece to the targeted cell
            piece.col=col;
            return true;
        }
    }
    return false;
}

function onClick(event,row,col) {
    if(selectedPiece==undefined){
        showPieceMovements(row,col);
    }else{
        if(tryMove(selectedPiece,row,col)){
            selectedPiece=undefined;
            createChessBoard(dataBoard);
        }else{
            showPieceMovements(row,col);
        }
    }
}

function initialGame(){
    dataBoard=new boardData(InitialBoard());
    createChessBoard(dataBoard);
}

function InitialBoard() {
    let result = [];
    for(let colu=0;colu<8;colu++){
        result.push(new Piece(1,colu,'black','pawn'));
        result.push(new Piece(6,colu,'white','pawn'));
    }    
    result.push(new Piece(0,0,'black','rook'));
    result.push(new Piece(0,7,'black','rook'));
    result.push(new Piece(7,0,'white','rook'));
    result.push(new Piece(7,7,'white','rook'));    
    result.push(new Piece(0,1,'black','knight'));
    result.push(new Piece(0,6,'black','knight'));
    result.push(new Piece(7,1,'white','knight'));
    result.push(new Piece(7,6,'white','knight'));       
    result.push(new Piece(0,2,'black','bishop'));
    result.push(new Piece(0,5,'black','bishop'));
    result.push(new Piece(7,2,'white','bishop'));
    result.push(new Piece(7,5,'white','bishop'));       
    result.push(new Piece(0,4,'black','king'));
    result.push(new Piece(7,4,'white','king'));
    result.push(new Piece(0,3,'black','queen'));
    result.push(new Piece(7,3,'white','queen'));
    return result;
}
  

function createChessBoard(dataBoard){
    if(myTable!=null){ //updating the board with new board after an action has accured
        myTable.remove();
    }
    // Creating elements
    const body = document.querySelector("body");
    myTable = document.createElement('table');
    // Adding classes
    myTable.className = 'chess-board';
    // Adding elements to the DOM
    body.appendChild(myTable);                
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
            myTd.addEventListener('click',(event)=>onClick(event,i,j));     
        }
    }
    for (let piece of dataBoard.pieces) {
        const cell = myTable.rows[piece.row].cells[piece.col];
        addImg(cell, piece.color, piece.name);
      }
}
window.addEventListener('load' , initialGame);

function addImg(cell,color,name){
    const image =document.createElement('img');
    image.src ='images/'+color+'/'+name+'.png';
    image.id=name;
    cell.appendChild(image);
}
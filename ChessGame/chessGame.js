let selectedCell;
let myTable;
let dataBoard;

function onClick(event,row,col) {
    let selectedPiece=dataBoard.getPiece(row,col);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          myTable.rows[i].cells[j].classList.remove('movement');
          myTable.rows[i].cells[j].classList.remove('enemyPointer'); 
        }
    }
    for (let piece of dataBoard.pieces) {
        if (piece.row === row && piece.col === col) {
          let possibleMoves = piece.getPossibleMovements();
          for (let possibleMove of possibleMoves){
              let currentMove=dataBoard.getPiece(possibleMove[0],possibleMove[1]); //checking for enemy or undefined player cell
              if(currentMove&&currentMove.color != selectedPiece.color){
                myTable.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('enemyPointer');
              }else{
                myTable.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('movement');  
              }
          }
        }
    }

    if (selectedCell != undefined) {
      selectedCell.classList.remove('selected');
    }
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');
    console.log(selectedCell);
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
  

function createChessBoard(){
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
    //boardPieces=InitialBoard();
    dataBoard=new boardData(InitialBoard());
    console.log(dataBoard.pieces);


}
window.addEventListener('load' , createChessBoard);

class Piece{
    constructor(row,col,color,name){
        this.row=row;
        this.col=col;
        this.color=color;
        this.name=name;
        this.addImg();
    }
    addImg(){
        const image =document.createElement('img');
        image.src ='images/'+this.color+'/'+this.name+'.png';
        image.id=this.name;
        document.getElementById( "cell-" + this.row.toString() + "_" + this.col.toString()).appendChild(image);
    }
    getPossibleMovements(){
        let movements=[];
        if(this.name=='pawn'){
            movements=this.pawnMovement();   
        }else if(this.name=='rook'){
            movements=this.rookMovement();
        }else if(this.name=='knight'){
            movements=this.knightMovement();
        }else if(this.name=='bishop'){
            movements=this.bishopMovement();
        }else if(this.name=='king'){
            movements=this.kingMovement();
        }else if(this.name=='queen'){
            movements=this.queenMovement();
        }else{
            console.log("Unknown Type");
        }
        console.log('movements',movements);

        let absoluteMoves = []; // getting all the absolute moves of a player
        for (let move of movements) {
        //const absoluteRow = this.row + move[0];
        //const absoluteCol = this.col + move[1];
        absoluteMoves.push([this.row + move[0],this.col + move[1]]);
        }
        console.log('absoluteMoves', absoluteMoves);

        let filteredMoves = [];  //filtering if a move is beyond the border bounds
        for (let absoluteMove of absoluteMoves) {
            //const filteredRow = absoluteMove[0];
            //const filteredCol = absoluteMove[1];
            if (absoluteMove[0] >= 0 && absoluteMove[0] <= 7 && absoluteMove[1] >= 0 && absoluteMove[1] <= 7){
               filteredMoves.push(absoluteMove);
            }
        }
        console.log('filteredMoves', filteredMoves);
        return filteredMoves;
    }
    pawnMovement(){
        let moveList=[];
        if(this.color=='black'){
            moveList.push([1,0]);
            if(this.row==1){
                moveList.push([2,0]);
            }
        }
        if(this.color=='white'){
            moveList.push([-1,0]);
            if(this.row==6){
                moveList.push([-2,0]);
            }
        }
        return moveList;  
    }
    rookMovement(){
        let moveList=[];
        for (let i = 1; i < 8; i++) {
            moveList.push([i, 0]);
            moveList.push([-i, 0]);
            moveList.push([0, i]);
            moveList.push([0, -i]);
        }
        return moveList;
    }
    knightMovement(){
        let moveList=[];
        moveList.push([2,1]);
        moveList.push([2,-1]);
        moveList.push([1,2]);
        moveList.push([-1,2]);
        moveList.push([-2,1]);
        moveList.push([-2,-1]);
        moveList.push([1,-2]);
        moveList.push([-1,-2]);
        return moveList;   
    }
    bishopMovement(){
        let moveList=[]
        for(let i=1;i<8;i++){
                moveList.push([i,i]);
                moveList.push([i,-i]);           
                moveList.push([-i,i]);
                moveList.push([-i,-i]);    
        }
        return moveList;
    }
    kingMovement(){
        let moveList=[];
        moveList.push([1,0]);
        moveList.push([1,1]);
        moveList.push([1,-1]);
        moveList.push([0,1]);
        moveList.push([0,-1]);
        moveList.push([-1,1]);
        moveList.push([-1,0]);
        moveList.push([-1,-1]);
        return moveList;    
    }
    queenMovement(){
        let moveList=[];
        for(let i=1;i<8;i++){
            moveList.push([i,i]);
            moveList.push([i,-i]);
            moveList.push([-i,i]);
            moveList.push([-i,-i]);
            moveList.push([i, 0]);
            moveList.push([-i, 0]);
            moveList.push([0, i]);
            moveList.push([0, -i]);
        }
        return moveList;   
    }
}

class boardData{
    constructor(pieces){
        this.pieces=pieces;
    }
    getPiece(row,col){
        let gPiece;
        for(let piece of this.pieces){
            if(piece.row==row&&piece.col==col){
                gPiece=piece;
            }
        }
        return gPiece;
    }
    checkCell(pieces,row,col){
        for(let piece of pieces){
            if(piece.row==row && piece.col==col){
                return piece;
            }
        }
        return undefined;
    }
}
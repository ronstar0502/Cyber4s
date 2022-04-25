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

    if (selectedPiece != undefined) {  //removing css class from selected piece
        selectedPiece.classList.remove('selected');
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

class Piece{
    constructor(row,col,color,name){
        this.row=row;
        this.col=col;
        this.color=color;
        this.name=name;

    }

    getMoveInDirection(directionRow,directionCol,boardData){
        let moveList=[];
        let piece,position;
        for(let i=1; i<8;i++){
            let row=this.row+directionRow*i;
            let col=this.col+directionCol*i;
            position=[row,col];
            piece=boardData.getPiece(row,col);
            if(piece==undefined){
                moveList.push(position);
            } 
            if(piece!=undefined&&this.color!=piece.color){
                moveList.push(position);
                return moveList;
            }
            if(piece!=undefined&&this.color==piece.color){
                return moveList;
            }
        }
        return  moveList;
    }
    getPossibleMovements(boardData){
        let movements=[];
        if(this.name=='pawn'){
            movements=this.pawnMovement(boardData);   
        }else if(this.name=='rook'){
            movements=this.rookMovement(boardData);
        }else if(this.name=='knight'){
            movements=this.knightMovement(boardData);
        }else if(this.name=='bishop'){
            movements=this.bishopMovement(boardData);
        }else if(this.name=='king'){
            movements=this.kingMovement(boardData);
        }else if(this.name=='queen'){
            movements=this.queenMovement(boardData);
        }else{
            console.log("Unknown Type");
        }
        console.log('movements',movements);

        // let absoluteMoves = []; // getting all the absolute moves of a player 
        // for (let move of movements) {
        // //const absoluteRow = this.row + move[0];
        // //const absoluteCol = this.col + move[1];
        // absoluteMoves.push([this.row + move[0],this.col + move[1]]);
        // }
        // console.log('absoluteMoves', absoluteMoves);

        let filteredMoves = [];  //filtering if a move is beyond the border bounds
        for (let absoluteMove of movements) {
            //const filteredRow = absoluteMove[0];
            //const filteredCol = absoluteMove[1];
            if (absoluteMove[0] >= 0 && absoluteMove[0] <= 7 && absoluteMove[1] >= 0 && absoluteMove[1] <= 7){
               filteredMoves.push(absoluteMove);
            }
        }
        console.log('filteredMoves', filteredMoves);
        return filteredMoves;
    }
    pawnMovement(boardData){
        let moveList=[];
        let direction=1
        let row,col;
        let position;
        let piece;
        if(this.color=='white'){
             if(this.row==6){
                 row=this.row-2;
                 piece=boardData.getPiece(row,this.col);
                 if(piece==undefined){
                    moveList.push([row,this.col]);
                 }
             }
             direction=-1;
         }
        if(this.color=='black'){
            if(this.row==1){
                row=this.row+2;
                piece=boardData.getPiece(row,this.col);
                 if(piece==undefined){
                    moveList.push([row,this.col]);
                }
            }
        }
        row=this.row+direction;
        position = [row,this.col]
        piece=boardData.getPiece(position[0],position[1]);
        if(piece==undefined){ //empty cell
            moveList.push(position);
        }
        // can eat an opponent
        col=this.col+1;
        position=[row,col];
        piece=boardData.getPiece(position[0],position[1]);
        if(piece!=undefined&&piece.color!=this.color){ 
            moveList.push(position);
        }
        col=this.col-1;
        position=[row,col];
        piece=boardData.getPiece(position[0],position[1]);
        if(piece!=undefined&&piece.color!=this.color){
            moveList.push(position);
        }
        return moveList;  
    }
    rookMovement(boardData){
        let moveList=[];
        //let position;
        moveList=moveList.concat(this.getMoveInDirection(1,0,boardData));
        moveList=moveList.concat(this.getMoveInDirection(-1,0,boardData));
        moveList=moveList.concat(this.getMoveInDirection(0,1,boardData));
        moveList=moveList.concat(this.getMoveInDirection(0,-1,boardData));
        return moveList;
    }
    knightMovement(boardData){
        let moveList=[];
        let piece,row,col,position;
        let relativeMoves=[[2,1],[2,-1],[1,2],[-1,2],[-2,+1],[-2,-1],[1,-2],[-1,-2]];
        for(let move of relativeMoves){
            row=this.row+move[0];
            col=this.col+move[1];
            position=[row,col];
            piece =boardData.getPiece(row,col);
            if(piece!=undefined&&piece.color!=this.color){
                moveList.push(position);
            }
            if(piece==undefined){
                moveList.push(position);
            }
        }
        return moveList;   
    }
    bishopMovement(boardData){
        let moveList=[];
        moveList=moveList.concat(this.getMoveInDirection(1,1,boardData));
        moveList=moveList.concat(this.getMoveInDirection(1,-1,boardData));
        moveList=moveList.concat(this.getMoveInDirection(-1,1,boardData));
        moveList=moveList.concat(this.getMoveInDirection(-1,-1,boardData));
        return moveList;
    }
    kingMovement(boardData){
        let moveList=[];
        const relativeMoves =[[1,0],[1,1],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]];
        let piece,position;
        for(let move of relativeMoves){
            let row=this.row+move[0];
            let col=this.col+move[1];
            position=[row,col];
            piece=boardData.getPiece(row,col);
            if(piece!=undefined&&piece.color!=this.color){
                moveList.push(position);
            }
            if(piece==undefined){
                moveList.push(position);
            }
        }
        return moveList;    
    }
    queenMovement(boardData){
        let moveList=this.bishopMovement(boardData);
        moveList=moveList.concat(this.rookMovement(boardData));
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
    removePiece(row,col){
        for(let i=0;i<this.pieces.length;i++){
            if(this.pieces[i].row==row&&this.pieces[i].col==col){
                this.pieces.splice(i,1);
            }
        }
    }
}
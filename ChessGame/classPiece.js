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

        let filteredMoves = [];  //filtering if a move is beyond the border bounds
        for (let absoluteMove of movements) {
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
             direction=-1;
        }

        row=this.row+direction*2;  // this section checks if a pawn can make the 2 steps move 
        position=[row,this.col];
        piece=boardData.getPiece(this.row+direction,this.col);
        if(piece==undefined){
            piece=boardData.getPiece(position[0],position[1]);
            if(piece==undefined && (this.row==6 || this.row==1)){
                moveList.push(position);
            }
        }

        row=this.row+direction; //this section if the pawn can make the 1 step move
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
class Game{
    constructor(currentPlayer){ 
        this.dataBoard=new boardData();
        this.currentPlayer=currentPlayer;
        this.winner=undefined;
    }
    getOppositePlayer(color){
        if(color=='white'){
            return 'black'
        }
        return 'white';
    }



    tryMove(piece , row , col){
        const possibleMoves = this.getCurrentPossibleMoves(piece);
        //const targetedPiece =this.dataBoard.getPiece(row,col);
        for(const possibleMove of possibleMoves){
            if(possibleMove[0]==row && possibleMove[1]==col){ // checks if its a legal move
                const removedPiece=this.dataBoard.removePiece(row,col); // removes the current piece from the location piece
                console.log(removedPiece);
                piece.row=row; // moves the piece to the targeted cell
                piece.col=col;
                if (removedPiece !== undefined && removedPiece.name === 'king') {
                    this.winner = piece.color;
                    console.log(this.winner);
                }
                this.currentPlayer=this.getOppositePlayer(piece.color);
                return true;
            }
        }  
        return false;
    }
    getCurrentPossibleMoves(piece){
        if(this.currentPlayer!=piece.color){
            return [];
        }
        return piece.getPossibleMovements(this.dataBoard);
    }
}
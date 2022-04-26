class Game{
    constructor(currentPlayer){ 
        this.dataBoard=new boardData();
        this.currentPlayer=currentPlayer;
    }
    getOppositePlayer(color){
        if(color=='white'){
            return 'black'
        }
        return 'white';
    }

    tryMove(piece , row , col){
        const possibleMoves = this.getCurrentPossibleMoves(piece);
        for(const possibleMove of possibleMoves){
            if(possibleMove[0]==row && possibleMove[1]==col){ // checks if its a legal move
                this.dataBoard.removePiece(row,col); // removes the current piece from the location piece
                piece.row=row; // moves the piece to the targeted cell
                piece.col=col;
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
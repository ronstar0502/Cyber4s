class boardData{
    constructor(){
        this.pieces=this.InitialBoard();
    }
    InitialBoard() {
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
                return this.pieces[i];
            }
        }
        
    }
}
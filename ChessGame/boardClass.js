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
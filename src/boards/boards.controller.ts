import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}

    @Get('/')
    getAllBoards(): Board[] {
        return this.boardsService.getAllboards();
    }

    @Post('/')
    createBoard(@Body() createBoardDto:CreateBoardDto): Board{
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board{
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void{
         this.boardsService.delete(id);
    }

    @Patch('/:id/status')
    updateBoard(@Param('id') id: string,@Body('status',BoardStatusValidationPipe) status: BoardStatus){
        return this.boardsService.update(id, status);
    }
}

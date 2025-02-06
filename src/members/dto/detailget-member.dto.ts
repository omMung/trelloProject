import {IsNotEmpty , IsNumber} from 'class-validator'

export class DetailGetMemberDto {
    @IsNotEmpty()  
    @IsNumber()
    boardId: number;
}


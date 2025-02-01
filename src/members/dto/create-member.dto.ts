import {IsNotEmpty , IsNumber} from 'class-validator'

export class CreateMemberDto {

    @IsNotEmpty()
    @IsNumber()
    userId: number


    @IsNotEmpty()
    @IsNumber()
    boardId: number

}

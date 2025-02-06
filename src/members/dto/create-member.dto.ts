import {IsNotEmpty , IsNumber} from 'class-validator'

export class CreateMemberDto {

    @IsNotEmpty()
    @IsNumber()
    boardId: number

    @IsNotEmpty()
    @IsNumber()
    userId: number

}

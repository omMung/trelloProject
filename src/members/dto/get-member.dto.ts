import {IsNotEmpty , IsNumber} from 'class-validator'

export class GetMemberDto {

    @IsNotEmpty()
    @IsNumber()
    boardId: number

    @IsNotEmpty()
    @IsNumber()
    userId: number

}

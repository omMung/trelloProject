import {IsNotEmpty , IsNumber} from 'class-validator'

export class DeleteMemberDto {

    @IsNotEmpty()
    @IsNumber()
    boardId: number

}

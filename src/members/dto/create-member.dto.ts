import {IsNotEmpty , IsString} from 'class-validator'

export class CreateMemberDto {

    @IsNotEmpty()
    @IsString()
    userId: number


    @IsNotEmpty()
    @IsString()
    boardId: number

}

import {IsNotEmpty , IsString} from 'class-validator'

export class GetMemberDto {

    @IsNotEmpty()
    @IsString()
    boardId: number

}

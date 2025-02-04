import { PartialType } from '@nestjs/mapped-types';
import {IsNotEmpty , IsNumber} from 'class-validator'

export class CreateMemberDto {

    @IsNotEmpty()
    @IsNumber()
    boardId: number

}

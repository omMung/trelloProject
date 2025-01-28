import {IsEnum ,IsString , IsNotEmpty } from 'class-validator'
import { visibEnum } from './visibility.enum'

export class CreateBoardDto {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsEnum(visibEnum)
    visibility: visibEnum


    @IsNotEmpty()
    @IsString()
    color: string

}

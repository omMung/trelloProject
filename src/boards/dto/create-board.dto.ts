import {IsEnum ,IsString , IsNotEmpty, IsNumber } from 'class-validator'
import { visibEnum } from './visibility.enum'

export class CreateBoardDto {

    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsString()
    title: string

    @IsEnum(visibEnum)
    visibility: visibEnum


    @IsNotEmpty()
    @IsString()
    color: string

}

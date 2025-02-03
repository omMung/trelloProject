import {IsNotEmpty , IsEnum , IsString} from 'class-validator'
import {visibEnum} from './visibility.enum'

export class UpdateBoardDto {

    
    @IsString()
    title: string

    @IsEnum(visibEnum)
    visibility: visibEnum

    @IsString()
    color: string
}

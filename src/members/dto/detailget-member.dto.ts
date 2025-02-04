import { PartialType } from '@nestjs/mapped-types';
import {CreateMemberDto} from './create-member.dto'
import {IsNotEmpty , IsNumber} from 'class-validator'

export class DetailGetMemberDto extends PartialType(CreateMemberDto) {}


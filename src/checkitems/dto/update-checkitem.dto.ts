import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckitemDto } from './create-checkitem.dto';

export class UpdateCheckitemDto extends PartialType(CreateCheckitemDto) {}

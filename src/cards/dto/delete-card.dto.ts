import { FindCardDto } from './find-card.dto';
import { PartialType } from '@nestjs/mapped-types';

export class DeleteCardDto extends PartialType(FindCardDto) {}

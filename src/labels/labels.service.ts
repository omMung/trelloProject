import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Repository } from 'typeorm';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}

  async create(userId: number, title: string, color: string, boardId: number) {
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
      throw new BadRequestException('유효한 색상 코드(#RRGGBB)를 입력하세요.');
    }
    const label = this.labelRepository.create({ title, color, boardId });
    return await this.labelRepository.save(label);
  }

  async findAll() {
    return await this.labelRepository.find();
  }

  async findOne(id: number) {
    const label = await this.labelRepository.findOneBy({ id });
    if (!label) {
      throw new NotFoundException(`해당하는 라벨을 찾을 수 없습니다.`);
    }
    return label;
  }

  async update(id: number, updateLabelDto: UpdateLabelDto) {
    const label = await this.labelRepository.findOneBy({ id });
    if (!label) {
      throw new NotFoundException(`해당하는 라벨이 존재하지 않습니다.`);
    }
    if (
      updateLabelDto.color &&
      !/^#([0-9A-F]{3}){1,2}$/i.test(updateLabelDto.color)
    ) {
      throw new BadRequestException('유효한 색상 코드(#RRGGBB)를 입력하세요.');
    }

    Object.assign(label, updateLabelDto);
    return await this.labelRepository.save(label);
  }

  async remove(id: number) {
    const label = await this.labelRepository.findOneBy({ id });
    if (!label) {
      throw new NotFoundException(
        `ID ${id}에 해당하는 라벨이 존재하지 않습니다.`,
      );
    }

    await this.labelRepository.delete(id);
    return { message: '라벨이 성공적으로 삭제되었습니다.' };
  }
}

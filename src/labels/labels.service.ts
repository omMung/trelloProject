import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}

  async create(createLabelDto: CreateLabelDto) {
    const label = this.labelRepository.create(createLabelDto);
    return await this.labelRepository.save(label);
  }

  async findAll() {
    return await this.labelRepository.find();
  }

  async findOne(id: number) {
    const label = await this.labelRepository.findOneBy({ id });
  }

  async update(id: number, updateLabelDto: UpdateLabelDto) {
    const label = await this.labelRepository.findOneBy({ id });
    if (!label) {
      // 라벨이 존재하지 않을 경우 예외 처리
      throw new Error('Label not found');
    }
    Object.assign(label, updateLabelDto);
    return await this.labelRepository.save(label);
  }

  async remove(id: number) {
    const label = await this.labelRepository.findOneBy({ id });
    return await this.labelRepository.delete(label);
  }
}

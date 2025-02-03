import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetMemberDto } from './dto/get-member.dto'

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post() // 멤버 추가
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get() // 멤버 전체 조회
  findAll(@Body() getMemberDto: GetMemberDto ) {
    return this.membersService.findAll(getMemberDto);
  }

  @Get(':id') // 멤버 상세 조회
  findOne(@Param('id') id: string , @Body() getMemberDto: GetMemberDto ) {
    return this.membersService.findOne(+id , getMemberDto);
  }

  @Delete(':id') // 멤버 삭제
  remove(@Param('id') id: string , @Body() getMemberDto: GetMemberDto) {
    return this.membersService.remove(+id , getMemberDto);
  }
}

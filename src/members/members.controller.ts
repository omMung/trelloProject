import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request  } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetMemberDto } from './dto/get-member.dto'
import { DeleteMemberDto } from './dto/delete-member.dto'
import  { DetailGetMemberDto } from './dto/detailget-member.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @UseGuards(JwtAuthGuard)
  @Post() // 멤버 생성
  create(@Request() req ,@Body() createMemberDto: CreateMemberDto) {
    const userId = req.user.id
    return this.membersService.create(userId ,createMemberDto);
  }

  @Get() // 멤버 전체 조회
  findAll(@Body() getMemberDto: GetMemberDto ) {
    return this.membersService.findAll(getMemberDto);
  }

  @Get(':id') // 멤버 상세 조회
  findOne(@Param('id') id: string , @Body() detailgetMemberDto: DetailGetMemberDto) {
    return this.membersService.findOne(+id , detailgetMemberDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete() // 멤버 삭제
  remove(@Request() req , @Body() deleteMemberDto: DeleteMemberDto) {
    const userId = req.user.id
    return this.membersService.remove(userId , deleteMemberDto);
  }
}

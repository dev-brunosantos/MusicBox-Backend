import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoricoService } from './historico.service';
import { CreateHistoricoAlunoDto, CreateHistoricoUsuarioDto } from './dto/create-historico.dto';
import { UpdateHistoricoDto } from './dto/update-historico.dto';

@Controller('historico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) {}

  @Post()
  createHistoricoUsuario(@Body() createHistoricoUsuario: CreateHistoricoUsuarioDto) {
    return this.historicoService.createHistoricoUsuario(createHistoricoUsuario);
  }

  @Post()
  create(@Body() createHistoricoAlunoDto: CreateHistoricoAlunoDto) {
    return this.historicoService.create(createHistoricoAlunoDto);
  }

  @Get()
  findAll() {
    return this.historicoService.findAll();
  }

  @Get('/aluno/:alunoID')
  findOne(@Param('alunoID') alunoID: string) {
    return this.historicoService.findOne(alunoID);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoricoDto: UpdateHistoricoDto) {
    return this.historicoService.update(+id, updateHistoricoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historicoService.remove(+id);
  }
}

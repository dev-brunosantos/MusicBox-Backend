import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TurmasService {

  constructor(
    private prisma: DbService
  ) { }

  public async create(createTurmaDto: CreateTurmaDto) {
    try {

      const novaTurma = await this.prisma.turma.create({
        data: createTurmaDto
      })

      return novaTurma;

    } catch (error) {

      console.error(error);

      throw new HttpException(
        "Erro interno do sistema.",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async findAll() {
    const turmas = await this.prisma.turma.findMany();
    return turmas;
  }

  public async findOne(id: number) {
    const turmaID = await this.prisma.turma.findUnique({
      where: { turmaID: id }
    })

    if (!turmaID) {
      throw new HttpException('Turma não encontrada.', HttpStatus.NOT_FOUND);
    }

    return turmaID;
  }

  public async findByName(turma: string) {
    const turmaEncontrada = await this.prisma.turma.findFirst({
      where: { turma: turma }
    })

    if (!turmaEncontrada) {
      throw new HttpException('Turma não encontrada.', HttpStatus.NOT_FOUND);
    }

    return turmaEncontrada;
  }

  public async update(id: number, updateTurmaDto: UpdateTurmaDto) {
    try {
      const turma = await this.findOne(id);

      const turmaAtualizada = await this.prisma.turma.update({
        where: { turmaID: turma.turmaID },
        data: updateTurmaDto
      })

      return {
        dadosAntigos: turma,
        turmaAtualizada,
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Erro interno do sistema.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async remove(id: number) {
    try {
      const turma = await this.findOne(id);

      await this.prisma.turma.delete({
        where: { turmaID: turma.turmaID }
       })

       return `Turma ${turma.turma} removida com sucesso.`;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Erro interno do sistema.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

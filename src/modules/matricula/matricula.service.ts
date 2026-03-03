import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class MatriculaService {

  constructor(
    private prisma: DbService
  ) { }

  public async create(createMatriculaDto: CreateMatriculaDto) {
    try {

      if (
        !createMatriculaDto.turmaID ||
        !createMatriculaDto.statusMatricula
      ) {
        throw new HttpException(
          'Os campos alunoID, turmaID e statusMatricula são obrigatórios.',
          HttpStatus.BAD_REQUEST
        );
      }

      const novaMatricula = await this.prisma.matricula.create({
        data: {
          alunoID: createMatriculaDto.alunoID!,
          turmaID: createMatriculaDto.turmaID,
          statusMatricula: createMatriculaDto.statusMatricula
        }
      })

      return novaMatricula;
    } catch (error) {
      console.error('ERRO REAL:', error);
      throw error;
    }
    // } catch (error) {

    //   console.error(error);

    //   if (error instanceof HttpException) {
    //     throw error;
    //   }

    //   console.error(error);
    //   throw new HttpException(
    //     'Erro interno do sistema.',
    //     HttpStatus.INTERNAL_SERVER_ERROR
    //   );
    // }
  }

  public async findAll() {
    const matriculas = await this.prisma.matricula.findMany();
    return matriculas;
  }

  public async findOne(id: number) {
    const matriculaID = await this.prisma.matricula.findUnique({
      where: { id }
    })

    if (!matriculaID) {
      throw new HttpException('Matrícula não encontrada.', HttpStatus.NOT_FOUND);
    }

    return matriculaID;
  }

  public async update(id: number, updateMatriculaDto: UpdateMatriculaDto) {
    try {
      const matricula = await this.findOne(id);

      const matriculaAtualizada = await this.prisma.matricula.update({
        where: { id: matricula.id },
        data: updateMatriculaDto
      })

      return matriculaAtualizada;
    } catch (error) {

    }
  }

  remove(id: number) {
    return `This action removes a #${id} matricula`;
  }
}

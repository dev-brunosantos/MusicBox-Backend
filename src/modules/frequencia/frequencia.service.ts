import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFrequenciaDto } from './dto/create-frequencia.dto';
import { UpdateFrequenciaDto } from './dto/update-frequencia.dto';
import { DbService } from 'src/db/db.service';
import { MatriculaService } from '../matricula/matricula.service';

@Injectable()
export class FrequenciaService {

  constructor(
    private readonly prisma: DbService,
    private readonly matriculaService: MatriculaService
  ) { }

  public async create(createFrequenciaDto: CreateFrequenciaDto) {
    try {
      const matriculaExistente = await this.matriculaService.findOne(createFrequenciaDto.matriculaID);

      if (!matriculaExistente) {
        throw new HttpException('Matrícula não encontrada.', HttpStatus.NOT_FOUND);
      }

      const novaFrequencia = await this.prisma.frequencia.create({
        data: {
          matriculaID: matriculaExistente.id,
          status: createFrequenciaDto.status,
          observacao: createFrequenciaDto.observacao,
          dataAula: createFrequenciaDto.dataAula
        }
      })

      return novaFrequencia;

    } catch (error) {
      if(error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro ao criar frequência.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async findAll() {
    const frequencias = await this.prisma.frequencia.findMany();

    if (!frequencias || frequencias.length === 0) {
      throw new HttpException('Nenhuma frequência encontrada.', HttpStatus.NOT_FOUND);
    }

    return frequencias;
  }

  findOne(id: number) {
    return `This action returns a #${id} frequencia`;
  }

  update(id: number, updateFrequenciaDto: UpdateFrequenciaDto) {
    return `This action updates a #${id} frequencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} frequencia`;
  }
}

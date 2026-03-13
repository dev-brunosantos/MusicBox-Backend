import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { DbService } from 'src/db/db.service';
import { AlunoService } from '../aluno/aluno.service';

@Injectable()
export class PagamentoService {

  constructor(
    private readonly prisma: DbService,
    private readonly alunoService: AlunoService
  ) {}

  public async create(createPagamentoDto: CreatePagamentoDto) {
    try {
      const alunoExistente = await this.alunoService.findOne(createPagamentoDto.alunoID);

      if (!alunoExistente) {
        throw new HttpException('Aluno não encontrado.', HttpStatus.NOT_FOUND);
      }

      const novoPagamento = await this.prisma.pagamento.create({
        data: {
          alunoID: alunoExistente.alunoID,
          valor: createPagamentoDto.valor,
          tipoPagamento: createPagamentoDto.tipoPagamento,
          statusPagamento: createPagamentoDto.statusPagamento
        }
      })
      
      return novoPagamento;
    } catch (error) {
      if(error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro ao criar pagamento.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all pagamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pagamento`;
  }

  update(id: number, updatePagamentoDto: UpdatePagamentoDto) {
    return `This action updates a #${id} pagamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} pagamento`;
  }
}

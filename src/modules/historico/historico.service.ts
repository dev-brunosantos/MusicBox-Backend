import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHistoricoAlunoDto, CreateHistoricoUsuarioDto } from './dto/create-historico.dto';
import { UpdateHistoricoDto } from './dto/update-historico.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class HistoricoService {

  constructor(
    private readonly prisma: DbService,
  ) { }

  public async createHistoricoUsuario(createHistoricoUsuarioDto: CreateHistoricoUsuarioDto) {
    try {
      return await this.prisma.historicoUsuario.create({
        data: {
          usuarioID: createHistoricoUsuarioDto.usuarioID,
          tipoHistorico: createHistoricoUsuarioDto.tipoHistorico,
          descricao: createHistoricoUsuarioDto.descricao,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async create(createHistoricoAlunoDto: CreateHistoricoAlunoDto) {
    try {
      return await this.prisma.historicoAluno.create({
        data: {
          alunoID: createHistoricoAlunoDto.alunoID,
          tipoHistorico: createHistoricoAlunoDto.tipoHistorico,
          descricao: createHistoricoAlunoDto.descricao,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async findAll() {
    const historicos = await this.prisma.historicoAluno.findMany({
      select: {
        id: true,
        aluno: {
          select: {
            alunoID: true,
            usuario: {
              select: {
                nome: true,
              }
            },
            matriculas: {
              select: {
                id: true,
                turma: {
                  select: {
                    turma: true,
                    instrumento: true
                  }
                },
                statusMatricula: true,
                dataMatricula: true,
              }
            }
          }
        }
      }
    });
    return historicos;
  }

  public async findOne(alunoID: string) {
    const historicoAluno = await this.prisma.historicoAluno.findMany({
      where: { alunoID },
      select: {
        id: true,
        aluno: {
          select: {
            alunoID: true,
            usuario: {
              select: {
                nome: true,
              }
            },
            matriculas: {
              select: {
                id: true,
                turma: {
                  select: {
                    turma: true,
                    instrumento: true
                  }
                },
                statusMatricula: true,
                dataMatricula: true,
              }
            }
          }
        }
      }
    })

    if(!historicoAluno || historicoAluno.length === 0) {
      throw new HttpException("Nenhum histórico encontrado para o alunoID fornecido", HttpStatus.NOT_FOUND);
    }

    return historicoAluno;
  }

  update(id: number, updateHistoricoDto: UpdateHistoricoDto) {
    return `This action updates a #${id} historico`;
  }

  remove(id: number) {
    return `This action removes a #${id} historico`;
  }
}

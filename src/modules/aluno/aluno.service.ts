import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { DbService } from 'src/db/db.service';
import { MatriculaService } from '../matricula/matricula.service';
import { TurmasService } from '../turmas/turmas.service';
import { HistoricoService } from '../historico/historico.service';

@Injectable()
export class AlunoService {

  constructor(
    private prisma: DbService,
    private readonly historicoService: HistoricoService,
    private turmaService: TurmasService,
    private matriculaService: MatriculaService
  ) { }

  public async create(createAlunoDto: CreateAlunoDto) {
    try {

      if (!createAlunoDto.usuarioID) {
        throw new HttpException('O campo usuarioID é obrigatório.', HttpStatus.BAD_REQUEST);
      }

      // Verifica se a turma informada existe
      const turmaExistente = await this.turmaService.findByName(createAlunoDto.turma);

      if (!turmaExistente) {
        throw new HttpException('Turma não encontrada.', HttpStatus.NOT_FOUND);
      }

      // Criação da matricula
      // const novaMatricula = await this.matriculaService.create({
      //   alunoID: '1234', // Será atualizado posteriormente com o ID do aluno criado
      //   turmaID: turmaExistente.turmaID,
      //   statusMatricula: 'Ativo'
      // })

      // Criação do novo aluno
      const novoAluno = await this.prisma.aluno.create({
        data: {
          usuarioID: createAlunoDto.usuarioID,
          // matriculas: {
          //   connect: { id: novaMatricula.id }
          // }
          matriculas: {
            create: {
              turmaID: turmaExistente.turmaID,
              statusMatricula: 'Ativo'
            }
          }
        },
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
                  instrumento: true,
                  dia: true,
                  horario: true
                }
              },
              statusMatricula: true,
              Frequencias: {
                select: {
                  observacao: true,
                  status: true,
                  dataAula: true
                }
              }
            },
          },
        }
      })

      // Atualiza a matrícula com o ID do aluno criado
      // await this.matriculaService.update(
      //   novaMatricula.id, { alunoID: novoAluno.alunoID }
      // );

      // Criação do informações do historico do aluno
      await this.historicoService.create({
        alunoID: novoAluno.alunoID,
        tipoHistorico: 'Cadastro',
        descricao: `Aluno ${novoAluno.usuario.nome} matriculado na turma ${turmaExistente.turma}.`
      })


      return novoAluno;
    } catch (error) {

      console.error(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Erro interno do sistema.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async findAll() {
    const alunos = await this.prisma.aluno.findMany({
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
                instrumento: true,
                dia: true,
                horario: true
              }
            },
            statusMatricula: true,
            Frequencias: {
              select: {
                observacao: true,
                status: true,
                dataAula: true
              }
            }
          },
        },
      }
    });

    if (!alunos || alunos.length === 0) {
      throw new HttpException('Nenhum aluno encontrado.', HttpStatus.NOT_FOUND);
    }

    return alunos.map(aluno => ({
      alunoID: aluno.alunoID,
      nome: aluno.usuario.nome,
      matriculas: aluno.matriculas.map(matricula => ({
        id: matricula.id,
        turma: matricula.turma.turma,
        instrumento: matricula.turma.instrumento,
        dia: matricula.turma.dia,
        horario: matricula.turma.horario,
        statusMatricula: matricula.statusMatricula,
        Frequencias: matricula.Frequencias
      }))
    }));
  }

  public async findOne(id: string) {
    const aluno = await this.prisma.aluno.findUnique({
      where: { alunoID: id },
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
                instrumento: true,
                dia: true,
                horario: true
              }
            },
            statusMatricula: true,
            Frequencias: {
              select: {
                observacao: true,
                status: true,
                dataAula: true
              }
            }
          },
        },
      }
    })

    if (!aluno) {
      throw new HttpException('Aluno não encontrado.', HttpStatus.NOT_FOUND);
    }

    return aluno;
  }

  update(id: string, updateAlunoDto: UpdateAlunoDto) {
    return `This action updates a #${id} aluno`;
  }

  remove(id: string) {
    return `This action removes a #${id} aluno`;
  }
}

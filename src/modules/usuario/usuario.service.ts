import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { DbService } from 'src/db/db.service';
import { hash } from "bcrypt";
import { AlunoService } from '../aluno/aluno.service';

@Injectable()
export class UsuarioService {

  constructor(
    private prisma: DbService,
    private alunoService: AlunoService
  ) { }

  // public async create(createUsuarioDto: CreateUsuarioDto) {
  //   try {
  //     const emailExistente = await this.findByEmail(createUsuarioDto.email);

  //     if (emailExistente) {
  //       throw new HttpException('Email já cadastrado no sistema.', HttpStatus.CONFLICT);
  //     }

  //     if (!createUsuarioDto.senha) {
  //       throw new HttpException('A senha é obrigatória.', HttpStatus.BAD_REQUEST);
  //     }

  //     const senhaHash = await hash(createUsuarioDto.senha, 10);

  //     const resultado = await this.prisma.$transaction(async (prisma) => {

  //       const novoUsuario = await prisma.usuario.create({
  //         data: {
  //           ...createUsuarioDto,
  //           senha: senhaHash
  //         }
  //       });

  //       let novoAluno: any = null;
  //       if (createUsuarioDto.cargo === 'Aluno') {
  //         const usuarioID = {
  //           usuarioID: novoUsuario.id
  //         };

  //         novoAluno = await prisma.aluno.create({
  //           data: {
  //             ...usuarioID
  //           }
  //         });
  //       }

  //       return { novoUsuario, novoAluno };
  //     });

  //     return {
  //       ...resultado,
  //       message: 'Usuário criado com sucesso.'
  //     };

  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }

  //     throw new HttpException('Erro interno do sistema.', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  public async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const emailExistente = await this.findByEmail(createUsuarioDto.email);

      if (emailExistente) {
        throw new HttpException('Email já cadastrado no sistema.', HttpStatus.CONFLICT);
      }

      if (!createUsuarioDto.senha) {
        throw new HttpException('A senha é obrigatória.', HttpStatus.BAD_REQUEST);
      }

      const senhaHash = await hash(createUsuarioDto.senha, 10);

      const novoUsuario = await this.prisma.usuario.create({
        data: {
          nome: createUsuarioDto.nome,
          email: createUsuarioDto.email,
          senha: senhaHash,
          cargo: createUsuarioDto.cargo
        },
        select: {
          id: true,
          nome: true,
          email: true,
          cargo: true
        }
      });

      if (createUsuarioDto.cargo === 'Aluno') {

        if (!createUsuarioDto.turma) {
          throw new HttpException(
            'A turma é obrigatória para aluno.',
            HttpStatus.BAD_REQUEST
          );
        }

        const createAlunoDto = {
          usuarioID: novoUsuario.id,
          turma: createUsuarioDto.turma
        };

        await this.alunoService.create(createAlunoDto);
      }

      return {
        novoUsuario,
        message: 'Usuário criado com sucesso.'
      };

    } catch (error) {

      console.error(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Erro interno do sistema.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async findAll() {
    const usuarios = await this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        cargo: true,
        aluno: {
          select: {
            alunoID: true
          }
        }
      }
    });

    if (!usuarios || usuarios.length === 0) {
      throw new HttpException('Nenhum usuário encontrado.', HttpStatus.NOT_FOUND);
    }

    return usuarios;
  }

  public async findOne(id: string) {
    return `This action returns a #${id} usuario`;
  }

  public async findByEmail(email: string) {
    return await this.prisma.usuario.findUnique({
      where: { email }
    })
  }

  public async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Aluno" (
    "alunoID" TEXT NOT NULL PRIMARY KEY,
    "usuarioID" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" DATETIME NOT NULL,
    CONSTRAINT "Aluno_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Frequencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matriculaID" INTEGER NOT NULL,
    "dataAula" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "observacao" TEXT,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" DATETIME NOT NULL,
    CONSTRAINT "Frequencia_matriculaID_fkey" FOREIGN KEY ("matriculaID") REFERENCES "Matricula" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Turma" (
    "turmaID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "turma" TEXT NOT NULL,
    "instrumento" TEXT NOT NULL,
    "dia" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Matricula" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunoID" TEXT NOT NULL,
    "turmaID" INTEGER NOT NULL,
    "statusMatricula" TEXT NOT NULL,
    "dataMatricula" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" DATETIME NOT NULL,
    CONSTRAINT "Matricula_alunoID_fkey" FOREIGN KEY ("alunoID") REFERENCES "Aluno" ("alunoID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Matricula_turmaID_fkey" FOREIGN KEY ("turmaID") REFERENCES "Turma" ("turmaID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunoID" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "tipoPagamento" TEXT NOT NULL,
    "statusPagamento" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" DATETIME NOT NULL,
    CONSTRAINT "Pagamento_alunoID_fkey" FOREIGN KEY ("alunoID") REFERENCES "Aluno" ("alunoID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HistoricoAluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunoID" TEXT NOT NULL,
    "tipoHistorico" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HistoricoAluno_alunoID_fkey" FOREIGN KEY ("alunoID") REFERENCES "Aluno" ("alunoID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_usuarioID_key" ON "Aluno"("usuarioID");

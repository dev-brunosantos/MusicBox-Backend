/*
  Warnings:

  - A unique constraint covering the columns `[turma]` on the table `Turma` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "HistoricoUsuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioID" TEXT NOT NULL,
    "tipoHistorico" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HistoricoUsuario_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Turma_turma_key" ON "Turma"("turma");

const express = require("express");
const pool = require("./db"); // Conexão com PostgreSQL
const todosRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Criar uma nova tarefa (C - Create)
todosRoutes.post("/todos", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "O nome da tarefa é obrigatório" });
  }

  try {
    // Usando Prisma para criar o registro
    const todo = await prisma.todo.create({
      data: { name, status: false },
    });

    res.status(201).json(todo);
  } catch (err) {
    console.error("Erro ao criar tarefa:", err);
    res.status(500).json({ error: "Erro ao criar a tarefa" });
  }
});

// Listar todas as tarefas (R - Read)
todosRoutes.get("/todos", async (req, res) => {
  try {
    // Usando Prisma para buscar todos os registros
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } catch (err) {
    console.error("Erro ao buscar tarefas:", err);
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});

//U
todosRoutes.put("/todos", async (req, res) => { 
  const { name,  id,  status } = req.body;
  if (!id) {
    return res.status(400).json({ error: "O id da tarefa é obrigatório" });
  }

  const todoAlreadyExists = await prisma.todo.findUnique({ where: { id } });
  if (!todoAlreadyExists) {
    return res.status(400).json({ error: "Tarefa nao encontrada" });
  }

 // if (!name) {
  //  return res.status(400).json({ error: "O nome da tarefa é obrigatório" });
 // }
  const todo = await prisma.todo.update({
     where: { 
      id,
     },
      data: {
        name,
        status,
       
      } 
    });
  return res.status(200).json(todo);})

//D
todosRoutes.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const intId = parseInt(id);

  if (!intId) {
    return res.status(400).json({ error: "O id da tarefa é obrigatório" });
  }

  const todoAlreadyExists = await prisma.todo.findUnique({ 
    where: { id: intId },
   });
  if (!todoAlreadyExists) {
    return res.status(400).json({ error: "Tarefa nao encontrada" });
  }

  await prisma.todo.delete({ where: { id: intId } });
  return res.status(200).send({ message: "Tarefa deletada com sucesso" });
});


module.exports = todosRoutes;

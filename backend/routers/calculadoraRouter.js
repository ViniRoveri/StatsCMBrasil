import express from "express";
import calculadoraController from "../controllers/calculadoraController.js";

const calculadoraRouter = express.Router()

calculadoraRouter.get('/:id', calculadoraController.getById)
calculadoraRouter.post('/', calculadoraController.create)
calculadoraRouter.put('/:id', calculadoraController.update)

export default calculadoraRouter
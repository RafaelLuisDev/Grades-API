import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import { gradeModel } from '../models/grades.js';

const create = async (req, res) => {
    try {
        const newGrade = await gradeModel.create(req.body);
        res.send(newGrade);
        logger.info(`POST /grade - ${JSON.stringify(newGrade)}`);
    } catch (error) {
        res.status(500).send({ message: error.message || 'Algum erro ocorreu ao salvar' });
        logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
    }
};

const findAll = async (req, res) => {
    const name = req.query.name;

    //condicao para o filtro no findAll
    var condition = name ? { name: { $regex: new RegExp(name), $options: 'i' } } : {};

    try {
        const grades = await gradeModel.find(condition);
        res.send(grades);
        logger.info(`GET /grade`);
    } catch (error) {
        res.status(500).send({ message: error.message || 'Erro ao listar todos os documentos' });
        logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
    }
};

const findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const grade = await gradeModel.findById(id);
        if (grade === null) throw new Error('Id não encontrado');
        res.send(grade);

        logger.info(`GET /grade - ${id}`);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
        logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
    }
};

const update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Dados para atualizacao vazio',
        });
    }

    const id = req.params.id;

    try {
        const updateGrade = await gradeModel.findByIdAndUpdate(id, req.body, { new: true });
        if (updateGrade === null) throw new Error('Id não encontrado');
        res.send({ message: 'Grade atualizado com sucesso' });

        logger.info(`PUT /grade - ${id} - ${JSON.stringify(updateGrade)}`);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
        logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const removedGrade = await gradeModel.findByIdAndRemove(id);
        if (removedGrade === null) throw new Error('Id não encontrado');
        res.send({ message: 'Grade excluido com sucesso' });

        logger.info(`DELETE /grade - ${id}`);
    } catch (error) {
        res.status(500).send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
        logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
    }
};

const removeAll = async (req, res) => {
    try {
        const deletedGrades = await gradeModel.deleteMany({});
        res.send({
            message: `Todos grades excluidos - Total de excluidos: ${deletedGrades.deletedCount}`,
        });
        logger.info(`DELETE /grade`);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
        logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
    }
};

export default { create, findAll, findOne, update, remove, removeAll };

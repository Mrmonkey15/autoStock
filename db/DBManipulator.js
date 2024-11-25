class DbManipulator {
    constructor({ Model }) {
        this.model = Model || ''; // O modelo associado a esta instância
    }

    // Método para inserir um registro
    async insert(data) {
        try {
            const result = await this.model.create(data);
            return result; // Retorna o objeto criado
        } catch (erro) {
            console.log("Erro ao inserir dados:", erro);
            throw erro; // Propaga o erro
        }
    }

    // Método para deletar um registro
    async delete(id) {
        try {
            const result = await this.model.destroy({
                where: { id: id }
            });

            if (result === 1) {
                console.log("Registro deletado com sucesso!");
            } else {
                console.log("Registro não encontrado para deletar.");
            }

            return result; // Retorna a quantidade de registros deletados
        } catch (error) {
            console.log("Erro ao deletar registro:", error);
            throw error;
        }
    }

    // Método para buscar todos os registros
    async findAll(where = {}) {
        try {
            const results = await this.model.findAll({ where }); // Busca com filtros opcionais
            return results; // Retorna todos os registros encontrados
        } catch (error) {
            console.log("Erro ao buscar registros:", error);
            throw error;
        }
    }

    // Método para atualizar um registro
    async update(id, newData) {
        try {
            const result = await this.model.update(newData, {
                where: { id: id }
            });

            if (result[0] === 1) { // Sequelize retorna um array, onde o primeiro elemento é o número de linhas afetadas
                console.log("Registro atualizado com sucesso!");
            } else {
                console.log("Registro não encontrado para atualizar.");
            }

            return result; // Retorna o número de registros atualizados
        } catch (error) {
            console.log("Erro ao atualizar registro:", error);
            throw error;
        }
    }
}

module.exports = DbManipulator;








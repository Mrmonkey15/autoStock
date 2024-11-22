const Cars = require("../cars/Cars")

class CarClass {
    constructor({ plate, id, model, year, purchasePrice, marketPrice, category, kilometers, status }) {
        this.plate = plate || null;
        this.id = id || null;
        this.model = model || null;
        this.year = year || null;
        this.purchasePrice = purchasePrice || null;
        this.marketPrice = marketPrice || null;
        this.category = category || null;
        this.kilometers = kilometers || null;
        this.status = status || null;
    }

    async List() {
        try {
            const cars = await Cars.findAll();  // Armazena o resultado em uma variável
            console.log("dados buscados com sucesso");
            return cars;  // Retorna os carros encontrados
        } catch (error) {
            console.log("erro ao buscar dados:", error);
            throw error;  // Lança o erro para ser tratado em outro lugar
        }
    }

    async create() {
        try {
            const newCarData = {
                plate: this.plate,
                model: this.model,
                year: this.year,
                purchasePrice: this.purchasePrice,
                marketPrice: this.marketPrice,
                category: this.category,
                kilometers: this.kilometers,
                status: this.status
            };
            const newCar = await Cars.create(newCarData);
            console.log("Carro inserido com sucesso:", newCar);
            return newCar;
        } catch (error) {
            console.log("Erro ao inserir carro:", error);
            throw error;
        }
    }

    async delete(carId) {
        try {
            const result = await Cars.destroy({
                where: {
                    id: carId  
                }
            });

            if (result === 1) {
                console.log("Carro deletado com sucesso!");
            } else {
                console.log("Carro não encontrado para deletar.");
            }

            return result; 
        } catch (error) {
            console.log("Erro ao deletar carro:", error);
            throw error; 
        }
    }

    async update(carId, updatedData) {
        try {
            const [affectedRows] = await Cars.update(updatedData, {
                where: {
                    id: carId 
                }
            });

            if (affectedRows === 1) {
                console.log("Carro atualizado com sucesso!");
            } else {
                console.log("Carro não encontrado ou nenhum dado alterado.");
            }

            return affectedRows; // Retorna o número de registros afetados (1 ou 0)
        } catch (error) {
            console.log("Erro ao atualizar carro:", error);
            throw error;
        }
    }
}

module.exports = CarClass;

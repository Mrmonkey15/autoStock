const insertBrands = async () => {
    try {
        const brandsList = [
            { name: "nissan" },
            { name: "volkswagen" },
            { name: "honda" },
            {name: "volvo"}
        ];
        await Brands.bulkCreate(brandsList, { ignoreDuplicates: true });
        console.log("Marcas cadastradas com sucesso!");
    } catch (erro) {
        console.error(`Erro ao cadastrar marcas: ${erro}`);
    }
  };



module.exports =  insertBrands ;

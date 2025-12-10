const mongoose=require('mongoose');

const MedicamentosSchema=new mongoose.Schema({
    nome:{type:String,required:true},
    descricao:{type:String},
    dosagem:{type:String,required:true},
    efeitos_secundarios:[{type:String}],
    doencas_constraindicadas:[{type:mongoose.Schema.Types.ObjectId,ref:'Doencas'}]
    },{timestamps:true});

module.exports=mongoose.model('Medicamentos',MedicamentosSchema);
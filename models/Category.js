import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Girişin başındaki ve sonundaki boşlukları kaldırır
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String, // Resim URL'sini saklamak için String tipini kullanabilirsiniz
        trim: true
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId, // Üst kategoriye referans için ObjectId kullanabilirsiniz
        ref: 'Category' // Kategorinin kendi içindeki başka bir kategoriye referans olması durumunda
    }
});

const Category = mongoose.models.Category || mongoose.model("Category",categorySchema)
export default Category
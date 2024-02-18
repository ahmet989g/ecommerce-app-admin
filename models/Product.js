import mongoose, {model, Schema, models} from "mongoose";

const ProductShema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true},
    images: [{type: String}]
});

export const Product = model.Product || model('Product', ProductShema);
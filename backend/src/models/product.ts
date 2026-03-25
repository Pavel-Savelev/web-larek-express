import mongoose from 'mongoose';

interface TImage {
  fileName: string;
  originalName: string;
}

interface IProduct {
  title: string;
  category: string;
  price: number | null;
  description: string;
  image: TImage;
}

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: null,
  },
  image: {
    type: {
      fileName: String,
      originalName: String,
    },
    required: true,
  },
});

const Product = mongoose.model<IProduct>('Product', productSchema, 'products');

export default Product;

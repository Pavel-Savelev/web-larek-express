import mongoose from 'mongoose';

interface IOrder {
  payment: 'card' | 'online';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

const orderSchema = new mongoose.Schema<IOrder>({
  payment: {
    type: String,
    enum: ['card', 'online'],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  items: [
    {
      type: String,
      required: true,
    },
  ],
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;

import mongoose from 'mongoose';

const User = new mongoose.Schema({
  name: {
		type: String,
		required: [true, 'Insira um nome para a categoria'],
	},
});

export default mongoose.model('User', User);

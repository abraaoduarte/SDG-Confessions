import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const Confession = new mongoose.Schema({
  title: {
		type: String,
		required: [
      true, 'Insira um nome para a confissão'
    ],
  },
  chapters:[{
    id: ObjectId,
    name: String,
    order: Number,
    paragraphs:[{
      content: String,
      biblical_references: String,
      order: Number,
      comments: [{
        text: String,
        user_id: Number
      }]
    }],
  }],
  active: {
    type: Boolean,
    default: 1,
  },
  author: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('Confession', Confession);

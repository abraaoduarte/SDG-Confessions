import mongoose from 'mongoose';

const Paragraph = new mongoose.Schema({
  content: {
		type: String,
		required: [
      true, 'Insira um paragrafo para o capítulo'
    ],
  },
  biblical_reference: String,
  order: {
    type: Number,
    required: [
      true, 'Insira a ordem do paragráfo'
    ]
  },
  active: {
    type: Boolean,
    default: 1,
  },
  author: String,
  confession: {
    title: String,
    confession_id: String,
    chapter_id: {
      type: String,
      required: [
        true, 'Insira o capítulo'
      ],
    },
    chapter:{
      title: String,
      order: Number,
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('Paragraph', Paragraph);

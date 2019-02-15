import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const Chapter = new mongoose.Schema({
  title: {
		type: String,
		required: [
      true, 'Insira um capítulo para a confissão'
    ],
  },
  confession: {
    title: String,
    confession_id: {
      type: String,
      required: [
        true, 'Insira a confissão'
      ],
    },
  },
  paragraphs:[{
    _id: ObjectId,
    content: String,
    biblical_references: String,
    order: Number
  }],
  order: {
    type: Number,
    required: [
      true, 'Insira a ordem do capítulo'
    ]
  },
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

export default mongoose.model('Chapter', Chapter);

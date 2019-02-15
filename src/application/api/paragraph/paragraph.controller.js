import { NotFound } from 'httperrors';
import Paragraph from '../../../infrastructure/schemas/paragraph.schema';
import Confession from '../../../infrastructure/schemas/confession.schema';
import Chapter from '../../../infrastructure/schemas/chapter.schema';
import composeController from '../../../infrastructure/helpers/compose-controller';

class ParagraphController {
  static list(req, res, next) {
    return Paragraph.find()
      .then((paragraphs) => {
        res.status(200).responseComposer(paragraphs);
      });
  }

  static show(req, res, next) {
    return Paragraph.findById(req.params.id)
      .then((paragraph) => {
        if (!paragraph) {
          return next(new NotFound(`No Paragraph with id [${req.params.id}] was found`));
        }

        res.status(200).responseComposer(paragraph);
      });
  }

  static async create(req, res, next) {
    const chapter = await Chapter.findById(req.body.confession.chapter_id);

    const confession = await Confession.findById(chapter.confession.confession_id);


    const paragraph = new Paragraph({
      content: req.body.content,
      order: req.body.order,
      biblical_reference: req.body.biblical_reference,
      confession: {
        confession_id: confession._id,
        title: confession.title,
        chapter_id: chapter._id,
        chapter: {
          title: chapter.title,
          order: chapter.order
        }
      }
    });

    const error = paragraph.validateSync();

    if (error) {
      return res.status(422).send({
        success: false,
        data: error.errors,
        message: error.toString(),
      });

    }

    return paragraph.save()
      .then(async (paragraph) => {

        /*const paragraphChapter = {
          _id: paragraph._id,
          content: paragraph.content,
          order: paragraph.order,
          biblical_references: paragraph.biblical_references
        };

        await Chapter.updateOne(
          { _id: chapter._id },
          { $push: { paragraphs: paragraphChapter } },
          { runValidators: true }
        );*/

        res.status(200).responseComposer(paragraph);
      });
  }

  static update(req, res, next) {
    return Paragraph.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    )
      .then((paragraph) => {
        res.status(200).responseComposer(paragraph);
      })
  }

  static delete(req, res, next) {
    return Paragraph.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(204).send();
      });
  }
}

export default composeController(ParagraphController);

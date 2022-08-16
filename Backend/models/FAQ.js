const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FAQAnswerSchema = new Schema({
  FAQAnswerText: { type: String },
  FAQAnswerType: { type: String },
});

const FAQQuestionAnswerSchema = new Schema({
  FAQQuestion: { type: String, unique: true },
  FAQAnswer: [{ type: FAQAnswerSchema }],
  FAQIsDynamic: { type: Boolean },
  FAQDynamicKey: { type: String },
});

const FAQSchema = new Schema(
  {
    FAQQuestionAnswer: [{ type: FAQQuestionAnswerSchema }],
    FAQCategoryName: { type: String },
  },
  {
    id: false,
    versionKey: false,
  }
);

exports.FAQ = mongoose.model("FAQ", FAQSchema);

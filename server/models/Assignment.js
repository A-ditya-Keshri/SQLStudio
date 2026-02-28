import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  question: { type: String, required: true },
  schemaDescription: { type: String, required: true }, // Markdown or text describing the tables
  sampleData: [{
    tableName: String,
    data: [mongoose.Schema.Types.Mixed]
  }],
  solutionQuery: { type: String, required: true }, // Hidden from user
  hintKeywords: [String] // Used to help LLM know what to hint at
}, { timestamps: true });

export default mongoose.model('Assignment', assignmentSchema);

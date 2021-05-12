const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  sports: { type: String, require: true, lowercase: true },
  created_at: { type: Date, require: true, default: Date.now() },
  playtime: {
    start: { type: Date, require: true, default: Date.now() },
    end: { type: Date, require: true, default: Date.now() },
  },
  playground: { type: mongoose.Types.ObjectId, ref: "Playground" },
  match_type: { type: String, require: true, lowercase: true }, // 종목에 따른 validation
  teams: [{ type: mongoose.Types.ObjectId, ref: "Team" }],
});

module.exports = mongoose.model("Match", matchSchema);

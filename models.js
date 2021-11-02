const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
    key: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true
    },
    totalCount: {
        type: Number,
        required: true
    }
});

const Record = mongoose.model("Record", RecordSchema);

module.exports = Record;
const mongoose = require("mongoose");

let SubSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    timeDuration: {
      type: String,
    },
    description: {
      type: String,
      // trim: true,
    },
    videoUrl: {
      type: String,
    },
    additionalUrl: {
      type: String,
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);
module.exports = mongoose.model("SubSection",SubSectionSchema) ;
// module.exports = mongoose.model("SubSection",SubSectionSchema) ;
// Prevent re-compilation issue
// const SubSection =
//   mongoose.models.SubSection || mongoose.model("SubSection", SubSectionSchema);

// module.exports = SubSection;

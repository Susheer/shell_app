let flagModel = require("../model/Flag");

const flagCtl = {
  upload: async (req, res) => {
    // Pipe it trough busboy
    req.pipe(req.busboy);

    req.busboy.on("file", async (fieldname, file, filename) => {
      let flag = await flagModel.findOne({
        title: filename
      });

      if (flag) {
        req.params.fileName = filename;
        return res.send(` ${filename} already exists `);
      }

      // Create a write stream of the new file
      const fstream = global.fs.createWriteStream(
        global.path.join(global.uploadPath, filename)
      );
      // Pipe it trough
      file.pipe(fstream);

      // On finish of the upload
      fstream.on("close", () => {
        console.log(`Upload of '${filename}' finished`);
        console.log(`Upload of '${filename}'  succeded`);
        req.params.fileName = filename;

        let newFlag = new flagModel({ title: filename });
        newFlag.save();
        return res.send("file uploaded succesfully");
      });

      fstream.on("error", () => {
        return res.send({ error: "no file find to upload" });
      });
    });
  },
  list: async (req, res) => {
    let flag = await flagModel.find({}, { title: 1, _id: 1 });
    return res.send({ files: flag });
  }
};

module.exports = flagCtl;

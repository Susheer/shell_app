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
    res.writeHead(401, { "Content-Type": "text/html" });
    let form = "<html>";

    form += "<head><title>Availbal flags</title></head>";
    form += "<body><div style='display:inline-flex; flex-direction:column'>";
    let host = req.hostname;
    host += ":4000/";
    flag.map(item => {
      // body start in column
      let imgurl = host + item.title;
      form +=
        '<div style="display:flex; align-items: center ; background: #fff;border-radius: 2px;margin:1rem; box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);padding: 2rem;">';
      form += `<img src=http://${imgurl}  style="height:8rem;" />`;
      form += `<div style='display:flex; flex-direction:column'><span>${item.title}</span><p><span>${item._id}</span></div>`;
      form += "</div>";
      // end here
    });

    form += "</div> </body>";
    form += "</html>";

    res.write(form);
    return res.end();
    // return res.send({ files: flag });
  }
};

module.exports = flagCtl;

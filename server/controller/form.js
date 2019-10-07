const uiForms = {
  uploadFlags: async function(req, res) {
    res.writeHead(401, { "Content-Type": "text/html" });
    let form = "<html>";

    form += "<head><title>Upload Form</title></head>";
    form += "<body><center>";
    form +=
      '<form action="/api/flagupload" method="POST" enctype="multipart/form-data">';

    form +=
      ' <div style="display:flex; justify-content:center; align-items: center;">';
    form +=
      '<input type="file" name="flagupload"  id="flag" class="custom-file-input"/>';

    form +=
      '<input type="submit" value="Submit" class="btn btn-primary btn-block">';
    form += " </div>";
    form += "</form>";
    form += "</center> </body>";
    form += "</html>";

    res.write(form);
    return res.end();
  }
};
module.exports = uiForms;

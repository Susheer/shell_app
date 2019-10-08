const uiForms = {
  uploadFlags: async function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    let form = "<html>";

    form += "<head><title>Upload Flags</title></head>";
    form += "<body><div style='height:100vh; '>";
    form +=
      '<form action="/api/flagupload"  method="POST" enctype="multipart/form-data">';

    form +=
      ' <div style=" max-width:40%; height:50vh;display:flex; margin-top:10%;   box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);padding: 2rem;   margin-left: calc(100% - 71%); justify-content:center; flex-direction:column;  align-items: center;">';
    form +=
      '<input type="file" name="flagupload" style="background-color:white; color:red; height:8 %; padding:15px; "   id="flag" class="custom-file-input"/>';

    form +=
      '<input type="submit" value="Submit" style="background-color:#38117d; color:white; height:8%;width:60%;" class="btn btn-primary btn-block">';
    form += " </div>";
    form += "</form>";
    form += "</div> </body>";
    form += "</html>";

    res.write(form);
    return res.end();
  }
};
module.exports = uiForms;

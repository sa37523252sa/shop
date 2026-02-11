require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// 確保這裡寫的是 upload 而不是 uploads
const upload = multer({ dest: 'upload/' }); 



app.use(cors());
app.use(express.json());
// 在你的 app.use(express.json()) 附近加上這一行
app.use('/upload', express.static('upload'));
app.use(express.static("public"));

// 修改後
app.use("/api/auth", require("./auth"));
app.use("/api/products", require("./products"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));

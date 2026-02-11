require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer"); // 1. 必須加入這一行引用
const path = require("path");

const app = express();

// 設定圖片上傳儲存位置
const upload = multer({ dest: 'upload/' }); 

app.use(cors());
app.use(express.json());

// 靜態檔案路徑
app.use('/upload', express.static('upload'));
app.use(express.static("public"));

// 路由設定 (確保這些檔案在根目錄)
app.use("/api/auth", require("./auth"));
app.use("/api/products", require("./products"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));

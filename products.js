const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // 確保你有 uploads 資料夾

// 新增商品的路由
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        const { title } = req.body;
        // 關鍵：前端傳來的是字串，要轉回 JSON 陣列
        const options = JSON.parse(req.body.options); 
        
        const imagePath = req.file ? req.file.path : null;

        // 這裡寫入你的資料庫邏輯 (例如：db.push 或 db.insert)
        console.log("收到商品：", title, options, imagePath);

        res.status(200).json({ message: "新增成功", title });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "伺服器解析失敗" });
    }
});

module.exports = router;

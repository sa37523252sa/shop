const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// 設定圖片儲存位置與檔名
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/'); // 確保你 GitHub 上叫 upload
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// 模擬資料庫
let products = []; 

// 取得商品列表
router.get("/list", (req, res) => {
    res.json(products);
});

// 新增商品 (關鍵路徑)
router.post("/add", upload.single("image"), (req, res) => {
    try {
        const { title, options } = req.body;
        
        // 關鍵：處理前端傳來的 JSON 字串
        let parsedOptions = [];
        try {
            parsedOptions = typeof options === 'string' ? JSON.parse(options) : options;
        } catch (e) {
            console.error("選項解析失敗:", e);
        }

        const newProduct = {
            id: Date.now(),
            title: title || "未命名商品",
            options: parsedOptions,
            imagePath: req.file ? req.file.path : null,
            // 產生可存取的 URL
            image_url: req.file ? `https://${req.get('host')}/${req.file.path}` : null
        };

        products.push(newProduct);
        console.log("✅ 成功新增商品:", newProduct);
        
        res.status(200).json({ message: "新增成功", product: newProduct });
    } catch (err) {
        console.error("❌ 後端報錯:", err);
        res.status(500).json({ message: "伺服器內部錯誤", error: err.message });
    }
});

module.exports = router;

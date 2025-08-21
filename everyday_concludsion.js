const fs = require('fs');

const path = '/D:/Notes/Obsidian/AdaAccio/everyday_conclusion.js';

// 获取当前日期字符串
const today = new Date();
const dateStr = today.toISOString().slice(0, 10); // 格式: YYYY-MM-DD

// 读取原文件内容
let content = '';
if (fs.existsSync(path)) {
    content = fs.readFileSync(path, 'utf8');
}

// 构造新内容
const newContent = `// ${dateStr}\n${content}`;

// 写回文件
fs.writeFileSync(path, newContent, 'utf8');

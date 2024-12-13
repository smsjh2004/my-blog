const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const fs = require('fs');
const matter = require('gray-matter'); // Markdown 메타데이터 추출 라이브러리
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'blog',
}).promise();



// 글 불러오기
app.get('/posts', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM posts ORDER BY created_at DESC'); // Promise 기반 호출
        res.json(rows);
    } catch (error) {
        console.error('Database Query Error:', error.message);
        res.status(500).send('Server Error');
    }
});

// 게시글 들어가기
app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).send('Post not found');
      }
      res.json(rows[0]); // 전체 데이터를 반환, 여기서 content 포함
    } catch (error) {
      console.error('Database Query Error:', error.message);
      res.status(500).send('Server Error');
    }
  });
  
  


//  글쓰기
app.post('/posts', async (req, res) => {
    const { title, description, mainImg, tag } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO posts (title, description, mainImg, tag) VALUES (?, ?, ?, ?)',
            [title, description, mainImg, tag]
        );
        res.status(201).send('Post created');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

const upload = multer({ dest: 'uploads/' }); // 'uploads/' 폴더에 파일을 임시 저장

// API: Markdown 파일 업로드 및 처리
app.post('/upload', upload.single('markdown'), async (req, res) => {
    const filePath = req.file.path;
  
    try {
      // Markdown 파일 읽기
      const fileContent = fs.readFileSync(filePath, 'utf8');
  
      // gray-matter로 메타데이터와 본문 추출
      const { data: metadata, content } = matter(fileContent);
  
      // 데이터베이스에 저장
      const [result] = await pool.query(
        'INSERT INTO posts (title, description, mainImg, tag, created_at, content) VALUES (?, ?, ?, ?, ?, ?)',
        [
          metadata.title,
          metadata.description,
          metadata.mainImg,
          metadata.tag,
          metadata.created_at || new Date(),
          content, // 본문 내용을 저장
        ]
      );
  
      // 파일 삭제 (임시 파일 제거)
      fs.unlinkSync(filePath);
  
      res.status(201).send({
        message: 'Markdown file uploaded and data saved to the database.',
        postId: result.insertId,
      });
    } catch (error) {
      console.error('Error processing Markdown file:', error.message);
      res.status(500).send('Server Error');
    }
  });
  

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

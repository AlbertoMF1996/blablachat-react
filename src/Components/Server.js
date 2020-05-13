const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors({origin: '*'}));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blablachat'
});

connection.connect(err => {
    if(err){
        return err;
    }
});


app.get('/', (req, res) => {
    res.send('go to /posts to see post');
});

app.get('/posts', (req, res) =>{
    const {id} = req.query;
    const selectAllPostsQuery = `SELECT * FROM posts WHERE idUsuario LIKE '${id}'`;
    connection.query(selectAllPostsQuery, (err, results) => {
        if (err){
            return res.send(err);
        }else{
            return res.json({
                data: results
            })
        }
    });
});

app.get('/posts/add', (req, res) => {
    const { text, img, id, title } = req.query;
    const insertPostQuery = `INSERT INTO posts (idUsuario, texto, imagen, titulo) VALUES ('${id}', '${text}', '${img}', '${title}')`;
    connection.query(insertPostQuery, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            return res.send('successfully added post')
        }
    });
});

app.get('/users', (req, res) =>{
    const { nameSearch } = req.query;
    const selectUserQuery = `SELECT * FROM users WHERE firstName LIKE '%${nameSearch}%' OR lastName LIKE '%${nameSearch}%'`;
    connection.query(selectUserQuery, (err, results) => {
        if (err){
            return res.send(err);
        }else{
            return res.json({
                data: results
            })
        }
    });
});


app.get('/users/add', (req, res) => {
    const { id, email, firstName, lastName, letters } = req.query;
    const insertPostQuery = `INSERT INTO users (id, email, firstName, lastName, letters) VALUES ('${id}', '${email}', '${firstName}','${lastName}', '${letters}')`;
    connection.query(insertPostQuery, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            return res.send('successfully added user')
        }
    });
});


app.get('/friendlist', (req, res) => {
    const { id } = req.query;
    const friendDataQuery = `SELECT * FROM friends WHERE iduser1 LIKE '${id}'`;
    connection.query(friendDataQuery, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            return res.json({
                data: results
            }) 
        }
    });
});



app.get('/friendRequest', (req, res) => {
    const { id } = req.query;
    const friendDataQuery = `SELECT * FROM users WHERE id LIKE '${id}'`;
    connection.query(friendDataQuery, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            return res.json({
                data: results
            }) 
        }
    });
});

app.get('/addfriend', (req, res) => {
    const { id1, id2 } = req.query;
    const addFriendQuery = `INSERT INTO friends (iduser1, iduser2) VALUES ('${id1}', '${id2}')`;
    connection.query(addFriendQuery, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            return res.send('successfully added friend')
        }
    });
})

app.get('/data' , (req, res) =>{
    const { id } = req.query;
    const checkDataQuery = `SELECT * FROM users WHERE id LIKE '${id}'`;
    connection.query(checkDataQuery, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            return res.json({
                data: results
            })
        }
    })
})




app.listen ( 3001, () => {
    console.log('Listening on port 3001')
});
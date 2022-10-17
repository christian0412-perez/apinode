const express = require('express');
const mysql = require('mysql');
var conexion = mysql.createConnection   ({
    host: 'localhost',
    database:'students',
    user: 'root',
    password: ''
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('conexion exitosa');
    }

});

const app = express();
app.use(express.json());
const students =[
    {id:1,name:'jorge',age:20,enroll:true},
    {id:2,name:'pilin',age:21,enroll:false},
    {id:3,name:'crz',age:22,enroll:true}
];
app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

app.get('/api/students', (req, res) => {
    conexion.query()
  res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no encontrado');
    else res.send(student);
});

app.post('/api/students',(req,res)=>{
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };
    students.push(student);
    res.send(student);
});


app.delete('/api/students/:id',(req, res) =>{
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('estudiante no encontrado');

    const index = students.indexOf(student);
    students.splice(index,1)
    res.send(student);

});

const port = process.env.port || 80;
app.listen(port,()=> console.log('escuchando en el puerto $(port)...'));
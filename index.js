const fs = require('fs');
const path = require('path');
const express=require('express')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const usersPath = path.join(__dirname, 'users.json')
console.log(usersPath)

// const users = [
//     {id: 1, name: 'Maksym', email: 'feden@gmail.com', password: 'qwe123'},
//     {id: 2, name: 'Alina', email: 'alindosik@gmail.com', password: 'ert345'},
//     {id: 3, name: 'Anna', email: 'ann43@gmail.com', password: 'ghj393'},
//     {id: 4, name: 'Tamara', email: 'tomochka23@gmail.com', password: 'afs787'},
//     {id: 5, name: 'Dima', email: 'taper@gmail.com', password: 'rtt443'},
//     {id: 6, name: 'Rita', email: 'torpeda@gmail.com', password: 'vcx344'},
//     {id: 7, name: 'Denis', email: 'denchik@gmail.com', password: 'sdf555'},
//     {id: 8, name: 'Sergey', email: 'BigBoss@gmail.com', password: 'ccc322'},
//     {id: 9, name: 'Angela', email: 'lala@gmail.com', password: 'cdd343'},
//     {id: 10, name: 'Irina', email: 'irka7@gmail.com', password: 'kkk222'},
// ];
function readUsers(usersPath) {
    try {
        const data = fs.readFileSync(usersPath, 'utf8')
        return JSON.parse(data)
    } catch (e) {
        console.error(e)
        return []
    }
}


function writeUsers(users) {
    try {
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))

    } catch (e) {
        console.error(e)
    }
}

// Начальное чтение пользователей
let users = readUsers();
app.get('/users', (req, res)=>{
    try {
        res.json(users)
    }catch (e) {
        res.status(400).json(e.message)
    }

})
app.post('/users', (req, res)=>{
    try {
        const {name, email, password} = req.body;
        const index= users.findIndex((user)=>user.email===email)
        let newUser={}
        if (index!==-1){
            return res.status(409).json('User with this email already exists')
        }
        if (/^[a-zA-Z]+$/.test(name) && /^[a-zA-Z0-9@]+$/.test(email) && password.length <= 50){
             newUser={
                id:users[users.length-1].id+1,
                name,
                email,
                password
            }
            writeUsers(users)
            users.push(newUser)
            res.status(201).json(newUser)
        }


         res.status(409).json('name is only characters, password max 50 symbol, email with @')


    }catch (e) {
        res.status(400).json(e.message)
    }
})
app.get('/users/:userId', (req, res)=>{
    try {
        const userId=Number(req.params.userId)
        const user=users.find(user=>user.id===userId)
        if (!user){
            res.status(404).json('User is not found')
        }
        res.json(user)
    }catch (e) {
        res.status(400).json(e.message)
    }
})
app.put('/users/:userId', (req, res)=>{
    try {
        const userId=Number(req.params.userId)
        const {name, email, password}=req.body
        const user=users.find(user=>user.id===userId)
        if (!user){
            return res.status(404).json('User not found')
        }
        if (/^[a-zA-Z]+$/.test(name)){
            user.name=name
        }if (/^[a-zA-Z0-9@]+$/.test(email)){
            user.email=email
        }if (password.length <= 50){
            user.password=password
        }
        writeUsers(users);
        res.status(201).json(user)
    }catch (e) {
        res.status(400).json(e.message)
    }
})
app.delete('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const index = users.findIndex(user => user.id === userId);
        if (index === -1) {
            return res.status(404).json('User not found')
        }
        users.splice(index, 1);
        writeUsers(users);
        res.sendStatus(204);
    } catch (e) {
        res.status(400).json(e.message)
    }
})
app.listen(3000, ()=>{
    console.log('Server is running')
})
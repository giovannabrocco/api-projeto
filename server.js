import express from 'express'

import { PrismaClient } from '@prisma/client'

import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
// passando o express como uma função


//express não usa json
//por isso é preciso avisar a ele
app.use(express.json())
app.use(cors())


app.post('/users', async (request, response) => {
   // console.log(request.body)
   // users.push(request.body)
   await prisma.user.create({
    data: {
        email: request.body.email,
        name: request.body.name,
        age: request.body.age
    }
   })
    response.status(201).json(request.body)
    //201: deu tudo certo e criei o que foi solicitado
}
)

//criando uma rota, que devolve algum dado específico
//rota: comunicação entre backend e frontend
// colocar tipo get (listar)
//colocar endereço (www.loja.com/produtos)

app.get('/users', async (request, response) =>  {
    
    const users = await prisma.user.findMany()
    response.status(200).json(users)

})
// quando acessar no meu site em users, vou cair aqui dentro
// ela precisa devolver os usuários



app.put('/users/:id', async (request, response) => {
    // console.log(request.body)
    // users.push(request.body)
    await prisma.user.update({
    where: {
        id: request.params.id
    },
     data: {
         email: request.body.email,
         name: request.body.name,
         age: request.body.age
     }
    })
     response.status(201).json(request.body)
     //201: deu tudo certo e criei o que foi solicitado
 }
 )


 app.delete('/users/:id', async (request, response) => {
    await prisma.user.delete({
        where: {
            id: request.params.id
        }
    })
    response.status(201).json({message: "Usuário deletado com sucesso"})
 })



// preciso falar para o meu servidor em que porta ele irá rodar
app.listen(3000)


//http status

//2xx - sucesso
//4xx - erro cliente (frontend)
//5xx - erro servidor (backend)
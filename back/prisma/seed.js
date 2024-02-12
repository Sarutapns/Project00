const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456')
const userData = [
  { name: 'toon', role: 'USER', address: '123 Street', phone: '1234567890', email: 'toon@ggg.mail', password},
  { name: 'you', role: 'USER', address: '456 Street', phone: '0987654321', email: 'you@ggg.mail', password },
  { name: 'jaidee', role: 'USER', address: '789 Street', phone: '9876543210', email: 'jaidee@ggg.mail', password},
];

const run = async () => {
  await prisma.user.createMany({
    data : userData
  })

}

run()
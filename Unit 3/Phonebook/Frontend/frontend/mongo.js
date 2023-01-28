const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Please provide password as as argument")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.2visior.mongodb.net/noteApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    "name": String,
    "number": Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')
                Person.find({})
                .then(persons=> {
                    console.log("phonebook: ")
                    persons.forEach(person => {
                        console.log(`${person.name} ${person.number}`)
                    })
                })
            .then(() => {
            return mongoose.connection.close()
            })
        })
        .catch((err) => console.log(err))
}

else {
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4]
            })
            return person.save()
            })
                .then((result) => {
                    console.log(`Added ${process.argv[3]} with number ${process.argv[4]} to phonebook.`)
                    return mongoose.connection.close()
                })
        .catch((err) => console.log(err))
}
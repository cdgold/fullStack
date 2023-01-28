
/*

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {

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
*/
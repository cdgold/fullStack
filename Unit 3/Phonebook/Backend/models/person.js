const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

console.log("connecting to", url)

mongoose.connect(url)
  .then(result => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const personSchema = new mongoose.Schema({
  "name": {
    type: String,
    minLength: 3,
    required: true
  },
  "number": {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        console.log("In validation function.")
        console.log("V is: ", v)
        if (/^\d{8,}$/.test(v) || /^\d{2,3}-\d+$/.test(v)) {
          return true
        }
        else {
          return false
        }
      },
    },
  },

})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema)

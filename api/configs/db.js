const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const DATABASE = `mongodb+srv://api_recruit:As4TapTe768DOS68@recruitment.mos8yva.mongodb.net/developer_exam?retryWrites=true&w=majority`
    await mongoose.connect(DATABASE)
    console.log("connect db success")
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB
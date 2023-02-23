import mongoose from "mongoose";

mongoose.connect("mongodb+srv://glaucooleme:mqPkB7lliTkoHJM6@alura.aarh42q.mongodb.net/alura-node")

let db = mongoose.connection;

export default db;
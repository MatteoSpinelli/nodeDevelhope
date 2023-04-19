import dotenv from "dotenv"
import express from "express"
import {
    getAll,
    getOneById,
    create,
    updateById,
    deleteById
} from "./controllers/planets.js"
dotenv.config()


const app = express()
app.use(express.json())

app.get("/api/planets", getAll)
app.get("/api/planets/:id", getOneById)
app.post("/api/planets", create)

app.put("/api/planets", updateById)
app.delete("/api/planets", deleteById)


app.listen(process.env.PORT, () => console.log(`Server listening at port:${process.env.PORT}`))
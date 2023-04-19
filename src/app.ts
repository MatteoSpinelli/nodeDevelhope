import dotenv from "dotenv"
import express from "express"
import pg from "pg-promise"
import {
    getAll,
    getOneById,
    create,
    updateById,
    deleteById
} from "./controllers/planets.js"
dotenv.config()

const pgp = pg()
export const db = pgp("postgres://postgres:dbAccess@localhost:5432/nodeDevelhope")
const setupDatabase = async () => {
    await db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets(
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL
        );
    `)
    await db.none("INSERT INTO planets (name) VALUES ('Earth')")
    await db.none("INSERT INTO planets (name) VALUES ('Mars')")
    await db.none("INSERT INTO planets (name) VALUES ('Jupiter')")
}
setupDatabase()

const app = express()
app.use(express.json())

app.get("/api/planets", getAll)
app.get("/api/planets/:id", getOneById)
app.post("/api/planets", create)

app.put("/api/planets", updateById)
app.delete("/api/planets", deleteById)


app.listen(process.env.PORT, () => console.log(`Server listening at port:${process.env.PORT}`))
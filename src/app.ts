import multer from "multer"
import dotenv from "dotenv"
import express from "express"
import pg from "pg-promise"
import {
    getAll,
    getOneById,
    create,
    updateById,
    deleteById,
    uploadImg
} from "./controllers/planets.js"
dotenv.config()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const uploader = multer({storage: storage})


const pgp = pg()
export const db = pgp("postgres://postgres:dbAccess@localhost:5432/nodeDevelhope")
const setupDatabase = async () => {
    await db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets(
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT
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
app.post("/api/planets/:id/image", uploader.single("image"), uploadImg)
app.post("/api/planets", create)
app.put("/api/planets", updateById)
app.delete("/api/planets", deleteById)


app.listen(process.env.PORT, () => console.log(`Server listening at port:${process.env.PORT}`))
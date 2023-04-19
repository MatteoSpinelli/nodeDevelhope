var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import multer from "multer";
import dotenv from "dotenv";
import express from "express";
import pg from "pg-promise";
import { getAll, getOneById, create, updateById, deleteById, uploadImg } from "./controllers/planets.js";
dotenv.config();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const uploader = multer({ storage: storage });
const pgp = pg();
export const db = pgp("postgres://postgres:dbAccess@localhost:5432/nodeDevelhope");
const setupDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets(
            id SERIAL NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT
        );
    `);
    yield db.none("INSERT INTO planets (name) VALUES ('Earth')");
    yield db.none("INSERT INTO planets (name) VALUES ('Mars')");
    yield db.none("INSERT INTO planets (name) VALUES ('Jupiter')");
});
setupDatabase();
const app = express();
app.use(express.json());
app.get("/api/planets", getAll);
app.get("/api/planets/:id", getOneById);
app.post("/api/planets/:id/image", uploader.single("image"), uploadImg);
app.post("/api/planets", create);
app.put("/api/planets", updateById);
app.delete("/api/planets", deleteById);
app.listen(process.env.PORT, () => console.log(`Server listening at port:${process.env.PORT}`));

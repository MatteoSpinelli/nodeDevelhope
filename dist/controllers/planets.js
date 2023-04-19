var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from "../app.js";
let planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db.many("SELECT * FROM planets");
    res.status(200).json(planets);
});
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const planet = yield db.oneOrNone("SELECT * FROM planets WHERE id=$1", id);
    planet ? res.status(200).json(planet) : res.status(401).json({ msg: "planet not found" });
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ msg: "you have to provide a name!" });
        return;
    }
    yield db.none("INSERT INTO planets (name) VALUES ($1)", name);
    res.status(201).json({ msg: "planet created" });
});
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    if (!id) {
        res.status(400).json({ msg: "you have to provide an id!" });
        return;
    }
    yield db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);
    res.status(200).json({ msg: "planet updated" });
});
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        res.status(400).json({ msg: "you have to provide an id!" });
        return;
    }
    yield db.none("DELETE FROM planets WHERE id=$1", id);
    res.status(200).json({ msg: "planet deleted" });
});
const uploadImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db.none("UPDATE planets SET image=$2 WHERE id=$1", [id, req.file.filename]);
    res.status(200).json({ msg: "image uploaded" });
});
export { getAll, getOneById, create, updateById, deleteById, uploadImg };

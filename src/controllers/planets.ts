import { Response, Request } from "express";
import { db } from "../app.js";
type Planet = {
    id: number,
    name: string,
};

type Planets = Planet[];
let planets: Planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];


const getAll = async (req: Request, res: Response) => {
    const planets = await db.many("SELECT * FROM planets")
    res.status(200).json(planets)
}

const getOneById = async (req: Request, res: Response) => {
    const { id } = req.params
    const planet = await db.oneOrNone("SELECT * FROM planets WHERE id=$1", id)
    planet ? res.status(200).json(planet) : res.status(401).json({ msg: "planet not found" })
}
const create = async (req: Request, res: Response) => {
    const { name } = req.body
    if (!name) {
        res.status(400).json({ msg: "you have to provide a name!" })
        return
    }
    await db.none("INSERT INTO planets (name) VALUES ($1)", name)
    res.status(201).json({ msg: "planet created"})
}
const updateById = async (req: Request, res: Response) => {
    const { id, name } = req.body
    if (!id) {
        res.status(400).json({ msg: "you have to provide an id!" })
        return
    }
    await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name])

    res.status(200).json({ msg: "planet updated" })
}
const deleteById = async (req: Request, res: Response) => {
    const { id } = req.body
    if (!id) {
        res.status(400).json({ msg: "you have to provide an id!" })
        return
    }
    await db.none("DELETE FROM planets WHERE id=$1", id)

    res.status(200).json({ msg: "planet deleted" })
}
const uploadImg = async (req: any, res: Response) => {
    const { id } = req.params
    await db.none("UPDATE planets SET image=$2 WHERE id=$1", [id, req.file.filename])
    res.status(200).json({ msg: "image uploaded" })
}
export {
    getAll,
    getOneById,
    create,
    updateById,
    deleteById,
    uploadImg
}
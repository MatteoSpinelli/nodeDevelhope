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
const getAll = (req, res) => {
    res.status(200).json(planets);
};
const getOneById = (req, res) => {
    const { id } = req.params;
    const planet = planets.find((planet) => planet.id === Number(id));
    planet ? res.status(200).json(planet) : res.status(401).json({ msg: "planet not found" });
};
const create = (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ msg: "you have to provide a name!" });
        return;
    }
    const planet = {
        id: planets[planets.length - 1].id + 1,
        name
    };
    planets = [...planets, planet];
    res.status(201).json({ msg: "planet created", planets });
};
const updateById = (req, res) => {
    const { id, name } = req.body;
    if (!id) {
        res.status(400).json({ msg: "you have to provide an id!" });
        return;
    }
    planets = planets.map((planet) => {
        if (planet.id === Number(id)) {
            return Object.assign(Object.assign({}, planet), { name });
        }
        return planet;
    });
    res.status(200).json({ msg: "planet updated", planets });
};
const deleteById = (req, res) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).json({ msg: "you have to provide an id!" });
        return;
    }
    planets = planets.filter((planet) => planet.id !== Number(id));
    res.status(200).json({ msg: "planet deleted", planets });
};
export { getAll, getOneById, create, updateById, deleteById };

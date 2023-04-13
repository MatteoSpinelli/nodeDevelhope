require("dotenv").config()
const express = require("express")
const app = express()

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

app.use(express.json())
app.use((req, res, next) => {
    console.log(req)
    res.status(200).json(req.body)
})
app.listen(process.env.PORT, () => console.log(`Server listening at port ${process.env.PORT}`))
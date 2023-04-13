const fs = require("fs")
fs.writeFile("out.txt", "ciao", (err) => {
    if (err) throw(err)
    console.log("write")
})
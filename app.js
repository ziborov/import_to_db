const express = require("express")
const fileUpload = require("express-fileupload")
const path = require("path")
const fs = require("fs")
const { PORT, PUBLIC, PUBLIC_PORT } = require("./constants/config")
const { STATUS_ERROR, STATUS_OK } = require("./constants/config")
const { deleteEmployees} = require("./data/employee.DB.ctrl")
const { deleteRates } = require("./data/rate.DB.ctrl")
const { saveFileToDb } = require("./data/importFileToDb")
const {deleteOneTimeRewardEmployees, getAllOneTimeRewardEmployees} = require("./data/oneTimeRewardEmployee.DB.ctrl");

const app = express();

app.use(express.static(PUBLIC))

const publicPath = `./${PUBLIC}`

if (!fs.existsSync(publicPath)){

    fs.mkdirSync(publicPath)

}

app.listen(PUBLIC_PORT)

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "/html/index.html"));

});

app.post('/upload',
    fileUpload({ createParentPath: true }),
    async (req, res) => {

        const files = req.files

        console.log(files)

        for (const key of Object.keys(files)) {

            const filepath = path.join(__dirname, PUBLIC, files[key].name)

            await files[key].mv(filepath, (err) => {

                if (err) return res.status(500).json({status: STATUS_ERROR, message: err})

            })

        }

        return res.json({status: STATUS_OK, message: Object.keys(files).toString()})

    }
)

app.get('/savetodb',async (req, res) => {

    const filesStr = req.query.files

    console.log(`filesStr: ${filesStr}`)

    const filesNames = filesStr.split(',')

    for (const file of filesNames) {

        const result = await saveFileToDb(file)

        if(!result) {

            return res.json({status: STATUS_ERROR, message: `Error reading ${file}`})

        }

    }

})

app.get('/clearemployees', async (req, res) => {

    const result = await deleteEmployees()

    if (result) {

        res.json({"message": "Employees cleared!"})

    } else {

        res.json({"message": "Error employees clearing!"})

    }

})

app.get('/clearrates', async (req, res) => {

    const result = await deleteRates()

    if (result) {

        res.json({"message": "Rates cleared!"})

    } else {

        res.json({"message": "Error rates clearing!"})

    }

})

app.get('/clear_one_time_reward_employees', async (req, res) => {

    const result = await deleteOneTimeRewardEmployees()

    if (result) {

        res.json({"message": "One time reward employees cleared!"})

    } else {

        res.json({"message": "One time reward employees clearing error!"})

    }

})

app.get('/one_time_reward_employees',async (req, res) => {

    const employees = await getAllOneTimeRewardEmployees()

    res.json(employees)

})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
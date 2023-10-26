const fs = require("fs");
const { PUBLIC } = require("../constants/config");
const path = require("path");
const { PlainTextFormatParser } = require("./parsers/plainTextFormatParser");
const utils = require("../tools/utils");
const {insertEmployees} = require("./employee.DB.ctrl");
const {insertRates} = require("./rate.DB.ctrl");
const {insertOneTimeRewardEmployees} = require("./oneTimeRewardEmployee.DB.ctrl");

const importFileToDb = async (fileName) => {

    try {

        const filePath = path.resolve(__dirname, `../${PUBLIC}/${fileName}`)

        const textLines = fs.readFileSync(filePath).toString().split("\r\n")

        const plainTextFormatParser = new PlainTextFormatParser(textLines)

        const employees = plainTextFormatParser.getEmployees()

        await insertEmployees(employees)

        const rates = plainTextFormatParser.getRates()

        await insertRates(rates)

        const oneTimeRewardEmployees = plainTextFormatParser.getOneTimeRewardEmployees()

        await insertOneTimeRewardEmployees(oneTimeRewardEmployees)

        return true

    } catch (err) {

        const error = `importFileToDb: ${utils.dumpError(err)}`

        console.log(`Error: ${error}`)

        return false

    }

}

module.exports = {
    saveFileToDb: importFileToDb
}
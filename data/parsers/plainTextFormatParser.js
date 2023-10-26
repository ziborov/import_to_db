const { EMPLOYEE_KEY, ID_KEY, DEPARTMENT_KEY, RATE_KEY, EMPLOYEE_TYPE, RATE_TYPE, DEPARTMENT_TYPE, SALARY_KEY, SALARY_TYPE, DONATION_KEY, DONATION_TYPE, NAME_KEY,
    SURNAME_KEY, STATEMENT_KEY, AMOUNT_KEY, DATE_KEY,
    RATES_KEY,
    SIGN_KEY,
    VALUE_KEY,
    USD_SIGN,
    POOL
} = require("./keys");


class PlainTextFormatParser {

    constructor(lines) {

        this.lines = lines

        this.employees = []

        this.rates = []

        this.oneTimeRewardEmployees = []

        this.currentEmployee = null

        this.currentSalary = []

        this.currentDonations = []

        this.currentRate = null

        this.keyIdNameType = 0

        this.currentStatement = null

        this.currentDonation = null

    }

    getEmployees () {

        const keyProcessing = (key) => {

            if(!key.includes(':')) {

                switch (key) {

                    case EMPLOYEE_KEY:

                        if (this.currentEmployee !== null) {

                            if(this.currentStatement !== null) {

                                this.currentSalary.push(this.currentStatement)

                            }

                            this.currentEmployee.salary = this.currentSalary

                            if(this.currentDonation !== null) {

                                this.currentDonations.push(this.currentDonation)

                            }

                            this.currentEmployee.donations = this.currentDonations

                            this.employees.push(this.currentEmployee)

                            this.currentSalary = []

                            this.currentStatement = null

                            this.currentDonations = []

                            this.currentDonation = null

                        }

                        this.currentEmployee = {

                            id: 0,
                            firstName: "",
                            lastName: "",
                            salary: [],
                            donations: [],
                            departmentId: 0,
                            departmentName: "",
                            oneTimeReward: 0,
                            totalDonation: 0,
                            poolPercentages: 0

                        }

                        this.keyIdNameType = EMPLOYEE_TYPE

                        break

                    case RATE_KEY:

                        if (this.currentRate !== null) {

                            this.rates.push(this.currentRate)

                        }

                        this.currentRate = {

                            date: null,

                            sign: null,

                            value: null,

                        }

                        this.keyIdNameType = RATE_TYPE

                        break

                    case DEPARTMENT_KEY:

                        this.keyIdNameType = DEPARTMENT_TYPE

                        break

                    case SALARY_KEY:

                        this.keyIdNameType = SALARY_TYPE

                        break

                    case RATE_KEY:

                        this.keyIdNameType = RATE_TYPE

                        break

                    case RATES_KEY:

                        this.keyIdNameType = RATE_TYPE

                        if (this.currentEmployee !== null) {

                            if(this.currentStatement !== null) {

                                this.currentSalary.push(this.currentStatement)

                            }

                            this.currentEmployee.salary = this.currentSalary

                            if(this.currentDonation !== null) {

                                this.currentDonations.push(this.currentDonation)

                            }

                            this.currentEmployee.donations = this.currentDonations

                            this.employees.push(this.currentEmployee)

                            this.currentSalary = []

                            this.currentStatement = null

                            this.currentDonations = []

                            this.currentDonation = null

                        }

                        break

                    case DONATION_KEY:

                        if (this.currentDonation !== null) {

                            this.currentDonations.push(this.currentDonation)

                        }

                        this.currentDonation = {

                            id: 0,

                            date: null,

                            rateIndex: 0,

                            amount: null,

                            sign: null,

                        }

                        this.keyIdNameType = DONATION_TYPE

                        break

                    case STATEMENT_KEY:

                        if (this.currentStatement !== null) {

                            this.currentSalary.push(this.currentStatement)

                            this.currentStatement = {}

                        }

                        this.currentStatement = {

                            id: 0,

                            amount: 0,

                            date: null

                        }

                        this.keyIdNameType = SALARY_TYPE

                        break

                    default:

                        //console.log(`Error key: ${key}`)

                }

            } else {//if :

                const devKey = key.split(':')

                const swKey = devKey[0].trim()

                switch (swKey) {

                    case ID_KEY:

                        const idNum = parseInt(devKey[1].trim(), 10)

                        switch (this.keyIdNameType) {

                            case EMPLOYEE_TYPE:

                                this.currentEmployee.id = idNum

                                break

                            case DEPARTMENT_TYPE:

                                this.currentEmployee.departmentId = idNum

                                break

                            case SALARY_TYPE:

                                this.currentStatement.id = idNum

                                break

                            case DONATION_TYPE:

                                this.currentDonation.id = idNum

                                break

                            default:

                                console.log(`Error ":" ID_KEY this.keyIdNameType: ${this.keyIdNameType}`)

                        }

                        break

                    case NAME_KEY:

                        const keyName = devKey[1].trim()

                        switch (this.keyIdNameType) {

                            case EMPLOYEE_TYPE:

                                this.currentEmployee.firstName = keyName

                                break

                            case DEPARTMENT_TYPE:

                                this.currentEmployee.departmentName = keyName

                                break

                            default:

                                console.log(`Error ":" keyName this.keyIdNameType: ${this.keyIdNameType}`)

                        }

                        break

                    case AMOUNT_KEY:

                        const keyAmount = parseFloat(devKey[1].trim())

                        switch (this.keyIdNameType) {

                            case SALARY_TYPE:

                                this.currentStatement.amount = keyAmount

                                break

                            case DONATION_TYPE:

                                const amountCurrency = devKey[1].trim().split(' ')

                                this.currentDonation.amount = parseFloat(amountCurrency[0])

                                this.currentDonation.sign = amountCurrency[1]

                                break

                            case RATE_TYPE:

                                this.currentRate.amount = keyAmount

                                break

                            default:

                                console.log(`Error ":" AMOUNT_KEY this.keyIdNameType: ${this.keyIdNameType}`)

                        }

                        break

                    case DATE_KEY:

                        const keyDate = devKey[1].trim()

                        const date = new Date(keyDate)

                        const rateDateMillSec = date.getTime()

                        switch (this.keyIdNameType) {

                            case SALARY_TYPE:

                                this.currentStatement.date = rateDateMillSec

                                break

                            case DONATION_TYPE:

                                this.currentDonation.date = rateDateMillSec

                                break

                            case RATE_TYPE:

                                this.currentRate.date = rateDateMillSec

                                break

                            default:

                                console.log(`Error ":" AMOUNT_KEY this.keyIdNameType: ${this.keyIdNameType}`)

                        }

                        break

                    case SURNAME_KEY:

                        const keySurname = devKey[1].trim()

                        this.currentEmployee.lastName = keySurname

                        break

                    case SIGN_KEY:

                        const keySign = devKey[1].trim()

                        this.currentRate.sign = keySign

                        break

                    case VALUE_KEY:

                        const keyValue = devKey[1].trim()

                        this.currentRate.value = keyValue

                        break

                    default:

                        console.log(`Error : key: ${swKey}`)

                }

            }

        }

        this.lines.forEach(key => {

            key = key.trim()

            keyProcessing(key);

        })

        this.employees.forEach(employee => {

            if (employee.donations.length > 0) {

                employee.totalDonation = 0

                employee.donations.forEach(donation => {

                    let lastRateValue = 1

                    this.rates.forEach((rate, rateIndex) => {

                        if (donation.sign === USD_SIGN) {

                            lastRateValue = 1

                        } else {

                            if (rate.sign === donation.sign) {

                                if (rate.date < donation.date) {

                                    if (donation.rateIndex === 0) {

                                        donation.rateIndex = rateIndex

                                        lastRateValue = rate.value

                                    } else {

                                        if (rateIndex > donation.rateIndex) {

                                            donation.rateIndex = rateIndex

                                            lastRateValue = rate.value

                                        }

                                    }

                                }

                            }

                        }

                    })

                    employee.totalDonation += lastRateValue * donation.amount

                })

            }

        })

        let fullDonations = 0

        this.employees.forEach(employee => {

            fullDonations += employee.totalDonation

        })

        this.employees.forEach(employee => {

            if (employee.totalDonation > 100) {

                const poolPercentages = ( employee.totalDonation / fullDonations ) * 100

                employee.poolPercentages = poolPercentages

                employee.oneTimeReward = ( POOL / 100 ) * poolPercentages

                this.oneTimeRewardEmployees.push(employee)

            }

        })

        return this.employees

    }

    getRates () {

        return this.rates

    }

    getOneTimeRewardEmployees () {

        return this.oneTimeRewardEmployees

    }

}

module.exports = {

    PlainTextFormatParser

}
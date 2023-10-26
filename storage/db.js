const { DB_URL } = require('../constants/config')

const DB_TEST = "test";
const COLLECTION_EMPLOYEES = "employees"
const COLLECTION_ONE_TIME_REWARD_EMPLOYEE = "one_time_reward_employees"
const COLLECTION_RATES= "rates"


const options = { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 10 }

module.exports = {
    DB_URL,
    options,
    DB_TEST,
    COLLECTION_EMPLOYEES,
    COLLECTION_RATES,
    COLLECTION_ONE_TIME_REWARD_EMPLOYEE
}

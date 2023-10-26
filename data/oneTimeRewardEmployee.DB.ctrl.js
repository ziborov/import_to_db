const db = require("../storage/db");
const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(db.DB_URL,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

const insertOneTimeRewardEmployee = async (employee) => {

    try {

        await client.connect();

        const collection = client.db(db.DB_TEST).collection(db.COLLECTION_ONE_TIME_REWARD_EMPLOYEE);

        await collection.insertOne(employee)

        await client.close()

        return true

    } catch (err){

        await client.close()

        return false

    }

}

const insertOneTimeRewardEmployees = async (employees) => {

    try {

        await client.connect();

        const collection = client.db(db.DB_TEST).collection(db.COLLECTION_ONE_TIME_REWARD_EMPLOYEE);

        for (const employee of employees) {

            await collection.insertOne(employee)

        }

        await client.close()

        return true

    } catch (err){

        await client.close()

        return false

    }

}

const getAllOneTimeRewardEmployees = async () => {

    try {

        await client.connect();

        const collection = client.db(db.DB_TEST).collection(db.COLLECTION_ONE_TIME_REWARD_EMPLOYEE);

        const data = await collection.find({}).toArray();

        await client.close()

        return data

    } catch (err){

        await client.close()

        return false

    }

}

const deleteOneTimeRewardEmployees = async () => {

    try {

        await client.connect();

        const collection = client.db(db.DB_TEST).collection(db.COLLECTION_ONE_TIME_REWARD_EMPLOYEE);

        await collection.deleteMany({})

        await client.close()

        return true

    } catch (err){

        await client.close()

        return false

    }

}

module.exports = {
    insertOneTimeRewardEmployee,
    insertOneTimeRewardEmployees,
    deleteOneTimeRewardEmployees,
    getAllOneTimeRewardEmployees
}
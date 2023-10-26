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

const insertEmployee = async (employee) => {

    try {

        await client.connect();

        const collection = client.db(db.DB_TEST).collection(db.COLLECTION_EMPLOYEES);

        await collection.insertOne(employee)

        await client.close()

        return true

    } catch (err){

        await client.close()

        return false

    }

}

const insertEmployees = async (employees) => {

    try {

        await client.connect();

        const collection = client.db(db.DB_TEST).collection(db.COLLECTION_EMPLOYEES);

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

const deleteEmployees = async () => {

    try {

        await client.connect();

        const collection = client.db(db.DB_TEST).collection(db.COLLECTION_EMPLOYEES);

        await collection.deleteMany({})

        await client.close()

        return true

    } catch (err){

        await client.close()

        return false

    }

}

module.exports = {
    insertEmployee,
    insertEmployees,
    deleteEmployees
}
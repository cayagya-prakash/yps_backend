import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from 'mongodb' 

const Url = "mongodb://localhost:27017/ca_yps"
const client = new MongoClient(Url)
const dbName = 'ca_yps';

export const db = async() =>{
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    return {
        blogs: db.collection("blogs"),
        user:db.collection("user"),
        career:db.collection("career"),
        jobApplications:db.collection("jobApplications"),
        inquery:db.collection("inuery")
    };

}



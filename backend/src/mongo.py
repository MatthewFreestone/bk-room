from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os

mongo_url = os.getenv("MONGO_URL")

if mongo_url is None:
    raise Exception("MONGO_URL not set")

client = MongoClient(mongo_url, server_api=ServerApi('1'))
env = os.getenv("MONGO_ENV")
db = client[env]

def write_to_db(data):
    db.appt.insert_one(data)

def delete_from_db(appt_id: str):
    db.appt.delete_one({"appt_id": appt_id})

def get_all_entries():
    return db.appt.find()

# read all entries
def main():
    for entry in db.appt.find():
        print(entry)

if __name__ == '__main__':
    main()

from flask import Flask, jsonify, request
import json
import pymongo
import argparse 
from bson.objectid import ObjectId

def parseOpts(): 
    parser = argparse.ArgumentParser(
        description = "setting up server", 
        formatter_class= argparse.RawTextHelpFormatter
    )

    parser.add_argument(
        "-u", "--user", action="store", dest="user", required=True,
        help=("username for connecting to mongodb")
    )

    parser.add_argument(
        "-p", "--password", action="store", dest="password", required=True,
        help=("password for connecting to mongodb")
    )
    
    opt = parser.parse_args()
    return opt

opt = parseOpts()
app = Flask(__name__)
CONNECTION_STRING = "mongodb+srv://" + opt.user + ":" + opt.password + "@cluster-sahifa-tm3bl.mongodb.net/test?retryWrites=true&w=majority"
mongo = pymongo.MongoClient(CONNECTION_STRING, maxPoolSize=50, connect=False)

collection = mongo.notesite.notesList

@app.route('/getNote')
def getNote():
    document = collection.find()
    # document['_id'] = str(document['_id'])
    return jsonify({"text" : str(document)})

@app.route('/saveNote', methods=['POST'])
def saveNote():
    info = request.get_json()
    document = collection.update_one({
        "_id": ObjectId(info["_id"])
    },
    {
        "$set": {
            "data": info["data"]
        }
    })
    return jsonify({"code" : str(document.acknowledged) })

@app.route('/addNote', methods=['POST'])
def addNote():
    info = request.get_json()
    document = collection.insert_one({"title": info["title"], "data": "null"})
    return jsonify({"code" : str(document.acknowledged), "_id": str(document.inserted_id) })

@app.route('/deleteNote', methods=['POST'])
def deleteNote():
    info = request.get_json()
    document = collection.delete_one({"_id": ObjectId(info["_id"])})
    return jsonify({"code" : str(document.acknowledged)})


if __name__ == '__main__':
    app.run(debug=True)
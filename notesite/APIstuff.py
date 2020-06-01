from flask import Flask, jsonify, request
import json
import pymongo
import argparse 
#from bson.objectid import ObjectId

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

@app.route('/getNote', methods=['POST'])
def getNote():
    info = request.get_json()
    document = collection.find_one({"title": info["title"]})
    document['_id'] = str(document['_id'])
    return jsonify(document)

@app.route('/saveNote', methods=['POST'])
def saveNote():
    info = request.get_json()
    collection.update_one({
        "title": info["title"]
    },
    {
        "$set": {
            "list": info["list"]
        }
    })
    return jsonify({"code" : 200 })

@app.route('/addNote', methods=['POST'])
def addNote():
    info = request.get_json()
    collection.insert_one({"title": info["title"]})
    return jsonify({"code" : 200 })

@app.route('/deleteNote', methods=['POST'])
def deleteNote():
    info = request.get_json()
    collection.delete_one({"title": info["title"]})
    return jsonify({"code" : 200})


if __name__ == '__main__':
    app.run(debug=True)
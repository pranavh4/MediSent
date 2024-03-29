from flask import Flask, render_template
from flask import jsonify, request
import requests

app = Flask(__name__, static_folder="build/static", template_folder="build")


@app.route("/api",methods=['POST'])
def api_call():
    r = request.get_json()
    lat = r["lat"]
    lng = r["lng"]
    print(lat,lng)
    r= requests.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={},{}&radius=1500&type=pharmacy&key=API_KEY".format(lat,lng))  
    r = r.json()
    res = {"data":[]}
    for i in r["results"][:10]:
        data = {}
        data["lat"] = i["geometry"]["location"]["lat"]
        data["lng"] = i["geometry"]["location"]["lng"]
        data["name"] = i["name"]
        try:
            data["rating"] = i["rating"]
        except KeyError:
            data["rating"] = "None"
        data["address"] = i["vicinity"]    
        res["data"].append(data)
    print(res)
    return jsonify(res)

print('Starting Flask!')
app.debug=True
app.run(host='0.0.0.0')


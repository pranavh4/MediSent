import ast

r={}
dat = ""
with open("test.txt") as fil:
    dat = fil.read()

r = ast.literal_eval(dat)
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
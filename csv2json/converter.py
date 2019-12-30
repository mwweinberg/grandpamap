import csv
import json



out_list = []

exampleFile = open('metadata.csv')
exampleReader = csv.reader(exampleFile)
exampleData = list(exampleReader)

for item in exampleData:
    print(item[0])
    print('**')

    #variables to create the file names here
    previewlocation = "/data/preview/" + item[1] + ".jpg"
    print('previewlocation: ' + previewlocation)
    documentlocation = "/data/docs/" + item[1] + ".pdf"

    #creates a dictionary for each line
    out_dict = {"type": "Feature", "properties": {"OriginalFilename":item[0], "NewFileName":item[1], "TimeStamp": item[2], "Year":int(item[3]), "Month":int(item[4]), "Day":int(item[5]), "LocationName":item[6], "PreviewLocation": previewlocation, "DocumentLocation": documentlocation, "Pages": int(item[9]), "Author": item[10], "Recipient": item[11], "Photo": int(item[12]), "Lat": float(item[13]), "Lon": float(item[14]), "Notable": item[15]}, "geometry": {"type": "Point", "coordinates": [float(item[14]), float(item[13])]}}

    #which is then appended to the list
    out_list.append(out_dict)

#print(out_list)

#the list of dictionaries is added to the output dictionary that has all of the other stuff that the geojson needs
final_dict = {"type": "FeatureCollection", "features": out_list}

with open('outlnglat.json', 'w') as fout:
    json.dump(final_dict, fout)
#json.dumps(final_dict)



#Python3

#Run this in the directory above the one that holds the test_pdfs
#and make sure to change the input and output folders

#also make sure to create the output folder

import os
from pdf2image import convert_from_path

input_folder = './docs/'
output_folder = 'preview/'


#create a list
pdfFile = []

#add all of the pdf filenames to the list
for filename in os.listdir(input_folder):
    if filename.endswith('.pdf'):
        pdfFile.append(filename)
#alphabetize the list
pdfFile.sort(key=str.lower)

print(pdfFile)


#reads each of the filenames from the list
for filename in pdfFile:
    #this counter is to make sure that only the first page is turned into an image
    count = 1
    #this makes the filename usable below
    full_filename = input_folder + filename
    #this can be removed - it just helps see that things are running
    print(full_filename)

    #this is the pdf conversion
    #outputs images with a width of 200 px
    images = convert_from_path(full_filename, size=200)

    #opens each converted pdf and writes the first page as an image
    for image in images:
        if count < 2:
            #creates the filename without a pdf extension
            output_filename = output_folder + filename.strip('.pdf') + '.jpg'
            #writes the file
            image.save(output_filename, "JPEG")
            count = count + 1
        else:
            pass



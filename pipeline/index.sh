rm -Rf ./database
mkdir ./database

curl -k https://www.worldcubeassociation.org/export/results/v2/tsv -L --output "./database/export.zip"

unzip ./database/export.zip -d ./database

node ./pipeline/index.js

rm -Rf ./database
rm -Rf ./wcaExport.json
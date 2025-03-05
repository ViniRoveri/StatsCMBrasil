rm -Rf ./database
mkdir ./database

curl -k https://www.worldcubeassociation.org/export/results/WCA_export.tsv.zip -L --output "./database/export.zip"

unzip ./database/export.zip -d ./database

node ./pipeline/services/pipeline/index.js

rm -Rf ./database
rm -Rf ./wcaExport.json
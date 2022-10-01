npm install -g webpack // install webpack

cd node_modules/mqtt
npm install . // install dev dependencies
webpack mqtt.js ./browserMqtt.js --output-library mqtt
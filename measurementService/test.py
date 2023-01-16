import json
import logging
import random
import time

import paho.mqtt.client as mqtt

# CONFIGS
SENSOR_NAMES = ['roastie-sensor1-test', 'roastie-sensor2-test', 'roastie-sensor3-test']

# MQTT
CONNECT_MQTT = True
MQTT_CLIENT_NAME = "ModbusClient"
MQTT_BROKER_NAME = "test.mosquitto.org"

# LOGGING
SAVE_TO_FILE = False
LOG_LEVEL = logging.INFO
LOG_FILE_NAME = "modbus-test.log"

# PROGRAM
def connect_mqtt(client_name, broker_name):
    client_mqtt = mqtt.Client(client_name)
    client_mqtt.connect(host=broker_name, port=1883)
    return client_mqtt

def updateValue(oldValue):
    newValue = oldValue+(random.random() - 0.5)
    if(newValue> 200):
        return 200
    if(newValue<0):
        return 0
    return newValue

if SAVE_TO_FILE:
    logging.basicConfig(filename=LOG_FILE_NAME, level=logging.DEBUG)
else:
    logging.basicConfig(level=LOG_LEVEL)

if CONNECT_MQTT:
    isConnected = False
    
    while not isConnected:
        try:
            client = connect_mqtt(MQTT_CLIENT_NAME, MQTT_BROKER_NAME)
            isConnected = True
        except:
            logging.warning("Could not connect to mqtt broker. Trying again...")
            time.sleep(5)

logging.info("Not connected to modbus. Test-Script selected!")

testValue=[random.random()*200,random.random()*200,random.random()*200]

while True:
    for i in range(3):
        data = {"sensorName": SENSOR_NAMES[i], "time": time.time(), "value": testValue[i]}
        testValue[i] = updateValue(testValue[i])
        tempdata = json.dumps(data)
        if CONNECT_MQTT:
            try:
                client.publish(SENSOR_NAMES[i], tempdata, qos=0)
                logging.info("Published " + str(testValue[i]) + " °C, from Sensor: " + SENSOR_NAMES[i])
                time.sleep(1)
            except:
                logging.warning('Failed to publish to mqtt')
                client.disconnect()
                client = connect_mqtt(MQTT_CLIENT_NAME, MQTT_BROKER_NAME)

    time.sleep(0.5)

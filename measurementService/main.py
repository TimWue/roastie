import json
import logging
import paho.mqtt.client as mqtt
import time
from pymodbus.client.sync import ModbusTcpClient

# CONFIGS
# MODBUS
MODBUS_IP = '192.168.178.250'
MODBUS_PORT = 502
SENSOR_NAMES = ['sensor1', 'sensor2', 'sensor3']
MODBUS_REGISTER_ADDRESSES = [1000, 2000, 3000]

# MQTT
CONNECT_MQTT = True
MQTT_CLIENT_NAME = "ModbusClient"
MQTT_BROKER_NAME = "localhost"

# LOGGING
SAVE_TO_FILE = True
LOG_LEVEL = logging.INFO
LOG_FILE_NAME = "modbus.log"

# PROGRAM
def connect_modbus(ip, port):
    client_modbus = ModbusTcpClient(ip, port)
    client_modbus.connect()
    return client_modbus


def connect_mqtt(client_name, broker_name):
    client_mqtt = mqtt.Client(client_name)
    client_mqtt.connect(broker_name)
    return client_mqtt


if SAVE_TO_FILE:
    logging.basicConfig(filename=LOG_FILE_NAME, level=logging.DEBUG)
else:
    logging.basicConfig(level=LOG_LEVEL)

if CONNECT_MQTT:
    client = connect_mqtt(MQTT_CLIENT_NAME, MQTT_BROKER_NAME)

mbclient = connect_modbus(MODBUS_IP, MODBUS_PORT)
logging.info("Connected to " + MODBUS_IP + " on Port " + str(MODBUS_PORT))

while True:
    for i in range(3):
        rectemp = 0.1
        try:
            rec = None
            rec = mbclient.read_input_registers(MODBUS_REGISTER_ADDRESSES[i], 3)
            if rec:
                rectemp = rec.registers[2] / 40
                logging.info('Received ' + str(rectemp))
        except:
            logging.warning('Failed to Connect to Modbus')
            mbclient.close()
            time.sleep(2)
            mbclient = connect_modbus(MODBUS_IP, MODBUS_PORT)


        data = {"sensorName": SENSOR_NAMES[i], "time": time.time(), "value": rectemp}
        tempdata = json.dumps(data)
        if CONNECT_MQTT:
            try:
                client.publish(SENSOR_NAMES[i], tempdata)
                logging.info("Published " + str(rectemp) + " °C, from Sensor: " + SENSOR_NAMES[i])
            except:
                logging.warning('Failed to publish to mqtt')
                client.disconnect()
                client = connect_mqtt(MQTT_CLIENT_NAME, MQTT_BROKER_NAME)

    time.sleep(0.5)

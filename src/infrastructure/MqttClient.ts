import { connect, MqttClient } from "mqtt/dist/mqtt";
import { Measurement } from "../domain/roast/Roast";

export class MqttClientConnection {
  private client: MqttClient;

  constructor(host: string) {
    this.client = connect(host);
  }

  public subscribe(
    topic: string | string[],
    handler: (topic: string, measurement: Measurement) => void
  ) {
    this.client.subscribe(topic, (err: Error, granted) => {
      err && console.log("MQTT Error: " + err.message);
      console.log("MQTT Granted: " + JSON.stringify(granted));
    });
    this.client.on("message", function (topic, message) {
      const messageObject = JSON.parse(message.toString()) as { value: string };
      const measurement: Measurement = {
        x: Date.now(),
        y: Number(Number(messageObject.value).toFixed(2)),
      };

      console.log("Received measurement ("+ topic+"): " + JSON.stringify(measurement));
      handler(topic, measurement);
    });
  }

  public unsubscribe(topics: string[]) {
    this.client.unsubscribe(topics);
  }
}

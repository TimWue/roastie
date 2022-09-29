import { connect, MqttClient } from "mqtt";

class MqttClientConnection {
  private client: MqttClient;

  constructor(host: string) {
    this.client = connect(host);
  }

  public subscribe(
    topic: string,
    handler: (topic: string, message: string) => void
  ) {
    this.client.subscribe(topic, (err, granted) => {
      console.error(err.message);
    });
    this.client.on("message", function (topic, message) {
      handler(topic, message.toString());
    });
  }
}

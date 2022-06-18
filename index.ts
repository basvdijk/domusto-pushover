// DOMUSTO
import config from "../../config";
import DomustoPlugin from "../../domusto/DomustoPlugin";

// INTERFACES
import { Domusto } from "../../domusto/DomustoTypes";

// PLUGIN SPECIFIC
import axios from "axios";

/**
 * Pushover plugin for DOMUSTO
 * @author Bas van Dijk
 * @version 0.0.1
 *
 * @class DomustoPushover
 * @extends {DomustoPlugin}
 */
class DomustoPushover extends DomustoPlugin {
  private PushoverInstances = [];

  /**
   * Creates an instance of DomustoPushover.
   * @param {any} Plugin configuration as defined in the config.js file
   * @memberof DomustoPushover
   */
  constructor(pluginConfiguration: Domusto.PluginConfiguration) {
    super({
      plugin: "Pushover executer",
      author: "Bas van Dijk",
      category: Domusto.PluginCategories.push,
      version: "0.0.1",
      website: "http://domusto.com",
    });

    this.pluginConfiguration = pluginConfiguration;

    const isConfigurationValid = this.validateConfigurationAttributes(
      pluginConfiguration.settings,
      [
        {
          attribute: "apiToken",
          type: "string",
        },
        {
          attribute: "userKey",
          type: "string",
        },
      ]
    );

    if (isConfigurationValid) {
      this.console.header(
        `${pluginConfiguration.id} plugin ready for sending / receiving data`
      );
    }
  }

  /**
   * Executed when a signal is received for this plugin
   *
   * @param {Domusto.Signal} signal
   * @memberof DomustoPushover
   */
  onSignalReceivedForPlugin(signal: Domusto.Signal) {
    switch (signal.deviceId) {
      case "note":
        this.sendNoteToAll(signal.data["title"], signal.data["message"]);
        break;
      case "link":
      case "file":
      default:
        this.console.error("No Pushover action defined for ", signal.deviceId);
        break;
    }
  }

  /**
   * Push message to all subscribed api keys
   *
   * @param {string} title Message title
   * @param {string} message Message content
   * @memberof DomustoPushover
   */
  sendNoteToAll(title: string, message: string) {
    const url = "https://api.pushover.net/1/messages.json";

    const data = {
      token: this.pluginConfiguration.settings.apiToken,
      user: this.pluginConfiguration.settings.userKey,
      title,
      message,
      priority: 2,
      retry: 30,
      expire: 1,
    };

    axios
      .post(url, data)
      .then((res) => {
        console.log(`Status: ${res.status}`);
        console.log("Student Info: ", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default DomustoPushover;

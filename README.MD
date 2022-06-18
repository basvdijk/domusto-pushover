# Pushover

```
plugin:    Allows DOMUSTO to send Pushover push messages to your devices
author:    Bas van Dijk
category:  system
version:   0.0.1
website:   http://domusto.com
```

## Hardware needed
- none

## Software needed
- [https://pushover.net](pushover.net) account

## Tested with
 - RFXcom events

## Installation
```sh
$ ./domusto.js plugin add basvdijk/domusto-pushover
```

## Get Pushover access token
The Pushover plugin need acces to the Pushover API. To grand DOMUSTO access you'll need an access token so the Pushover server knows who you are. You can get one from the [Pushover website](https://pushover.net)) page.

The DOMUSTO Pushover plugin supports to broadcast to mutiple Pushover users. An use case could be a doorbell where multiple Pushover users need to be notified when pressed.
 
## Configuration

1. Add the section below to your `config.ts`
2. Restart DOMUSTO

```js
{
    id: 'PUSHOVER',
    enabled: true,
    settings: {
        apiToken: '<ACCESS TOKEN>',
        userKey: '<USER KEY>',
    },
}
```

## Example device

```js
{
    id: 'CHIME1',
    screens: ['test'],
    enabled: true,
    role: 'output',
    name: 'doorbell',
    type: 'switch',
    subType: 'momentary',
    plugin: {
        id: 'RFXCOM',
        deviceId: 'Chime1/SELECT_PLUS-0x00123EF',
    },
    triggers: [
        {
            listenToEvents: ['trigger'],
            pluginId: 'SHELL',
            deviceId: 'shell',
            data: {
                shellCommand: 'aplay build/assets/audio/doorbell.wav'
            }
        },
        {
            listenToEvents: ['trigger'],
            pluginId: 'PUSHOVER',
            deviceId: 'note',
            data: {
                title: 'Doorbell',
                message: 'Ding Dong!'
            }
        },
    ],
},
```
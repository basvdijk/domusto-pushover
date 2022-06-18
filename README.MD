# Pushbullet

```
plugin:    Allows DOMUSTO to send Pushbullet push messages to your devices
author:    Bas van Dijk
category:  system
version:   0.0.1
website:   http://domusto.com
```

## Hardware needed
- none

## Software needed
- Pushbullet.com account

## Tested with
 - RFXcom events

## Installation
```sh
$ ./domusto.js plugin install basvdijk/domusto-pushbullet
```

## Get Pushbullet access token
The Pushbullet plugin need acces to the Pushbullet API. To grand DOMUSTO access you'll need an access token so the Pushbullet server knows who you are. You can get one from the [Pushbullet Account Settings](https://www.pushbullet.com/#settings/account) page.

The DOMUSTO Pushbullet plugin supports to broadcast to mutiple Pushbullet users. An use case could be a doorbell where multiple Pushbullet users need to be notified when pressed.
 
## Configuration

1. Add the section below to your `config.ts`
2. Restart DOMUSTO

```js
{
    id: 'PUSHBULLET',
    enabled: true,
    settings: {
        accessTokens: [
            '<ACCESS TOKEN 1>',
            '<ACCESS TOKEN 2>'
        ],
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
            pluginId: 'PUSHBULLET',
            deviceId: 'note',
            data: {
                title: 'Doorbell',
                message: 'Ding Dong!'
            }
        },
    ],
},
```
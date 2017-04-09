# IOT Term Project
:::info
侯仲威、邱垂浩
:::
## Requirement
![](https://i.imgur.com/9vrKpEM.png)



## Simple Software Model
![](https://i.imgur.com/r7TBopx.jpg)

Using [Draw.io](https://www.draw.io/#G0B3VhXejlk0FEODF3Y0oxZ2pDUEk)



## Implementation

### 第一階段:
研究CoAP, 先實做Arduino與NodeJS的部份
- Arduino端所有的Hardware Control
- Arduino端 CoAP Server
- NodeJS端 CoAP Client

希望達成目標:
- 能在NodeJS端看到Arduino 溫度與LED燈狀態
- 能在NodeJS端將Arduino狀態寫入MongoDB
- 能從NodeJS端控制LED燈開關



## Resource
- Arduino Dev.
    - [Arduino CoAP Lib. implementation](https://github.com/dgiannakop/Arduino-CoAP/tree/121cb7df00441021ab00f1f9c8fbb369d9977289)
    - [Arduino Mirco Server](https://github.com/1248/microcoap)
    - [Arduino CoAP Server Implementation](https://internetofhomethings.com/homethings/?tag=esp8266-coap)

- Node.JS Dev.
    - [Node.JS Learning Notes](https://hackmd.io/CwZmAYCME5oNgLTWAU2g4BGAJsJBDFRfOADm300wFZ9g6g==?view#)
    - [npm package: CoAP](https://www.npmjs.com/package/coap)
    - [CoAP with DB](http://niutech.github.io/designiot/#coap-%E6%95%B0%E6%8D%AE%E5%BA%93%E6%9F%A5%E8%AF%A2)

- Android Dev.
    - [3rd parties HTTP Lib.](http://huli.logdown.com/posts/280423-android-volley-useful-network-related-library)

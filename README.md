# IOT Term Project
:::info
邱垂浩 侯仲威

GitHub page: https://github.com/cy91244/IOT-Project/
:::

## Requirement
![](https://i.imgur.com/Ec0Fa3b.png)

## Simple Software Model 
![](https://i.imgur.com/bzScuyN.png)

## Implementation
### Arduino Sensors HUB and CoAP Client
- Hardware
    - pinA0 -> temperature sensor
    - pin13 -> LED
    - pin4 -> ESP8266 TX
    - pin5 -> ESP8266 RX
    - 5V -> ESP8266 VCC & CH_PD
    - GND -> ESP GND
- Setup
    - 設定ESP8266與電腦的serial port的baudrate
    - 利用AT指令集使ESP8266連上Wifi
    - 將LED預設為關
    - 製作一個buffer，其內容為CoAP的封包格式
- Loop
    - 讀取溫度sensor
    - 自動偵測模式下，溫度超過30度會觸發LED亮起
    - 更改封包的內容，將溫度、LED狀態與message id改成現在的狀態
    - 利用ESP8266送出CoAP封包後等待回應
    - 依照回應的內容決定是否要更新LED的狀態

### Gateway Server
- CoAP Server
    - 接收來自Arduino的CoAP封包
        - 讀取溫度與LED燈資料
        - 更新MongoDB資料庫資料
        - 傳送Web API控制LED的回應給Arduino
- Web API Server
    - GET 最近20筆Arduino的溫度與LED資料
    - GET Arduino歷史最高溫/最低溫資料
    - GET Arduino最近(x小時)的最高溫/最低溫資料
    - PUT 控制Arduino LED的模式(開/關/自動偵測)

### Web Interface
- 最近20筆Arduino的溫度動態折線圖
- 歷史/最近十秒內的最高溫最低溫動態資料
- 顯示LED燈狀態
- 以開關切換LED的模式(開/關/自動偵測)
- 溫度超過30度會提示警告訊息

## Reference
- Arduino Dev.
    - CoAP
        - [Simple CoAP Lib. for Arduino](https://github.com/hirotakaster/CoAP-simple-library)

    - sensor
        - [Temperature Seneor](https://www.dfrobot.com/wiki/index.php/DFRobot_LM35_Linear_Temperature_Sensor_(SKU:DFR0023))
    - Wifi
        - [WiFi module](https://www.kolkataonweb.com/code-bank/tag/ai-cloud-inside/)
        - [Wifi user manual](http://www.icshopping.com.tw/368030500646/ESP8266%20ESP-01%20%E4%B8%B2%E5%8F%A3WIFI%20%E7%84%A1%E7%B7%9A%E6%A8%A1%E7%B5%84.pdf)
![](https://i.imgur.com/DJjqiDb.png)

- Node.JS Dev.
    - [npm package: CoAP](https://www.npmjs.com/package/coap)
    - [CoAP with DB](http://niutech.github.io/designiot/#coap-%E6%95%B0%E6%8D%AE%E5%BA%93%E6%9F%A5%E8%AF%A2)
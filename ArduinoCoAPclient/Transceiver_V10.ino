#include <SoftwareSerial.h>
#include "Udp.h"
#define debug_baudrate   115200
#define serial_baudrate   9600
#define _rxpin      4
#define _txpin      5
SoftwareSerial debug( _rxpin, _txpin ); // RX, TX
//*-- IoT Information
#define MAX_OPTION_NUM 10
float threshold = 30.0;
String connectwifi = "AT+CWJAP=\"mySSID\",\"12345678\"";
String connectserver = " AT+CIPSTART=\"UDP\",\"MyIP\",5683";
String sendData = "AT+CIPSEND=64";
uint8_t *p;
int k = 0;
float temperature;
int LEDswitch;
void setup() {
    Serial.begin( serial_baudrate );
    debug.begin( debug_baudrate );
    sendcommand(connectwifi);
    delay(3000);
    String ret = get_return();
    Serial.print("ret:");
    Serial.println(ret);
    connectServer();
    temperature = 10.31;
    LEDswitch = 0;
    p = new byte [100];
    p[0] = 0x44;
    p[1] = 0x03;
    p[2] = 0x12;
    p[3] = 0x20;
    p[4] = 0xa9;
    p[5] = 0x11;
    p[6] = 0x80;
    p[7] = 0x2e;
    
    p[8] = 0xb1;
    p[9] = 0x30;
    p[10] = 0x11;
    p[11] = 0x32;
    p[12] = 0x51;
    p[13] = 0x32;
    
    p[14] = 0xff;
    p[15] = 0x7b;
    p[16] = 0x22;
    p[17] = 0x73;
    p[18] = 0x65;
    p[19] = 0x6e;
    p[20] = 0x73;
    p[21] = 0x6f;
    p[22] = 0x72;
    p[23] = 0x44;
    p[24] = 0x61;
    p[25] = 0x74;
    p[26] = 0x61;
    p[27] = 0x22;
    p[28] = 0x3a;
    p[29] = 0x7b;
    p[30] = 0x22;
    p[31] = 0x74;
    p[32] = 0x65;
    p[33] = 0x6d;
    p[34] = 0x70;
    p[35] = 0x65;
    p[36] = 0x72;
    p[37] = 0x61;
    p[38] = 0x74;
    p[39] = 0x75;
    p[40] = 0x72;
    p[41] = 0x65;
    p[42] = 0x22;
    p[43] = 0x3a;
    
    p[44] = 0x31;
    p[45] = 0x32;
    p[46] = 0x2e;
    p[47] = 0x31;
    p[48] = 0x31;
    
    p[49] = 0x7d;
    p[50] = 0x2c;
    p[51] = 0x22;
    p[52] = 0x4c;
    p[53] = 0x45;
    p[54] = 0x44;
    p[55] = 0x73;
    p[56] = 0x74;
    p[57] = 0x61;
    p[58] = 0x74;
    p[59] = 0x65;
    p[60] = 0x22;
    p[61] = 0x3a;
    p[62] = 0x30;
    p[63] = 0x7d;

    //Temperature sensor
    analogReference(INTERNAL);
    //LED
    pinMode(LED_BUILTIN, OUTPUT);
}
void loop() {
    int reading;
    //Temperature
    reading = analogRead(0);
    temperature = reading / 9.31;

    //LED switch
    
    //Wifi
    p[3] += k;
    int temp = temperature*100;
    p[48] =(temp%10)+0x30;
    
    temp = temp/10;
    p[47] =(temp%10)+0x30;
    
    temp = temp/10;
    p[45] =(temp%10)+0x30;
    
    temp = temp/10;
    p[44] =(temp%10)+0x30;
    
    p[62] = LEDswitch+0x30;
    k = k+1;
    sendcommand(sendData);
    delay(500);
    String ret = get_return();
    /*Serial.print("ret:");
    Serial.println(ret);*/

    int i=0;
    for(i;i<64;i++){
      Serial.write(p[i]);
      debug.write(p[i]);
    }
    delay(500);
    ret = get_return();
    Serial.print("ret:");
    Serial.println(ret);
    int on = find_text("Y", ret);
    int off = find_text("N",ret);
    int same = find_text("A",ret);
    if(on!=-1){
      Serial.println("\nans on");
      LEDswitch = 1;
      digitalWrite(LED_BUILTIN, HIGH);
    }
    else if(off!=-1){
      Serial.println("\nans off");
      LEDswitch = 0;
      digitalWrite(LED_BUILTIN, LOW);
    }
    else if(same!=-1){
      Serial.println("\nans auto");
      if(temperature > 32){
        Serial.println(temperature);
        LEDswitch = 1;
        digitalWrite(LED_BUILTIN, HIGH);
      }
      else{
        Serial.println("\nelse");
        LEDswitch = 0;
        digitalWrite(LED_BUILTIN, LOW);
      }
    }
    else{
      Serial.println("\nans GGGGGGG");
    }
}

void connectServer(){
    sendcommand(connectserver);
    delay(3000);
    String ret = get_return();
    Serial.print("ret:");
    Serial.println(ret);
}

void SendData(String Data){
    String com = sendData+String(Data.length());
    sendcommand(com);
    delay(1000);
    String ret = get_return();
    Serial.print("ret:");
    Serial.println(ret);
    
    sendcommand(Data);
    delay(1000);
    ret = get_return();
    Serial.print("ret:");
    Serial.println(ret);
}
void sendcommand(String cmd)
{
    Serial.print("SEND: ");
    Serial.println(cmd);
    debug.println(cmd);
}

String get_return(){
  while(!debug.available());
  return get_ESP8266_response();
}

String get_ESP8266_response() {  //取得 ESP8266 的回應字串
    String str="";  //儲存接收到的回應字串
    char c;  //儲存接收到的回應字元
    while (debug.available()) {  //若軟體序列埠接收緩衝器還有資料
      c=debug.read();  //必須放入宣告為 char 之變數 (才會轉成字元)
      str.concat(c);  //串接回應字元 
      delay(10);  //務必要延遲, 否則太快
      }
    str.trim();  //去除頭尾空白字元
    return str;
}

int find_text(String needle, String haystack) {
  int foundpos = -1;
  for (int i = 0; i <= haystack.length() - needle.length(); i++) {
    if (haystack.substring(i,needle.length()+i) == needle) {
      foundpos = i;
    }
  }
  return foundpos;
}

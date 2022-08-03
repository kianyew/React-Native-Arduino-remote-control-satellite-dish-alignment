#include <Servo.h>
#include <Stepper.h>
#include <SoftwareSerial.h>

SoftwareSerial BTModule(2,3); // RX | TX
Servo servo;

//receive array and parse
const byte numChars = 32;
char receivedChars[numChars];
char tempChars[numChars]; //temporary array for use when parsing
boolean newData = false;

int elevateAngle = 0;
int azimuthAngle;
int finalAzimuth;
int trackStepper = 0;

int turn_time; //to control 360 servo

//stepper section:
const int stepsPerRevolution = 2038;
Stepper myStepper = Stepper(stepsPerRevolution, 8, 10, 9, 11);


void setup() {
  Serial.begin(9600);
  BTModule.begin(9600);
  Serial.println("Ready to connect");

  //servo stuff
  servo.attach(7);
  servo.write(90); //inititally, servo stopped
}


void loop() {
  recvWithStartEndMarkers();
  if (newData == true) {
    strcpy(tempChars, receivedChars);
      //this temp copy is necessary to protect the original data
      //because strtok() used in parseData() replaces commas with \0
    parseData();

    //stepper stuff
    finalAzimuth = azimuthAngle / 360 * 2038;
    myStepper.setSpeed(400);
    myStepper.step(trackStepper);
    myStepper.step(finalAzimuth);
    trackStepper = -finalAzimuth;
    delay(1000);

    //servo stuff
    turn_time = elevateAngle / 0.08;
    if(turn_time > 0) {
      servo.write(0);
      delay(turn_time);
      servo.write(90);
    }
    else {
      servo.write(180);
      turn_time = -turn_time;
      delay(turn_time);
      servo.write(90);
    }
    

    newData = false;
  }
}

void recvWithStartEndMarkers() {
  static boolean recvInProgress = false;
  static byte ndx = 0;
  char startMarker = '<';
  char endMarker = '>';
  char rc;

  while (BTModule.available() > 0 && newData == false) {
    rc = BTModule.read();
    
    if (recvInProgress == true) {
      if (rc != endMarker) {
        receivedChars[ndx] = rc;
        ndx++;
        if (ndx >= numChars) {
          ndx = numChars - 1;
        }
      }
      else {
        receivedChars[ndx] = '\0'; //terminate the string when endmarker
        recvInProgress = false;
        ndx = 0;
        newData = true;
      }
    }
    else if (rc == startMarker) {
      recvInProgress = true;
    }
  }
}

void parseData() {
  //split the data into its parts
  char * strtokIndx;  //this is used by strtok() as an index

  strtokIndx = strtok(tempChars,",");
  azimuthAngle = atoi(strtokIndx);

  strtokIndx = strtok(NULL,".");
  elevateAngle = atoi(strtokIndx);
}

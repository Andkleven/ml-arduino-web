
int LED_GREEN = 4;
int LED_RED = 11;
// int BUTTON = 7;
bool BUTTON_PRESSED = false;

void setup() {
  Serial.begin(115200); // Begen listening on port 9600 for serial
  // pinMode(BUTTON, INPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_RED, OUTPUT);
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_RED, HIGH);
}

void loop() {
   if(Serial.available() > 0) // Read from serial port
    {
      char ReaderFromNode; // Store current character
      ReaderFromNode = (char) Serial.read();
      convertToState(ReaderFromNode); // Convert character to state  
    }
  //  if (digitalRead(BUTTON) && !BUTTON_PRESSED) {
  //     BUTTON_PRESSED = true;
  //     Serial.write("test");
  //   } 
  //   if (!digitalRead(BUTTON)){
  //     BUTTON_PRESSED = false;
  //   }
}

void convertToState(char chr) {
  if(chr=='m'){
    digitalWrite(LED_GREEN, HIGH);
    digitalWrite(LED_RED, LOW);
    delay(100); 
  }
  if(chr=='i'){
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_GREEN, LOW);
    delay(100); 
  }
}

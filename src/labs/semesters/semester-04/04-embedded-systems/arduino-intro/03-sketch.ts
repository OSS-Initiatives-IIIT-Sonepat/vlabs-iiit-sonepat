import { type TheorySection } from "@/labs/lab-content.types";

export const sketch: TheorySection = {
  id: "first-sketch",
  type: "text",
  title: "Your first sketch",
  paragraphs: [
    "The smallest useful sketch does nothing except set one pin as an output. Read it top to bottom. Each line is a single instruction.",
    "void setup() {",
    "  pinMode(13, OUTPUT);   // pin 13 drives the on-board LED L",
    "}",
    "void loop() {",
    "  digitalWrite(13, HIGH); // 5 V on pin 13: LED on",
    "  delay(1000);            // wait 1000 ms (one second)",
    "  digitalWrite(13, LOW);  // 0 V on pin 13: LED off",
    "  delay(1000);",
    "}",
    "Upload this sketch and the on-board LED blinks once a second. The same code, with an external LED on pin 13, is the Blink experiment.",
  ],
};

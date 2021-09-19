const { Client, query } = require("faunadb");
const express = require("express");
const app = express();
const SerialPort = require("serialport");
const q = query;
const client = new Client({
  secret: "",
});

const port = 3000;

const arduinoCOMPort = "COM3";

const arduinoSerialPort = new SerialPort(arduinoCOMPort, {
  baudRate: 115200,
});

arduinoSerialPort.on("open", function () {
  console.log("Serial Port " + arduinoCOMPort + " is opened.");
});
arduinoSerialPort.on("data", (event) => {
  console.log(event.toString("utf8"));
});

app.get("/", function (req, res) {
  return res.send("Working");
});

app.get("/:data", (req, res) => {
  const data = req.params.data || req.param("data");
  console.log(data);
  switch (data) {
    case "meg":
      arduinoSerialPort.write("m");
      break;
    case "ikkeMeg":
      arduinoSerialPort.write("i");
      break;
    default:
      break;
  }
  return res.send("Working");
  // client
  //   .query(
  //     q.Let(
  //       {
  //         counterValue: q.Select(
  //           ["data", data],
  //           q.Get(q.Ref(q.Collection("data"), "309706254926742092"))
  //         ),
  //       },
  //       {
  //         count: q.Update(q.Ref(q.Collection("data"), "309706254926742092"), {
  //           data: { [data]: q.Add(q.Var("counterValue"), 1) },
  //         }),
  //       }
  //     )
  //   )
  //   .then((ret) => {
  //     return res.send("Working");
  //   })
  //   .catch((err) => {
  //     return res.send("Not Working").status(400);
  //   });
});

// app.get("/:action", function (req, res) {
//   const action = req.params.action || req.param("action");

//   if (action == "led") {
//     arduinoSerialPort.write("o");
//     return res.send("Led light is on!");
//   }
//   if (action == "off") {
//     arduinoSerialPort.write("f");
//     return res.send("Led light is off!");
//   }

//   return res.send("Action: " + action);
// });

app.listen(port, function () {
  console.log("Example app listening on port http://localhost:" + port);
});

/* SETUP */
const express = require("express");
const app = express();
const port = 9124;

/* Routes */
app.get("/", (req, res) => {
  res.send("Root route");
});

/* LISTENER */
app.listen(port, () => {
  console.log(
    "Express started on http://localhost:" +
      port +
      "; press Ctrl-C to terminate."
  );
});

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const config = require("./config/keys");
const mongoose = require("mongoose");
mongoose.connect(config.mongoURI, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());

require("./routes/dialogFlowRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serwer działa! Nasłuchuje na porcie ${PORT}`);
});

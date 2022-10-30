const express = require("express");
const app = express();
const products = require("./routes/products");
const permissions = require("./routes/permissions");
const login = require("./routes/login");
const signup = require("./routes/signup");
const authenticate = require("./middlewares/authenticator");
const checkUserPermission = require("./middlewares/permissionChecker");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.use("/", login);
app.use("/", signup);
app.use("/", authenticate, permissions);
app.use("/", authenticate, checkUserPermission, products);

const appListener = app.listen(process.env.PORT || 5000, () => {
  console.log("Your app is listening on port " + appListener.address().port);
});

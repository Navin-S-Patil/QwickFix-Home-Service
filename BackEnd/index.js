const express = require("express");
const app = express();
require("dotenv").config("./.env");
const sanitizer = require("perfect-express-sanitizer");
const cors = require("cors");
const mongoose = require("mongoose");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoute = require("./routes/userRoute");
const serviceRoute = require("./routes/serviceRoute");
const professionalRoute = require("./routes/professionalRoute");
const adminRoute = require("./routes/adminRoute");

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });


app.use("/api/service", serviceRoute);
app.use("/api/users", userRoute);
app.use("/api/professionals", professionalRoute);
app.use("/api/admin", adminRoute);

//custom error handler
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

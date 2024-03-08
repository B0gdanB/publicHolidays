// 1. Import express and axios
import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;

// 3. Use the public folder for static files.
app.use(express.static("public"));
// use body parcer to get data from index.ejs
app.use(bodyParser.urlencoded({ extended: true }));


// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {

  res.render("index.ejs");
  // try {
  //   const response = await axios.get('https://date.nager.at/api/v3/publicholidays/2024/CA');
  //   const result = response.data;
  //   console.log(result);

  //   res.render("index.ejs", {dataForEJS: result});
  // } catch (error) {
  //   console.error("Failed to make request:", error.message);
  // }
  
})

app.post("/publicHolidays", async (req, res) => {

  console.log(req.body)
  // res.render("index.ejs");

  try {
    const response = await axios.get(`https://date.nager.at/api/v3/publicholidays/${new Date().getFullYear()}/${req.body.country}`);
    const result = response.data;
    console.log(result);

    res.render("index.ejs", {dataForEJS: result, countryFullName: req.body.countryFullName});
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
  
})


// 5. Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
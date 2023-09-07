require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Function to format a date in the desired format
function formatDateToCustomISO(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

app.get("/api", (req, res) => {
  const { track, slack_name } = req.query;

  if (!track || !slack_name) {
    return res.status(400).json({
      error: "track and slack_name are required to make this request",
    });
  }
  // get current day of the week in string
  const currentDay = new Date().toLocaleString("default", {
    weekday: "long",
  });
  // get current utc time
  const currentUtc = formatDateToCustomISO(new Date());

  //validation for ( -2/+2 ) time zone
  const utcDifferenceHours = new Date().getTimezoneOffset() / 60;
  if (utcDifferenceHours < -2 || utcDifferenceHours > 2) {
    return res
      .status(400)
      .json({ error: "UTC time is not within +/-2 hours from UTC" });
  }

  //url of the main file running the code
  const mainFileUrl =
    "https://github.com/vector-10/HNGx_task_1/blob/main/index.js";

  // url of the repository
  const repoUrl = "https://github.com/vector-10/HNGx_task_1";

  res.status(200).json({
    slack_name: slack_name,
    current_day: currentDay,
    utc_time: currentUtc,
    track: track,
    github_file_url: mainFileUrl,
    github_repo_url: repoUrl,
    status_code: 200,
  });
});

const currentUtc = formatDateToCustomISO(new Date());
console.log(currentUtc);

const PORT = 2000 || process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on PORT ${PORT}`));

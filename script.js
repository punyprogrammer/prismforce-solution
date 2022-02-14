const fs = require("fs");
let data = JSON.parse(fs.readFileSync("2-input.json", "utf8"));
const balanceSheet = {};
//iterate through the expenseData
data["expenseData"].forEach((item) => {
  item.startDate in balanceSheet
    ? (balanceSheet[item.startDate] -= item.amount)
    : (balanceSheet[item.startDate] = -item.amount);
});

//iterate through the revenueData

data["revenueData"].forEach((item) => {
  item.startDate in balanceSheet
    ? (balanceSheet[item.startDate] += item.amount)
    : (balanceSheet[item.startDate] = item.amount);
});
//sort by timestamp
let keys = Object.keys(balanceSheet);
keys.sort();
const minDate = keys[0];
const maxDate = keys[keys.length - 1];
//generate all timestamps
const years = [];
const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
for (
  let year = new Date(minDate).getFullYear();
  year <= new Date(maxDate).getFullYear();
  year++
)
  years.push(year.toString());
for (let a in years)
  for (let b in months) {
    const newDate =
      years[a] +
      "-" +
      months[b] +
      keys[0].substring(7, keys[0].length).toString();

    if (newDate > minDate && newDate < maxDate) {
      if (keys.indexOf(newDate) === -1) {
        balanceSheet[newDate] = 0;
        keys.push(newDate);
        console.log(newDate);
      }
    }
  }
//sort the keys after filling the missing timestamps
keys.sort();

let output = [];
keys.forEach((item) => {
  const obj = {};
  obj["amount"] = balanceSheet[item];
  obj["startDate"] = item;
  output.push(obj);
});
// console.log(output);
const outputJSON = {};
outputJSON.balance = output;
//write to output file
fs.writeFileSync("2-output.json", JSON.stringify(outputJSON), "utf-8");

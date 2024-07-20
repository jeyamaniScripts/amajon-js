import { formateCurrency } from "../utils/money.js";
// 3 situation=testCase

// 2 types of test case
// 1basic test case=tests if code is working
// 2edge case= twst values are tricky
if (formateCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

if (formateCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

if (formateCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}

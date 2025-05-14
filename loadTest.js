import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
  vus: 500,
  duration: "1m",
};

export default function () {
  const resp = http.get("http://test.k6.io");
  sleep(1);
  check(resp, {
    "status is 200": (r) => r.status === 200,
    "response time is less than 200ms": (r) => r.timings.duration < 200,
  });
}

export function handleSummary(data) {
  return {
    "reportLoadTest.html": htmlReport(data),
    stdout: textSummary(data, { indent: "", enableColors: true }),
  };
}

import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export default function () {
  const resp = http.get("http://test.k6.io");
  sleep(1);
  check(resp, {
    "status is 200": (r) => r.status === 200,
    "response time is less than 400ms": (r) => r.timings.duration < 400,
  });
}

export let options = {
  scenarios: {
    per_user_iterations: {
      executor: 'per-vu-iterations',
      vus: 500,              // Jumlah virtual users
      iterations: 100,       // Total iterasi per VU
      maxDuration: '1m',    // Durasi maksimum tes
    },
  },
};

export function handleSummary(data) {
    return {
        'reportScenarioTest.html' : htmlReport(data),
        stdout: textSummary(data, {indent: '', enableColors:true}),
    };
}
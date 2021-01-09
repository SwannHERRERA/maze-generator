import http from "k6/http";
import { check, sleep } from "k6";

/**
 * Install k6
 */

export const option = {
  stages: [
    { duration: "15s", target: 100 },
    { duration: "35s", target: 100 },
    { duration: "15s", target: 0 },
  ],
};

const loadTest = () => {
  const res = http.get("zigzag.netlify.app");
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
};

export default loadTest;

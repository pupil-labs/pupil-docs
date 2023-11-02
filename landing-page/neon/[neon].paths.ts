import { readdirSync } from "fs";

export default {
  paths() {
    return readdirSync("neon").map((neon) => {
      return { params: { neon: "index" } };
    });
  },
};

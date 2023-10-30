import { defineEndpoint } from "@directus/extensions-sdk";

import * as sysinfo from "systeminformation";

export default defineEndpoint({
  id: "systeminfo",
  handler: (router) => {
    router.get("/", async (_req, res) => res.send(await sysinfo.getAllData()));
  },
});

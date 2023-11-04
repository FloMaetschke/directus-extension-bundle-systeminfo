import { defineEndpoint } from "@directus/extensions-sdk";
import { ForbiddenError } from "@directus/errors";

import * as sysinfo from "systeminformation";

export default defineEndpoint({
  id: "systeminfo",
  handler: (router) => {
    router.get("/", async (req: any, res) => {
      if (req.accountability?.admin !== true) {
        throw new ForbiddenError();
      }
      res.send(await sysinfo.getAllData());
    });
  },
});

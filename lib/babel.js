//imports
import os from "os";
import child_process from "child_process";

/**
 * Runs babel CLI.
 */
export default function babel(params) {
  var cmd;

  //(1) arguments
  if (params.length === 0) {
    files = {};
  } else if (params.length >= 1) {
    params = params[0];
  }

  if (!params.files) params.files = {};
  if (!params.hasOwnProperty("comments")) params.comments = true;

  //(2) determine command
  if (/^win/.test(os.platform())) cmd = "babel.cmd";
  else cmd = "babel";

  //(3) run
  for (let dst of Object.keys(params.files)) {
    let src = params.files[dst];
    let args = [];
    let res;

    if (!params.comments) args.push("--no-comments");
    if (params.presets) {
      args.push("--presets");
      args.push(params.presets.join(","));
    }
    if (params.plugins) {
      args.push("--plugins");
      args.push(params.plugins.join(","));
    }
    if (params.retainLines) args.push("--retain-lines");

    args.push("-o");
    args.push(dst);
    args.push(src);

    res = child_process.spawnSync(cmd, args);

    if (res.error) throw res.error;
    if (res.status) throw new Error(res.stderr.toString());
  }

  return 0;
}

//imports
import os from "os";
import child_process from "child_process";
import {Dir} from "justo-fs";

/**
 * Runs babel CLI.
 */
export default function op(params) {
  var cmd, args;

  //(1) arguments
  if (params.length === 0) {
    files = {};
  } else if (params.length >= 1) {
    params = params[0];
  }

  if (!params.files) params.files = [];
  if (!(params.files instanceof Array)) params.files = [params.files];
  if (params.src) params.files = [{src: params.src, dst: params.dst}];
  if (params.preset) params.presets = [params.preset];
  if (params.plugin) params.plugins = [params.plugin];
  if (!params.hasOwnProperty("comments")) params.comments = true;

  //(2) determine command
  if (/^win/.test(os.platform())) cmd = "babel.cmd";
  else cmd = "babel";

  args = [];
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

  //(3) run
  for (let info of params.files) {
    let res;
    let ca = args.concat([]);
    let src = info.src;
    let dst = info.dst;

    //pre
    if (!dst) throw new Error("Expected 'dst' property.");
    if (!src) continue;

    //transpile
    if (/[\/\\]$/.test(dst)) {
      new Dir(dst).create();
      ca.push("-d");
      ca.push(dst);
    } else {
      ca.push("-o");
      ca.push(dst);
    }

    if (typeof(src) == "string") src = [src];
    ca = ca.concat(src);

    res = child_process.spawnSync(cmd, ca);
    if (res.error) throw res.error;
    if (res.status) throw new Error(res.stderr.toString());
  }

  return 0;
}

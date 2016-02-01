//imports
import {simple} from "justo";

//api
module.exports = simple({ns: "org.justojs.plugin", name: "babel"}, require("./lib/op").default);

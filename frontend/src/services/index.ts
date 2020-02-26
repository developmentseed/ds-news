import { ajax } from "rxjs/ajax";
import config from "../config";
import { Github } from "./Github";

export const services = {
  ajax,
  config,
  github: new Github()
};

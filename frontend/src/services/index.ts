import { ajax } from "rxjs/ajax";
import { Github } from "./Github";

export const services = {
  github: new Github(),
  ajax
};

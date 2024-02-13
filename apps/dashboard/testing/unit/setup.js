import {Route} from 'express';

export default function Setup(handler) {

  return new Route(handler);
}

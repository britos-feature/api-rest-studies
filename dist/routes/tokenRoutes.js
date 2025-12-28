"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _TokenControllers = require('../controllers/TokenControllers'); var _TokenControllers2 = _interopRequireDefault(_TokenControllers);

const routes = new (0, _express.Router)();

routes.post('/', _TokenControllers2.default.store);

exports. default = routes;

"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _StudentControllers = require('../controllers/StudentControllers'); var _StudentControllers2 = _interopRequireDefault(_StudentControllers);

const routes = new (0, _express.Router)();

routes.get('/', _StudentControllers2.default.index);
routes.post('/', _StudentControllers2.default.store);
routes.get('/:id', _StudentControllers2.default.show);
routes.put('/:id', _StudentControllers2.default.update);
routes.delete('/:id', _StudentControllers2.default.delete);
exports. default = routes;

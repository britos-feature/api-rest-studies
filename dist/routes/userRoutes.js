"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserControllers = require('../controllers/UserControllers'); var _UserControllers2 = _interopRequireDefault(_UserControllers);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const routes = new (0, _express.Router)();

// OPCIONAL
routes.get('/', _UserControllers2.default.index);
routes.get('/:id', _UserControllers2.default.show);

routes.post('/', _UserControllers2.default.store);
routes.put('/', _loginRequired2.default, _UserControllers2.default.update);
routes.delete('/', _loginRequired2.default, _UserControllers2.default.delete);
exports. default = routes;

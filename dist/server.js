"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _App = require('./App'); var _App2 = _interopRequireDefault(_App);

const PORT = process.env.PORT || 3001;
_App2.default.listen(PORT);

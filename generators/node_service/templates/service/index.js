const { Application, Service } = require('mikudos-node-app');
const HandlerClass = require('./<%=serviceNameSnake%>.class');
const methodMap = require('./<%=serviceNameSnake%>.map');
const hooks = require('./<%=serviceNameSnake%>.hooks');

module.exports = function (app) {
    let handler = new HandlerClass({}, app);
    const service = new Service(handler, methodMap, '<%=serviceName%>');
    app.register(service.name, service, hooks);
};
const { <%=className%> } = require('./method.class')
const hooks = require('./method.hooks')

module.exports = function (app) {
    app.use('<%=methodName%>', ...hooks.before, new <%=className%>().enter, ...hooks.after)
};
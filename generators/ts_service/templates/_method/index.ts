import { Application } from 'mikudos-node-app';

import * as Funcs from './<%=serviceNameSnake%>.funcs';
import hooks from './<%=serviceNameSnake%>.hooks';

export default function(app: Application) {<% methods.forEach(function(item){ %>
        app.use(
            '<%=serviceName%>',
            '<%=item%>',
            ...hooks.before,
            Funcs['<%=item%>'],
            ...hooks.after
        );<% }); %>
}

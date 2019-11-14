import { Application } from 'mikudos-node-app';
<% serviceNames.forEach(function(item){ %>
import <%=item.camelCase%> from './<%=item.snakeCase%>';<% }); %>

export default function(app: Application): void {<% serviceNames.forEach(function(item){ %>
    app.configure(<%=item.camelCase%>);<% }); %>
}

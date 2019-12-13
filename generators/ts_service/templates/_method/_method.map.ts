export = {
<% methods.forEach(function(item, index){ %>
    <%=item.name%>: '<%=item.name%>'<% if (index<methods.length-1) { %>,<% } }); %>
};

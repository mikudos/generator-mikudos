import { Application } from 'mikudos-node-app';
import path from 'path';
import sequelize from './sequelize';
import middleware from './middleware';
import models from './models';
import services from './services';

const PROTO_PATH = path.resolve(__dirname, '../proto/rbac/rbac.proto');

const app: Application = new Application(PROTO_PATH);
app.configure(sequelize);
app.configure(models);
// app.configure(broker)
app.configure(middleware);
app.configure(services);

export default app;

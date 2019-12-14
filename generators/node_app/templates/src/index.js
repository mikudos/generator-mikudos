const app = require('./app');

function main() {
    app.start(`0.0.0.0:${app.config.get('port')}`);
    console.log(`${app.config.get('app')} is started at Port: ${app.ports}`);
}

main();

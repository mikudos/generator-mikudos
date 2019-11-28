import app from './app';

function main(): void {
    app.start(`0.0.0.0:${app.config.get('port')}`);
    console.log(`${app.config.get('app')} is started at Port: ${app.ports}`);
}

main();

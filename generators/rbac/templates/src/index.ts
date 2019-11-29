import app from './app';

function main(): void {
    app.start(`0.0.0.0:${app.get('port')}`);
    console.log(`${app.get('app')} is started at Port: ${app.ports}`);
}

main();

const fs = require('fs');

// Чтение файла config.json
fs.readFile('config.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка чтения файла:', err);
        return;
    }

    // Парсинг JSON данных
    const config = JSON.parse(data);

    // Использование данных из конфига
    console.log("App Name:", config.appName);
    console.log("Version:", config.version);
    console.log("Debug mode:", config.debug);
    console.log("Server Host:", config.server.host);
    console.log("Server Port:", config.server.port);
});

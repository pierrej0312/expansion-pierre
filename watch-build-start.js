const { exec } = require('child_process');
const chokidar = require('chokidar');

let npmCommandsExecuted = false;

const runNpmCommands = () => {
    exec('npm run build && npm run start', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            return;
        }
        console.log(stdout);
    });
};

const watcher = chokidar.watch('.', {
    ignored: /node_modules|\.git/,
    persistent: true,
});

watcher.on('change', (path) => {
    console.log(`File ${path} has been changed`);
    if (npmCommandsExecuted) {
        runNpmCommands();
    }
});

console.log('Watching for file changes...');

// Exécutez les commandes npm lors du premier lancement du script
runNpmCommands();
npmCommandsExecuted = true;

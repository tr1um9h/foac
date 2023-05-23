const { promises: fs } = require("fs")
const path = require("path")

async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    let entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ?
            await copyDir(srcPath, destPath) :
            await fs.copyFile(srcPath, destPath);
    }
}

async function copyFile(src, dest) {
    await fs.copyFile(src, dest);
}

// Copy all Design System SCSS files.
copyDir('./node_modules/@foa-companies/symphony/scss', './src/sass/assets/symphony');
// Copy Bootstrap JS File.
copyFile('./node_modules/@foa-companies/symphony/js/bootstrap.js', './src/js/vendor/bootstrap.js');
// Copy all Font Awesome Font files.
copyDir('./node_modules/@foa-companies/symphony/fonts', './fonts');
// Copy all Understrap SCSS files.
copyDir('./node_modules/understrap/src/sass/theme', './src/sass/assets/understrap/theme');
// Copy jQuery Match Height
copyFile('./node_modules/jquery-match-height/dist/jquery.matchHeight.js', './src/js/vendor/jquery.matchHeight.js');

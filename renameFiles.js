const fs = require('fs');
const path = require('path');

function renameMonth(file) {
  let newFileName = file;
  newFileName = newFileName.replace('_January_', '_01');
  newFileName = newFileName.replace('_February_', '_02');
  newFileName = newFileName.replace('_March_', '_03');
  newFileName = newFileName.replace('_April_', '_04');
  newFileName = newFileName.replace('_May_', '_05');
  newFileName = newFileName.replace('_June_', '_06');
  newFileName = newFileName.replace('_July_', '_07');
  newFileName = newFileName.replace('_August_', '_08');
  newFileName = newFileName.replace('_September_', '_09');
  newFileName = newFileName.replace('_October_', '_10');
  newFileName = newFileName.replace('_November_', '_11');
  newFileName = newFileName.replace('_December_', '_12');
  newFileName = newFileName.replace('_Winter_', '_01');
  newFileName = newFileName.replace('_Spring_', '_04');
  newFileName = newFileName.replace('_Summer_', '_07');
  newFileName = newFileName.replace('_Fall_', '_10');
  return newFileName;
}

// Function to rename files and directories recursively
function renameFiles(directoryPath) {
  const items = fs.readdirSync(directoryPath);

  for (const item of items) {
    const itemPath = path.join(directoryPath, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    if (isDirectory) {
      const newDirectoryName = renameMonth(item);
      const newDirectoryPath = path.join(directoryPath, newDirectoryName);

      if (itemPath !== newDirectoryPath) {
        fs.renameSync(itemPath, newDirectoryPath);
        console.log(`Renamed directory: ${item} => ${newDirectoryName}`);
      }

      renameFiles(newDirectoryPath);
    } else if (item.toLowerCase().endsWith('.jpg')) {
      let newFileName = renameMonth(item);

      // Check if it doesn't end with "_a.jpg" or "_b.jpg"
      if (!/(^.*?_[ab]*\.jpg)$/i.test(newFileName)) {
        // Add a single underscore to the file name
        newFileName = newFileName.replace(/\.jpg$/, '_.jpg');
      }

      if (newFileName !== item) {
        const newFilePath = path.join(directoryPath, newFileName);
        fs.renameSync(itemPath, newFilePath);
        console.log(`Renamed file: ${item} => ${newFileName}`);
      }
    }
  }
}

// Specify the root directory where you want to start the renaming process
const rootDirectory = '/Users/willpreble/Desktop/obrien family archive';

renameFiles(rootDirectory);

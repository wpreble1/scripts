const fs = require('fs');
const path = require('path');

// Function to rename files and directories recursively
function renameFiles(directoryPath) {
  const items = fs.readdirSync(directoryPath);

  for (const item of items) {
    const itemPath = path.join(directoryPath, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    if (isDirectory) {
      // If it's a directory, check if it contains a month pattern
      let newDirectoryName = item;

      // Check for month names and replace with two-digit numbers
      newDirectoryName = newDirectoryName.replace('_January_', '_01_');
      newDirectoryName = newDirectoryName.replace('_February_', '_02_');
      newDirectoryName = newDirectoryName.replace('_March_', '_03_');
      newDirectoryName = newDirectoryName.replace('_April_', '_04_');
      newDirectoryName = newDirectoryName.replace('_May_', '_05_');
      newDirectoryName = newDirectoryName.replace('_June_', '_06_');
      newDirectoryName = newDirectoryName.replace('_July_', '_07_');
      newDirectoryName = newDirectoryName.replace('_August_', '_08_');
      newDirectoryName = newDirectoryName.replace('_September_', '_09_');
      newDirectoryName = newDirectoryName.replace('_October_', '_10_');
      newDirectoryName = newDirectoryName.replace('_November_', '_11_');
      newDirectoryName = newDirectoryName.replace('_December_', '_12_');
      newDirectoryName = newDirectoryName.replace('_Winter_', '_01_');
      newDirectoryName = newDirectoryName.replace('_Spring_', '_04_');
      newDirectoryName = newDirectoryName.replace('_Summer_', '_07_');
      newDirectoryName = newDirectoryName.replace('_Fall_', '_10_');

      const newDirectoryPath = path.join(directoryPath, newDirectoryName);

      if (itemPath !== newDirectoryPath) {
        fs.renameSync(itemPath, newDirectoryPath);
        console.log(`Renamed directory: ${item} => ${newDirectoryName}`);
      }

      renameFiles(newDirectoryPath);
    } else if (item.toLowerCase().endsWith('.jpg')) {
      // If it's a file ending with ".jpg"
      let newFileName = item;

      // Replace month names with two-digit numbers
      newFileName = newFileName.replace('_January_', '_01_');
      newFileName = newFileName.replace('_February_', '_02_');
      newFileName = newFileName.replace('_March_', '_03_');
      newFileName = newFileName.replace('_April_', '_04_');
      newFileName = newFileName.replace('_May_', '_05_');
      newFileName = newFileName.replace('_June_', '_06_');
      newFileName = newFileName.replace('_July_', '_07_');
      newFileName = newFileName.replace('_August_', '_08_');
      newFileName = newFileName.replace('_September_', '_09_');
      newFileName = newFileName.replace('_October_', '_10_');
      newFileName = newFileName.replace('_November_', '_11_');
      newFileName = newFileName.replace('_December_', '_12_');
      newFileName = newFileName.replace('_Winter_', '_01_');
      newFileName = newFileName.replace('_Spring_', '_04_');
      newFileName = newFileName.replace('_Summer_', '_07_');
      newFileName = newFileName.replace('_Fall_', '_10_');
      newFileName = newFileName.replace('__', '_');

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

const fs = require('fs');
const path = require('path');

function renameMonth(file) {
  let newFileName = file;
  newFileName = newFileName.replace('_January', '_01');
  newFileName = newFileName.replace('_February', '_02');
  newFileName = newFileName.replace('_March', '_03');
  newFileName = newFileName.replace('_April', '_04');
  newFileName = newFileName.replace('_May', '_05');
  newFileName = newFileName.replace('_June', '_06');
  newFileName = newFileName.replace('_July', '_07');
  newFileName = newFileName.replace('_August', '_08');
  newFileName = newFileName.replace('_September', '_09');
  newFileName = newFileName.replace('_October', '_10');
  newFileName = newFileName.replace('_November', '_11');
  newFileName = newFileName.replace('_December', '_12');
  newFileName = newFileName.replace('_Winter', '_01');
  newFileName = newFileName.replace('_Spring', '_04');
  newFileName = newFileName.replace('_Summer', '_07');
  newFileName = newFileName.replace('_Fall', '_10');
  return newFileName;
}

const yearCount = {
  192: 0,
  193: 0,
  194: 0,
  195: 0,
  196: 0,
  197: 0,
  198: 0,
  199: 0,
  200: 0,
  201: 0,
};

let unknown = 0;

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
      Object.keys(yearCount).forEach((year) => {
        if (item.startsWith(year) && !item.endsWith('_b.jpg')) {
          yearCount[year]++;
        }
      });

      if (
        !Object.keys(yearCount).some((year) => item.startsWith(year)) &&
        !item.endsWith('_b.jpg')
      ) {
        unknown++;
      }

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

console.log({
  yearCount,
  unknown,
  total: Object.values(yearCount).reduce((a, b) => a + b, 0) + unknown,
});

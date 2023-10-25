const fs = require('fs');
const path = require('path');

// Function to recursively traverse a directory and rename files
function renameFilesRecursively(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    // console.log(`Processing: ${file}`);

    if (fs.statSync(filePath).isDirectory()) {
      // If it's a directory, recursively call the function
      console.log(`Recursing into: ${file}`);

      renameFilesRecursively(filePath);
    } else {
      // If it's a file, check if it doesn't end with "_a.jpg" or "_b.jpg"
      if (file.toLowerCase().endsWith('.jpg') && !/(^.*?_[ab]\.jpg)$/i.test(file)) {
        // Add a single underscore to the file name
        const newFileName = file.replace(/\.jpg$/, '_.jpg');
        const newFilePath = path.join(directoryPath, newFileName);

        // fs.renameSync(filePath, newFilePath);
        console.log(`Renamed: ${file} => ${newFileName}`);
      }
    }
  }
}

// Specify the root directory where you want to start the renaming process
const rootDirectory = '/Users/willpreble/Desktop/obrien family archive';

renameFilesRecursively(rootDirectory);

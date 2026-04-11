const fs = require('fs');


// 1.Write 
fs.writeFileSync(
    './02_fileSystem/output.txt',
    `We are writing to a file using writeFileSync method`,
)

fs.writeFile('./02_fileSystem/output2.txt', `This is from async writeFile`, (err) => {
    if(err) {
        console.error('Error writing file:', err);
    } else {
        console.log('File written successfully');
    }
});

// 2.Read
const contacts = fs.readFileSync('./02_fileSystem/contacts.txt', 'utf-8');
console.log(contacts);

fs.readFile('./02_fileSystem/contacts.txt', 'utf-8', (err, data) => {
    if(err) {
        console.error('Error reading file:', err);
    } else {
        console.log('File content:', data);
    }
});

// 3.Append
fs.appendFileSync('./02_fileSystem/output.txt', '\nThis is an appended line.');

fs.appendFile('./02_fileSystem/output2.txt', '\nThis is an appended line in async way.', (err) => {
    if(err) {
        console.error('Error appending file:', err);
    } else {
        console.log('File appended successfully');
    }
});

// 4.Copy, Rename, Delete
fs.copyFile('./02_fileSystem/contacts.txt', './02_fileSystem/contacts_copy.txt', (err) => {
    if(err) {
        console.error('Error copying file:', err);
    } else {
        console.log('File copied successfully');
    }
});

fs.rename('./02_fileSystem/contacts_copy.txt', './02_fileSystem/contacts_renamed.txt', (err) => {
    if(err) {
        console.error('Error renaming file:', err);
    } else {
        console.log('File renamed successfully');
    }
});

fs.unlink('./02_fileSystem/contacts_renamed.txt', (err) => {
    if(err) {
        console.error('Error deleting file:', err);
    } else {
        console.log('File deleted successfully');
    }
});
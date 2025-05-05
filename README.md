File Manager
A Node.js-based CLI File Manager for RS School using ES Modules.
Requirements

Node.js version 22.14.0 or higher
No external dependencies

Installation

Clone the repository or extract the project files
Navigate to the project directory
Run npm install to set up the project

Usage
Start the file manager:

npm run start --username=YourUsername

Available Commands
Navigation

up: Go to parent directory
cd path_to_directory: Change to specified directory
ls: List files and directories

File Operations

cat path_to_file: Read and display file content
add new_file_name: Create empty file
mkdir new_directory_name: Create new directory
rn path_to_file new_filename: Rename file
cp path_to_file path_to_new_directory: Copy file
mv path_to_file path_to_new_directory: Move file
rm path_to_file: Delete file
hash path_to_file: Calculate file hash

OS Information

os --EOL: Show system EOL
os --cpus: Show CPU information
os --homedir: Show home directory
os --username: Show system username
os --architecture: Show CPU architecture

Compression

compress path_to_file path_to_destination: Compress file using Brotli
decompress path_to_file path_to_destination: Decompress file using Brotli

Exit

.exit: Exit the program
Ctrl+C: Exit the program

Features

Uses Node.js Streams API for file operations
Supports Brotli compression
Handles errors with appropriate messages
Maintains current working directory
No external dependencies
ES Modules for modern JavaScript

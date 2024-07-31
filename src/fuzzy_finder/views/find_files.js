const vscode = require("vscode");
const { showQuickPick } = require("../models/show_quick_pic");

async function getFiles() {
  return await vscode.workspace.findFiles("**/*");
}


async function grepFiles() {
  const files = await getFiles(); // get all files in the workspace
  const fileArray = [];
  try {
    for (let i in files) {
      let file = files[i].fsPath;
      //if file ends with .o or .a, skip it cuz it's a binary file
      if (file.endsWith(".o") || file.endsWith(".a")) {
        continue;
      }
      fileArray.push(file); // add file to fileArray
    }
    // show quick pick of the file array
    showQuickPick(fileArray);
  } catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
}

module.exports = {
  grepFiles,
};

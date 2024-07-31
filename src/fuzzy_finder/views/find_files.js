const vscode = require("vscode");
const { showQuickPick } = require("../models/show_quick_pic");

async function getFiles() {
  return await vscode.workspace.findFiles("**/*");
}

async function getFileContent(file) {
  let uri = vscode.Uri.file(file);
  return await vscode.workspace.fs.readFile(uri);
}

async function grepFiles() {
  const files = await getFiles();
  const map = new Map();
  for (let i in files) {
    let file = files[i].fsPath;
    if (file.endsWith(".o") || file.endsWith(".a")) {
      continue;
    }
    const fileContent = await getFileContent(file);
    const content = Buffer.from(fileContent)
      .toString("utf8")
      .substring(0, fileContent.length);
    map[file] = content;
  }
  console.log("done looking at files");
  for (const [key, value] of Object.entries(map)) {
    console.log(key);
    console.log(`value of ${key} is ${value}`);
  }
  vscode.window.showInformationMessage("Hello World from comfy-live-grep");
  showQuickPick(map);
}

module.exports = {
    grepFiles,
}
const { getWebviewContent } = require("../models/webview_model");

const vscode = require("vscode");

async function getFiles() {
  return await vscode.workspace.findFiles("**/*");
}

async function getFileContent(file) {
  return await vscode.workspace.fs.readFile(file);
}

async function GrepSearch() {
  vscode.window.showInformationMessage("Grep Search");
  const files = await getFiles();
  const map = new Map();
  try {
    for (let file of files) {
        let filePath = file.fsPath;

      //if file ends with .o or .a, skip it cuz it's a binary file
      if (filePath.endsWith(".o") || filePath.endsWith(".a")) {
        continue;
      }

      const fileContent = await getFileContent(file);
      const content = Buffer.from(fileContent)
        .toString("utf8")
        .substring(0, fileContent.length);
    map.set(filePath, content);
    }
    for (let [key, value] of map) {
      console.log(key, value);
    }
    const panel = vscode.window.createWebviewPanel(
      'comfy', // Identifies the type of the webview. Used internally
      'Grep-Search', // Title of the panel displayed to the user
      vscode.ViewColumn.One, // Editor column to show the new webview panel in.
      {
        enableScripts: true,
        retainContextWhenHidden: true // Retain the webview context when hidden
      } // Webview options. More on these later.
    );
    panel.webview.html = getWebviewContent(map);
  } catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
}

module.exports = {
  GrepSearch,
};

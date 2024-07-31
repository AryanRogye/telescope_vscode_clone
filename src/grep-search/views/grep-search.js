const vscode = require("vscode");

async function GrepSearch() {
    vscode.window.showInformationMessage("Grep Search");
    // const fileContent = await getFileContent(file);
    // const content = Buffer.from(fileContent)
      // .toString("utf8")
      // .substring(0, fileContent.length);
}

module.exports = {
    GrepSearch,
}
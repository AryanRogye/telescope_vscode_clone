const vscode = require('vscode');

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function getTheme() {
    const colorTheme = vscode.workspace.getConfiguration('workbench').get('colorCustomizations') || {};
    return {
        backgroundColor: colorTheme['editor.background'] || '#FFFFFF',
        color: colorTheme['editor.foreground'] || '#000000'
    };
}

function getWebviewContent(map) {
    const nonce = getNonce();
    const theme = getTheme();
    const fileList = Array.from(map.keys());
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Files List</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
                background-color: ${theme.backgroundColor};
                color: ${theme.color};
            }
            h1 {
                color: #0080c8;
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            li {
                background: #0080c8;
                margin: 5px 0;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                color: white;
                cursor: pointer;
            }
            li.active {
                background: #005a99;
            }
            .textBox {
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }
            .textInput {
                margin: 10px;
                padding: 10px;
                width: 300px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            .showText {
                margin-top: 20px;
                height: 200px;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: ${theme.backgroundColor};
                color: ${theme.color};
                overflow-y: auto;
                white-space: pre-wrap;
            }
        </style>
    </head>
    <body>
        <h1>Files</h1>
        <div class="textBox">
            <input class="textInput" type="text" id="fname" name="fname" placeholder="Type something..." oninput="filterList()">
        </div>
        <ul id="fileList">
            ${fileList.map((key, index) => {
                return `<li id="file-${index}" onclick="showContent('${key}')" tabindex="${index}">${key}</li>`;
            }).join('')}
        </ul>
        <div class="showText" id="showText">
            Select a file to view its content.
        </div>
        <script nonce="${nonce}">
            const map = new Map(${JSON.stringify(Array.from(map.entries()))});
            let activeIndex = 0;

            document.getElementById('fname').focus();
            
            document.getElementById('fname').addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    changeActiveItem(1);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    changeActiveItem(-1);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    showContent(document.querySelector('li.active').textContent);
                }
            });

            function filterList() {
                const filter = document.getElementById('fname').value.toLowerCase();
                const ul = document.getElementById('fileList');
                const li = ul.getElementsByTagName('li');
                for (let i = 0; i < li.length; i++) {
                    const txtValue = li[i].textContent || li[i].innerText;
                    if (txtValue.toLowerCase().indexOf(filter) > -1) {
                        li[i].style.display = "";
                    } else {
                        li[i].style.display = "none";
                    }
                }
            }

            function changeActiveItem(direction) {
                const items = document.querySelectorAll('li');
                items[activeIndex].classList.remove('active');
                activeIndex = (activeIndex + direction + items.length) % items.length;
                while (items[activeIndex].style.display === "none") {
                    activeIndex = (activeIndex + direction + items.length) % items.length;
                }
                items[activeIndex].classList.add('active');
                items[activeIndex].focus();
            }

            function showContent(key) {
                const content = map.get(key);
                document.getElementById('showText').innerText = content;
            }
        </script>
    </body>
    </html>
    `;
}

module.exports = {
    getWebviewContent
}

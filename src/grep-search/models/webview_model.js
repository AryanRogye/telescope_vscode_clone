function getWebviewContent(map) {
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
        </style>
    </head>
    <body>
        <h1>Files</h1>
        <ul>
            ${Array.from(map.keys()).map((key) => {
                return `<li>${key}</li>`;
            }).join('')}
        </ul>
        <div class="textBox">
            <input class="textInput" type="text" id="fname" name="fname" placeholder="Type something...">
        </div>
        <script>
            (function() {
                // Ensure the input field is focused when the page loads
                document.getElementById('fname').focus();
            })();
        </script>
    </body>
    </html>
    `;
}

module.exports = {
    getWebviewContent,
}

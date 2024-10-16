import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(

    vscode.commands.registerCommand('Convert.ArrayOfIntToString', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
          const document = editor.document;
          editor.edit(editBuilder => {
              editor.selections.forEach(sel => {
                  let word = document.getText(sel);
                  let line = word.split(', ').join('", "');
                  if (line[0] === '[') {
                      line = line.slice(1);
                      line = '["' + line;
                  } else {
                      line = '"' + line;
                  }

                  if (line[line.length - 1] === ']') {
                      line = line.slice(0, line.length - 1);
                      line += '"]';
                  } else {
                      line += '"';
                  }
                  editBuilder.replace(sel, line);
              });
          });
      }
    }),

    vscode.commands.registerCommand('Convert.ArrayOfStringToInt', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
          const document = editor.document;
          editor.edit(editBuilder => {
              editor.selections.forEach(sel => {
                  let word = document.getText(sel);
                  let line = word.split('", "').join(', ');
                  if (line[0] === '[') {
                      line = line.slice(2);
                      line = '[' + line;
                  } else {
                      line = line.slice(1);
                  }

                  if (line[line.length - 1] === ']') {
                      line = line.slice(0, line.length - 2);
                      line += ']';
                  } else {
                      line = line.slice(0, line.length - 1);
                  }
                  editBuilder.replace(sel, line);
              });
          });
      }
    }),

    vscode.commands.registerCommand('Print.QuickSort', () => {
      const panel = vscode.window.createWebviewPanel(
        'QuickSort',
        'Quick Sort',
        vscode.ViewColumn.One,
        {}
      );

      panel.webview.html = getWebviewContent();
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quick Sort</title>
</head>
<body>
    
    <h2> Бытсрая Сортировка (Quick Sort) </h2>
    <h3> void QuickSort(int *arr, int left, int right) { </h3>
    <p style="margin-left:20px"> int i = left; </p>
    <p style="margin-left:20px"> int j = right; </p>
    <p style="margin-left:20px">     int pivot = arr[left + rand() % (right - left + 1)]; </p>

    <p style="margin-left:20px">    while (i <= j) { </p>
    <p style="margin-left:40px">         while (arr[i] < pivot) { </p>
    <p style="margin-left:60px">             ++i; </p>
    <p style="margin-left:40px">          } </p>
    <p style="margin-left:40px">          while (arr[j] > pivot) {</p>
    <p style="margin-left:60px">             --j; </p>
    <p style="margin-left:40px">         } </p>
    <p style="margin-left:40px">         if (i <= j) { </p>
    <p style="margin-left:60px">             std::swap(arr[i], arr[j]); </p>
    <p style="margin-left:60px">             ++i; </p>
    <p style="margin-left:60px">             --j;</p>
    <p style="margin-left:40px">         } </p>
    <p style="margin-left:20px">     } </p>

    <p style="margin-left:20px">     if (left < j) {</p>
    <p style="margin-left:40px">         QuickSort(arr, left, j);</p>
    <p style="margin-left:20px">     }</p>
    <p style="margin-left:20px">     if (right > i) {</p>
    <p style="margin-left:40px">         QuickSort(arr, i, right);</p>
    <p style="margin-left:20px">     }</p>
    <p> } </p>

    <img src="https://cf.ppt-online.org/files/slide/i/ikywmZCofVpWGSEAYdrPa51UvB9THzqKF4e7X2/slide-12.jpg"> </img>
</body>
</html>`;
}

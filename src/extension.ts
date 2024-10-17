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
<pre> <code>
void QuickSort(int *arr, int left, int right) { 
    int i = left; 
    int j = right; 
    int pivot = arr[left + rand() % (right - left + 1)];

    while (i <= j) { 
        while (arr[i] < pivot) { 
            ++i; 
        } 
        while (arr[j] > pivot) {
            --j; 
        } 
        if (i <= j) { 
            std::swap(arr[i], arr[j]); 
            ++i; 
            --j;
        } 
    } 

    if (left < j) {
        QuickSort(arr, left, j);
    }
    if (right > i) {
        QuickSort(arr, i, right);
    }
} </code> </pre>

    <img src="https://techrocks.ru/wp-content/uploads/2020/08/vo2ltivrpucxtoamvdeb.gif"> </img>
</body>
</html>`;
}

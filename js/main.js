
$.ajax({
    url: 'https://testapi2447.azurewebsites.net/TestService.asmx/TestAPI',
    method: 'POST'
}).done(function (data) {
    try {
        const parsedData = JSON.parse(data);
        if (parsedData.state === "ok") {
            processResult(parsedData.result);
        } else {
            errorHandle(parsedData.state);
        }
    } catch (err) {
        errorHandle(err);
    }
});

function processResult(result) {
    const theTable = $('#TableBody');
    if (result instanceof Array) {
        result.forEach(rowData => {
            const row = $('<tr>');
            for (let key in rowData) {
                const cell = $('<td>');
                cell.text(rowData[key]);
                row.append(cell);
            }
            theTable.append(row);
        });
    } else {
        throw new Error("抓取到的資料有錯誤，非陣列資料！");
    }
}


function errorHandle(err) {
    console.log("Error: " + err.toString());
    window.alert("Error: " + err.toString());
}
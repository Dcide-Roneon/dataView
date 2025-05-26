
const downloadToCsv =(data, filename = 'leads.csv' )=>{
    if(!Array.isArray(data) || data.length === 0){
        console.warn("No data is present to export");
        return;
    }
    const keys = Object.keys(data[0]);
    const csvRows = [
        keys.join(","), //header row 
        ...data.map(row =>
            keys.map(key =>{
                const cell = row[key];
                if(Array.isArray(cell)){
                    return `"${cell.join(';')}"`; //handle arrays
                }
                return `"${String(cell).replace(/"/g, '""')}"`; // Escape double quotes
            }).join(",")
        ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});

    const url = URL.createObjectURL(blob);
    const link= document.createElement("a");

    link.href = url;
    link.setAttribute("download", filename);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
export default downloadToCsv;

//things to consider: naming conventions. Can't just be a link 
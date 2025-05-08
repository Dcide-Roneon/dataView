import Papa from "papaparse";

export function fetchAndParseCsv(url) {
  return fetch(url)
    .then((response) => response.text())
    .then((text) =>
      new Promise((resolve, reject) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => resolve(results.data),
          error: (err) => reject(err),
        });
      })
    );
}

async function getPopulationData() {
  const response = await fetch(
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
  );

  const json = await response.json();

  const data = json.data;

  // sort by id year
  const sorted_data = data.sort((a, b) => {
    if (a["ID Year"] > b["ID Year"]) {
      return 1;
    } else if (a["ID Year"] < b["ID Year"]) {
      return -1;
    }

    return 0;
  });

  // create html elements
  let table = document.createElement("table");

  // insert table
  document.body.append(table);

  // insert headers
  let row1 = table.createTHead().insertRow();
  row1.insertCell().outerHTML = "<th colspan='2'>US Population</th>";

  let row2 = table.insertRow();
  row2.insertCell().outerHTML = "<th>Year</th>";
  row2.insertCell().outerHTML = "<th>Population</th>";

  // create table body
  let body = table.createTBody();

  // insert rows
  sorted_data.forEach((data) => {
    let row = body.insertRow();

    let year = row.insertCell();
    let pop = row.insertCell();

    year.innerText = data["Year"];
    pop.innerText = data["Population"];
  });
}

getPopulationData();

// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
const sheetId = "1pjwPWASARvu7zrg8W5RnCMpYXC_cOmpL9HNbveAfmWc";
// sheetName is the name of the TAB in your spreadsheet
const sheetName = encodeURIComponent("Finelist");
const sheetName2 = encodeURIComponent("Drinklist");

const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
const sheetURL2 = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName2}`;

// Fines tab
fetch(sheetURL)
  .then((response) => response.text())
  .then((csvText) => handleResponse(csvText));

// Drinks tab
fetch(sheetURL2)
  .then((response) => response.text())
  .then((csvText) => handleResponse2(csvText));

function handleResponse(csvText) {
  let sheetObjects = csvToObjects(csvText);
  // sheetObjects is now an Array of Objects
  // console.log(sheetObjects);
  // ADD CODE HERE

  const ulEl = document.getElementById('ul-el-fines')
  let listItems = ""

  // Showing the list of fines
  function render(sheetObjects) {
    for (let i = 0; i < sheetObjects.length; i++) {
      if (sheetObjects[i].PlayerID) {
        // console.log(sheetObjects[i])
        listItems += `
          <li>
            <div class="fine-item">
              <div class="item">${sheetObjects[i].PlayerID}</div>
              <div class="item">${sheetObjects[i].Fine}</div>
              <div class="item">${sheetObjects[i].Date}</div>
              <div class="item">€ ${sheetObjects[i].Amount}</div>
            </div>
          </li>
        `
      }
      ulEl.innerHTML = listItems
    }
  }

  render(sheetObjects)
}

// DRINKS
function handleResponse2(csvText) {
  let sheetObjects2 = csvToObjects(csvText);
  // sheetObjects is now an Array of Objects
  // console.log(sheetObjects);
  // ADD CODE HERE

  const ulEl2 = document.getElementById('ul-el-drinks')
  let listItems2 = ""

  // Showing the list of drinks
  function render(sheetObjects2) {
    for (let i = 0; i < sheetObjects2.length; i++) {
      if (sheetObjects2[i].Payment === "FALSE") {
        // console.log(sheetObjects[i])
        listItems2 += `
          <li>
            <div class="drink-item">
              <div class="item">${sheetObjects2[i].PlayerID}</div>
              <div class="item">€ ${sheetObjects2[i].Amount}</div>
            </div>
          </li>
        `
      }
      ulEl2.innerHTML = listItems2
    }
  }

  render(sheetObjects2)
}

function csvToObjects(csv) {
  const csvRows = csv.split("\n");
  const propertyNames = csvSplit(csvRows[0]);
  let objects = [];
  for (let i = 1, max = csvRows.length; i < max; i++) {
    let thisObject = {};
    let row = csvSplit(csvRows[i]);
    for (let j = 0, max = row.length; j < max; j++) {
      thisObject[propertyNames[j]] = row[j];
      // BELOW 4 LINES WILL CONVERT DATES IN THE "ENROLLED" COLUMN TO JS DATE OBJECTS
      // if (propertyNames[j] === "Enrolled") {
      //   thisObject[propertyNames[j]] = new Date(row[j]);
      // } else {
      //   thisObject[propertyNames[j]] = row[j];
      // }
    }
    objects.push(thisObject);
  }
  return objects;
}

function csvSplit(row) {
  return row.split(",").map((val) => val.substring(1, val.length - 1));
}



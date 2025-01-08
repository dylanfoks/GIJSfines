// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
const sheetId = "1pjwPWASARvu7zrg8W5RnCMpYXC_cOmpL9HNbveAfmWc";
// sheetName is the name of the TAB in your spreadsheet
const sheetName = encodeURIComponent("Finelist");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

fetch(sheetURL)
  .then((response) => response.text())
  .then((csvText) => handleResponse(csvText));

function handleResponse(csvText) {
  let sheetObjects = csvToObjects(csvText);
  // sheetObjects is now an Array of Objects
  // console.log(sheetObjects);
  // ADD CODE HERE

/////////////////////////////////////////////////////////////////////////////////////////////////////////

  // const fineList = document.getElementById('fine-list')
  const descendDateBtn = document.getElementById('descend-date-btn')
  const ulEl = document.getElementById('ul-el')

  let listItems = ""

  // Showing the list of fines
  function render(sheetObjects) {
    // let listItems = ""
    for (let i = 0; i < sheetObjects.length; i++) {
      if (sheetObjects[i].Payment === "FALSE") {
        // console.log(sheetObjects[i])
        listItems += `
          <li>
            <div class="fine-item">
              <div class="item">${sheetObjects[i].PlayerID}</div>
              <div class="item">${sheetObjects[i].Fine}</div>
              <div class="item">${sheetObjects[i].Date}</div>
              <div class="item">${sheetObjects[i].Amount}</div>
            </div>
          </li>
        `
      }
      ulEl.innerHTML = listItems
    }
  }
  
  // function clearSheet() {
  //   listItems = ""
  // }

  render(sheetObjects)

  // descendDateBtn.addEventListener('click', function(){
  //   // sheetObjects.reverse()
  //   sheetObjects.sort((a, b) => a.Date - b.Date);
  //   clearSheet()
  //   render(sheetObjects)
  //   // console.log(sheetObjects)
  // })

  // <div class="fine-item">
  //             <div id="player-id" class="player-id">${sheetObjects[i].PlayerID}</div>
  //             <div id="fine" class="fine">${sheetObjects[i].Fine}</div>
  //             <div id="date" class="date">${sheetObjects[i].Date}</div>
  //             <div id="amount" class="amount">${sheetObjects[i].Amount}</div>
  //           </div>




























// Dont remove this string
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



function restoreData() {
  if (!localStorage.getItem("flashCardArrayClone")) {
    flashCardArrayClone = createFlashCardArray(1);
  } else {
    serverDataContainer = localStorage.getItem("flashCardArrayClone");
    serverDataContainer = JSON.parse(serverDataContainer);
    flashCardArrayClone = serverDataContainer;
  }
}

window.addEventListener("beforeunload", function (event) {
  // Save to a different local storage key to separate from the main Flashcard Baker
  localStorage.setItem(
    "flashCardArrayClone",
    JSON.stringify(flashCardArrayClone)
  );
});

function modifyFlashCardArray(event) {
  let idNumber;
  let templateFlashCard = new flashCard();

  if (this.id.includes("Front")) {
    idNumber = this.id.slice(20);
    templateFlashCard = flashCardArrayClone[idNumber];
    templateFlashCard.front = event.target.value;
    flashCardArrayClone[idNumber] = templateFlashCard;
  } else if (this.id.includes("Back")) {
    idNumber = this.id.slice(19);
    templateFlashCard = flashCardArrayClone[idNumber];
    templateFlashCard.back = event.target.value;
    flashCardArrayClone[idNumber] = templateFlashCard;
  }

  // Save flashcards to the clone storage
  localStorage.setItem(
    "flashCardArrayClone",
    JSON.stringify(flashCardArrayClone)
  );
}

let flashCardArrayClone;
let flashCardNumberClone = 0;
let tableRowNumberClone = 0;

function createFlashCardTable() {
  addRootFlashCardToPage();

  for (let i = 0; i < flashCardArrayClone.length; i++) {
    testFlashCard = flashCardArrayClone[i];
    if (testFlashCard.front !== "" || testFlashCard.back !== "") {
      addNewFlashCardToPage();
    }
  }
}

function addRootFlashCardToPage() {
  let tableCellFront;
  let tableCellBack;
  let frontInputCell;
  let backInputCell;
  let currentFlashCard;
  let flashCardNumberDisplay;

  tableRow = document.createElement("tr");
  tableRow.classList.add("borderedElements");
  document.getElementById("tableContainer").appendChild(tableRow);
  tableRow.setAttribute("id", `flashCardTableRowClone0`);

  flashCardNumberDisplay = document.createElement("div");
  flashCardNumberDisplay.innerText = `${flashCardNumberClone + 1}`;
  flashCardNumberDisplay.classList.add("flashCardNumberDisplays");
  tableRow.appendChild(flashCardNumberDisplay);

  tableCellFront = document.createElement("td");
  tableCellFront.classList.add(
    "borderedElements",
    "tableCells",
    "frontTabCell"
  );
  tableRow.appendChild(tableCellFront);

  tableCellBack = document.createElement("td");
  tableCellBack.classList.add("borderedElements", "tableCells", "backTabCell");
  tableRow.appendChild(tableCellBack);

  currentFlashCard = flashCardArrayClone[flashCardNumberClone];

  frontInputCell = document.createElement("textarea");
  frontInputCell.classList.add("frontInpCell");
  frontInputCell.setAttribute(
    "id",
    `flashCardFrontNumberClone${flashCardNumberClone}`
  );
  frontInputCell.addEventListener("input", modifyFlashCardArray);
  frontInputCell.value = currentFlashCard.front;
  tableCellFront.appendChild(frontInputCell);

  backInputCell = document.createElement("textarea");
  backInputCell.classList.add("backInpCell");
  backInputCell.setAttribute(
    "id",
    `flashCardBackNumberClone${flashCardNumberClone}`
  );
  backInputCell.addEventListener("input", modifyFlashCardArray);
  backInputCell.value = currentFlashCard.back;
  tableCellBack.appendChild(backInputCell);

  flashCardNumberClone++;
  tableRowNumberClone++;
}

restoreData();
createFlashCardTable();

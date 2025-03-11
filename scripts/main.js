function createTopBar() {
  const divButtonContainer = document.createElement("div");
  divButtonContainer.classList.add("borderedElements", "topBarBtn");
  divButtonContainer.setAttribute("id", "buttonContainer");
  document.body.appendChild(divButtonContainer);

  const copyPromptButton = document.createElement("button");
  copyPromptButton.classList.add("topButtons");
  copyPromptButton.innerText = "Copy prompt";
  copyPromptButton.addEventListener("click", function () {
    navigator
      .clipboard.writeText(`I want you to create a deck of flashcards from the text.

      Instructions to create a deck of flashcards:
      - Keep the flashcards simple, clear, and focused on the most important information.
      - Make sure the questions are specific and unambiguous.
      - Use simple and direct language to make the cards easy to read and understand.
      - Answers should contain only a single key fact/name/concept/term.
      
      Let's do it step by step when creating a deck of flashcards:
      1. Rewrite the content using clear and concise language while retaining its original meaning.
      2. Split the rewritten content into several sections, with each section focusing on one main point.
      3. Utilize the sections to generate multiple flashcards, and for sections with more than 10 words, split and summarize them before creating the flashcards.
      
      Text: The characteristics of the Dead Sea: Salt lake located on the border between Israel and Jordan. Its shoreline is the lowest point on the Earth's surface, averaging 396 m below sea level. It is 74 km long. It is seven times as salty (30% by volume) as the ocean. Its density keeps swimmers afloat. Only simple organisms can live in its saline waters
      
      A deck of flashcards: 
      |Question|Answer|
      |---|---|
      |Where is the Dead Sea located?|on the border between Israel and Jordan|
      |What is the lowest point on the Earth's surface?|The Dead Sea shoreline|
      |What is the average level on which the Dead Sea is located?|396 meters (below sea level)|
      |How long is the Dead Sea?|74 km|
      |How much saltier is the Dead Sea as compared with the oceans?|7 times|
      |What is the volume content of salt in the Dead Sea?|30%|
      |Why can the Dead Sea keep swimmers afloat?|due to high salt content|
      |Why is the Dead Sea called Dead?|because only simple organisms can live in it|
      |Why only simple organisms can live in the Dead Sea?|because of high salt content|

      Text:
      `);
  });
  divButtonContainer.appendChild(copyPromptButton);

  // const roughNotesButton = document.createElement("button");
  // roughNotesButton.classList.add("topButtons");
  // roughNotesButton.innerText = "rough";
  // roughNotesButton.addEventListener("click", function () {
  //     createTextField();
  // });
  // divButtonContainer.appendChild(roughNotesButton);

  // Ideally the above button will create a text field that you can drag around the program, meant to be for typing rough abstract notes

  const openWebPagesButton = document.createElement("button");
  openWebPagesButton.classList.add("topButtons");
  openWebPagesButton.innerText = "Open GPT ";
  openWebPagesButton.addEventListener("click", function () {
    open("https://chat.openai.com/");
    // open("https://codepen.io/pen/");
    // open("https://www.youtube.com/playlist?list=PLWoeSuhDPfxuetQNxpsbz1Za2zynhps02");
    // open("https://www.theodinproject.com/paths/full-stack-javascript?");
    // open("https://www.notion.so/Check-List-page-fe10d5635c4240a5a056649997890f4e");
  });

  divButtonContainer.appendChild(openWebPagesButton);

  const downloadButton = document.createElement("button");
  downloadButton.classList.add("topButtons");
  downloadButton.innerText = "download flashcards";
  downloadButton.addEventListener("click", function () {
    // When you want to pass arguments to an event listener function, you typically need to wrap the function call in an anonymous function, so that the arguments can be properly passed.
    csv = createCSV(flashCardArray);

    downloadCSV(csv, "flash card pack");
  });
  divButtonContainer.appendChild(downloadButton);
}
function createClearButton() {
  const clearButton = document.createElement("button");
  clearButton.innerText = "clear all flashcards";
  clearButton.classList.add("topButtons");

  clearButton.addEventListener("click", function () {
    let promptAnswer = prompt(
      `THIS WILL ERASE ALL OF YOUR CURRENT FLASHCARDS, IF YOU UNDERSTAND TYPE: \"I understand\" Note: This will also reload the webpage`
    );
    let templateFlashCard = new flashCard();
    templateFlashCard.front = "";
    templateFlashCard.back = "";

    if (promptAnswer == "I understand") {
      let newFlashCardArray = [0];

      flashCardArray = newFlashCardArray;
      flashCardArray[0] = templateFlashCard;

      location.reload();
    } else {
      alert(
        'You did not type: "I understand" and therefore we have not erased your flashcard '
      );
    }
  });

  let buttonContainer = document.getElementById("buttonContainer");

  buttonContainer.appendChild(clearButton);
}
function createTableStructure() {
  // Creates all the parts of the table that dont include the actual cells themselves

  const divTableContainer = document.createElement("div");
  divTableContainer.classList.add(
    "borderedElements",
    "tabContainer",
    "flashcardFadeIn"
  );
  document.body.appendChild(divTableContainer);

  const tableContainer = document.createElement("table");
  tableContainer.classList.add("borderedElements");
  tableContainer.setAttribute("id", "tableContainer");
  divTableContainer.appendChild(tableContainer);

  const headingTableRow = document.createElement("tr");
  headingTableRow.classList.add("borderedElements");
  tableContainer.appendChild(headingTableRow);

  const frontTableHeading = document.createElement("th");
  frontTableHeading.classList.add(
    "borderedElements",
    "frontText",
    "tableHeadings"
  );
  frontTableHeading.innerHTML = "Front";

  headingTableRow.appendChild(frontTableHeading);
}

function flashCard(front, back) {
  this.front = front;
  this.back = back;
}

function createCSV(flashCardArray) {
  // This function creates the CSV file that we will import into anki
  // It does this using a for loop, adding each flashcard to the same variable
  // The comma and \n characters are needed for properly formatting the csv file so that anki can take the import
  let CSVFile = "";
  let currentFlashCard;

  for (let i = 0; i < flashCardArray.length; i++) {
    currentFlashCard = flashCardArray[i];
    currentFlashCard.front = formatQuotesForCSV(currentFlashCard.front);
    currentFlashCard.back = formatQuotesForCSV(currentFlashCard.back);
    CSVFile += `\"${currentFlashCard.front}\",\"${currentFlashCard.back}\"\n`;
  }

  return CSVFile;
}

function formatQuotesForCSV(flashCardText) {
  flashCardText = flashCardText.replace(/"/g, '""');

  return flashCardText;
}

function downloadCSV(csv, filename) {
  // Downloads the CSV file to the computer
  const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const csvURL = URL.createObjectURL(csvData);

  const tempLink = document.createElement("a");
  tempLink.href = csvURL;
  tempLink.setAttribute("download", filename);
  tempLink.click();
}

function createFlashCardArray(size) {
  // even though we pass the flashcards back in, we still set templateFlashCard equal to the array index always, in order to prevent overwriting front or back sides of flashcards
  // and therefore we need to create the array with flashcards, instead of just creating an empty array
  let flashCardTemplate;

  const flashCardArray = [size];
  for (let i = 0; i < size; i++) {
    flashCardTemplate = new flashCard();
    flashCardTemplate.front = "";
    flashCardTemplate.back = "";
    flashCardArray[i] = flashCardTemplate;
  }

  return flashCardArray;
}

function restoreData() {
  if (!localStorage.flashCardArray) {
    flashCardArray = createFlashCardArray(1);
  } else {
    serverDataContainer = localStorage.getItem("AIflashCardArray");
    serverDataContainer = JSON.parse(serverDataContainer);
    flashCardArray = serverDataContainer;
  }
}

function addRootFlashCardToPage() {
  let tableCellFront;
  let tableCellBack;
  let frontInputCell;
  let backInputCell;
  let currentFlashCard;
  let flashCardNumberDisplay;
  let utilityButton; //called this because later I'll add more features to it

  tableRow = document.createElement("tr");
  tableRow.classList.add("borderedElements");
  tableRow.addEventListener("keydown", newFlashCardShortCut);
  document.getElementById("tableContainer").appendChild(tableRow);
  tableRow.setAttribute("id", `flashCardTableRow0`);

  flashCardNumberDisplay = document.createElement("div");
  flashCardNumberDisplay.innerText = `${flashCardNumber + 1}`; // +1 because we want to count our flashcards from 1 not 0, I could change the base way we slice ids, and count from 0 instead, but Im scared to break it

  flashCardNumberDisplay.classList.add("flashCardNumberDisplays");

  tableRow.appendChild(flashCardNumberDisplay);

  utilityButton = document.createElement("button");
  utilityButton.innerText = "utility button";
  utilityButton.classList.add("utilityButtons");
  utilityButton.id = `utilityButton${flashCardNumber}`;
  utilityButton.tabIndex = "-1";

  utilityButton.addEventListener("click", function copyForGPT(event) {
    let utilityButtonNumber = event.target.id;
    let flashCardNumber = utilityButtonNumber.slice(13);

    let frontField = document.getElementById(
      `flashCardFrontNumber${flashCardNumber}`
    ).value;
    let backField = document.getElementById(
      `flashCardBackNumber${flashCardNumber}`
    ).value;

    let textToCopy = `Is the following flashcard true or false? : ${frontField} ${backField}`;
    navigator.clipboard.writeText(textToCopy);
  });

  // Creates the front table cell
  tableCellFront = document.createElement("td");
  tableCellFront.classList.add(
    "borderedElements",
    "tableCells",
    "frontTabCell"
  );
  tableRow.appendChild(tableCellFront);

  // Creates the back table cell
  tableCellBack = document.createElement("td");
  tableCellBack.classList.add("borderedElements", "tableCells", "backTabCell");
  tableRow.appendChild(tableCellBack);

  // It does this in case the flashCardArray contains cards saved to local storage
  currentFlashCard = flashCardArray[flashCardNumber];

  /* Creates the inputCell to put inside the front cell 
  Also sets the front inputCells to any saved flashcards*/
  frontInputCell = document.createElement("textarea");
  frontInputCell.classList.add("frontInpCell");
  frontInputCell.setAttribute("type", "text");
  frontInputCell.setAttribute("id", `flashCardFrontNumber${flashCardNumber}`);
  frontInputCell.addEventListener("input", modifyFlashCardArray);

  frontInputCell.value = currentFlashCard.front;
  tableCellFront.appendChild(frontInputCell);

  /* Creates the inputCell to put inside the back cell 
  Also sets the back inputCells to any saved flashcards*/
  backInputCell = document.createElement("textarea");
  backInputCell.classList.add("backInpCell");
  backInputCell.setAttribute("type", "text");
  backInputCell.setAttribute("id", `flashCardBackNumber${flashCardNumber}`);
  backInputCell.addEventListener("input", modifyFlashCardArray);
  backInputCell.value = currentFlashCard.back;
  tableCellBack.appendChild(backInputCell);

  flashCardNumber++;
  tableRowNumber++;
}

function newFlashCardShortCut(event) {
  if (event.ctrlKey && event.code === "Enter") {
    addNewFlashCardToPage();
  }
}

function addNewFlashCardToPage() {
  let tableCellFront;
  let tableCellBack;
  let tableRow;
  let frontInputCell;
  let backInputCell;
  let currentFlashCard;
  let blankFlashCard;

  tableRow = document.createElement("tr");
  tableRow.classList.add("borderedElements", "flashcardFadeIn");
  tableRow.addEventListener("keydown", newFlashCardShortCut);
  document
    .getElementById("tableContainer")
    .insertBefore(
      tableRow,
      document.getElementById(`flashCardTableRow${tableRowNumber}`)
    );

  flashCardNumberDisplay = document.createElement("div"); //change to span if needed
  flashCardNumberDisplay.innerText = `${flashCardNumber + 1}`;
  flashCardNumberDisplay.classList.add(
    "flashCardNumberDisplays",
    "buttonFadeIn"
  );
  tableRow.appendChild(flashCardNumberDisplay);

  utilityButton = document.createElement("button");
  utilityButton.innerText = "utility button";
  utilityButton.classList.add("utilityButtons", "buttonFadeIn");
  utilityButton.id = `utilityButton${flashCardNumber}`;
  utilityButton.tabIndex = "-1";

  utilityButton.addEventListener("click", function copyForGPT(event) {
    let utilityButtonNumber = event.target.id;
    let flashCardNumber = utilityButtonNumber.slice(13);

    let frontField = document.getElementById(
      `flashCardFrontNumber${flashCardNumber}`
    ).value;
    let backField = document.getElementById(
      `flashCardBackNumber${flashCardNumber}`
    ).value;

    let textToCopy = `Is the following flashcard true or false? : ${frontField} ${backField}`;
    navigator.clipboard.writeText(textToCopy);
  });

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

  // It does this in case the flashCardArray contains cards saved to local storage

  if (flashCardArray[flashCardNumber] == undefined) {
    blankFlashCard = new flashCard("", "");
    flashCardArray.push(blankFlashCard);
  }

  currentFlashCard = flashCardArray[flashCardNumber];

  /* Creates the inputCell to put inside the front cell 
  Also sets the front inputCells to any saved flashcards*/
  frontInputCell = document.createElement("textarea");
  frontInputCell.classList.add("frontInpCell");
  frontInputCell.setAttribute("type", "text");
  frontInputCell.setAttribute("id", `flashCardFrontNumber${flashCardNumber}`);
  frontInputCell.addEventListener("input", modifyFlashCardArray);
  frontInputCell.value = currentFlashCard.front;

  frontInputCell.addEventListener(
    "input",
    function () {
      autoResize(frontInputCell);
    },
    false
  );
  tableCellFront.appendChild(frontInputCell);

  /* Creates the inputCell to put inside the back cell 
  Also sets the back inputCells to any saved flashcards*/
  backInputCell = document.createElement("textarea");
  backInputCell.classList.add("backInpCell");
  backInputCell.setAttribute("type", "text");
  backInputCell.setAttribute("id", `flashCardBackNumber${flashCardNumber}`);
  backInputCell.addEventListener("input", modifyFlashCardArray);
  backInputCell.value = currentFlashCard.back;
  backInputCell.addEventListener(
    "input",
    function () {
      autoResize(backInputCell);
    },
    false
  );
  tableCellBack.appendChild(backInputCell);

  document.getElementById(`flashCardFrontNumber${flashCardNumber}`).focus();
  flashCardNumber++;
  tableRowNumber++;

  localStorage.setItem("flashCardArray", JSON.stringify(flashCardArray));
}

function modifyFlashCardArray(event) {
  let idNumber;
  let templateFlashCard = new flashCard();

  if (this.id.includes("Front")) {
    idNumber = this.id.slice(20);
    templateFlashCard = flashCardArray[idNumber]; // this is so that we dont overwrite the back part of the card when we pass the templateFlashCard into the array
    templateFlashCard.front = event.target.value; // take input text and sets it as the front of the flashcard
    flashCardArray[idNumber] = templateFlashCard; // then finally pass the new flashcard into the array
  } else if (this.id.includes("Back")) {
    idNumber = this.id.slice(19);
    templateFlashCard = flashCardArray[idNumber]; // this is so that we dont overwrite the front  part of the card when we pass the templateFlashCard into the array
    templateFlashCard.back = event.target.value; // take input text and sets it as the front of the flashcard
    flashCardArray[idNumber] = templateFlashCard; // then finally pass the new flashcard into the array
  }
}

function createFlashCardTable() {
  addRootFlashCardToPage();

  for (let i = 0; i < flashCardArray.length; i++) {
    testFlashCard = flashCardArray[i];
    if (testFlashCard.front != "" || testFlashCard.back != "") {
      addNewFlashCardToPage();
    }
  }
}

function createTitleName() {
  const titleName = document.createElement("h1");
  titleName.classList.add("mainTitle");
  titleName.innerText = "DD";
  document.body.appendChild(titleName);
}

window.addEventListener("beforeunload", function (event) {
  // This block  makes it so that whenever you close the webpage, all the data gets saved
  localStorage.setItem("AIflashCardArray", JSON.stringify(flashCardArray));
});

function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

window.onload = function () {
  var textareas = document.querySelectorAll("textarea");

  textareas.forEach(function (textarea) {
    autoResize(textarea);
    textarea.addEventListener(
      "input",
      function () {
        autoResize(textarea);
      },
      false
    );
  });
};

window.addEventListener("beforeunload", function (event) {
  // Custom message to display
  var confirmationMessage =
    "Unload your flashcards, otherwise this shit will overwhelm you";

  alert(confirmationMessage)(
    // Display the confirmation message
    event || window.event
  ).returnValue = confirmationMessage;
  return confirmationMessage;
});

let flashCardArray;
let flashCardNumber = 0;
let tableRowNumber = 0;
let testFlashCard;

createTopBar();
createClearButton();
createTableStructure();
restoreData();
createFlashCardTable();

// Dev Ramblings:

// add a third column for copy and pasting code, and just make the card type include a 3rd column

// have an animation happen each time you make a new card, but make the animation cycle randomly through a set of possible animations
// and let the user change font type with a drop down menu

//use anki API to make adding cards seamless, and maybe figure out how to add images to cards with this API

// for skins, just change the stylesheet used with js, and do this by having a button at the top that the user can click to change the current colour scheme

// let your code open chatgpt with as shortcut

// A lot of my flash cards follow certain patterns like what is _____ ?
// So I could create shorcuts to auto add that text to the current flash card im on
// maybe something like ctrl + enter + another symbol

// Or actually make What is _____ ? the default text in a box, and all we have to do is type w then ctrl + something to auto insert that, otherwise our typing will get rid of the placeholder text

// Grammarly built in: https://developer.grammarly.com/apps

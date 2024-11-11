const boldButton = document.querySelector(".bold-button");
const italicsButton = document.querySelector(".italics-button");
const codeButton = document.querySelector(".code-button");
const imageButton = document.querySelector(".image-button");

let divSelectedOrNot = false;

InitializeEventListeners();

document.addEventListener("selectionchange", (e) => {
  const selection = getSelection();
  if (selection.type == "Range" && selection.rangeCount > 0) {
    if (selection.anchorNode.attributes) {
      divSelectedOrNot = true;
    } else {
      divSelectedOrNot = false;
    }
  }
});

function divSelected(selectionObject, node, att) {
  switch (att) {
    case "BOLD":
      node.textContent = node.textContent
        .trim()
        .replace(node.textContent.trim(), `**${node.textContent.trim()}**`);
      break;
    case "ITALICS":
      node.textContent = node.textContent
        .trim()
        .replace(node.textContent.trim(), `__${node.textContent.trim()}__`);
      break;
  }
}

function textSelected(selectionObject, node, att) {
  console.log("in textSelected");
  const text = node.parentNode.textContent;
  const word = text
    .substring(selectionObject.anchorOffset, selectionObject.focusOffset)
    .trim();
  switch (att) {
    case "BOLD":
      node.parentNode.textContent = text.replace(word, `**${word}**`);
      break;
    case "ITALICS":
      node.parentNode.textContent = text.replace(word, `__${word}__`);
      break;
  }
}

function InitializeEventListeners() {
  boldButton.addEventListener("click", (e) => {
    const selection = document.getSelection();
    if (divSelectedOrNot) {
      divSelected(selection, selection.anchorNode, "BOLD");
      return;
    } else {
      textSelected(selection, selection.anchorNode, "BOLD");
    }
  });

  italicsButton.addEventListener("click", (e) => {
    const selection = document.getSelection();
    if (divSelectedOrNot) {
      divSelected(selection, selection.anchorNode, "ITALICS");
      return;
    } else {
      textSelected(selection, selection.anchorNode, "ITALICS");
    }
  });
}

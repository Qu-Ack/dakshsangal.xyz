const boldButton = document.querySelector(".bold-button");
const italicsButton = document.querySelector(".italics-button");
const codeButton = document.querySelector(".code-button");
const imageButton = document.querySelector(".image-button");
const writer = document.querySelector(".writer");

let divSelectedOrNot = false;

InitializeEventListeners();

document.addEventListener("selectionchange", (e) => {
  const selection = getSelection();
  console.log(selection.anchorNode.nodeName);
  if (selection.type == "Range" && selection.rangeCount > 0) {
    if (selection.anchorNode.nodeName == "DIV") {
      divSelectedOrNot = true;
    } else {
      divSelectedOrNot = false;
    }
  }
});

function divSelected(selectionObject, node, att) {
  console.log("this is a div", node.textContent.trim());
  switch (att) {
    case "BOLD":
      console.log(
        "inside divSelected function, the text selected is : ",
        node.textContent,
      );
      node.textContent = node.textContent
        .trim()
        .replace(node.textContent.trim(), `**${node.textContent.trim()}**`);
      console.log("new textContent, :", node.textContent);
      break;
    case "ITALICS":
      node.textContent = node.textContent
        .trim()
        .replace(node.textContent.trim(), `__${node.textContent.trim()}__`);
      break;
  }
}

function textSelected(selectionObject, node, att) {
  console.log(selectionObject);
  console.log(selectionObject.getRangeAt(0));
  const text = node.parentNode.textContent;
  const word = text
    .substring(selectionObject.anchorOffset, selectionObject.focusOffset)
    .trim();
  console.log(
    "inside textSelected function, the text that the operation will be applied on is : ",
    word,
  );
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

  writer.addEventListener("click", () => {
    writer.focus();
  });

  writer.addEventListener("keydown", (e) => {
    console.log("keyd own");
  });
}

function handleKeyPressOnWriter(key) {
  switch (key) {
    case "ENTER":
  }
}

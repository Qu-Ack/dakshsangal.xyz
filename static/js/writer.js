document.addEventListener("selectionchange", (e) => {
  const selection = window.getSelection();
  if (selection.anchorNode.data) {
    const result = selection.anchorNode.data.substring(
      selection.anchorOffset,
      selection.focusOffset,
    );

    if (result !== "") {
      console.log(result);
    }
  }
});

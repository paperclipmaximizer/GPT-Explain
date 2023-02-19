browser.runtime.onMessage.addListener((message) => {
    if (message.action === "displayDefinition") {
      const definition = message.definition;
      const selectedText = message.selectedText;
      displayDefinition(definition, selectedText);
    }
  });

function displayDefinition(definition, selectedText) {
    const tooltip = document.createElement("div");
    tooltip.style.backgroundColor = "white";
    tooltip.style.border = "1px solid black";
    tooltip.style.padding = "10px";
    tooltip.style.position = "fixed";
    tooltip.style.zIndex = "9999";
    tooltip.innerHTML = `Definition of "${selectedText}": ${definition}`;
    document.body.appendChild(tooltip);
}
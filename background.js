browser.contextMenus.create({
  id: "get-definition",
  title: "GPT Explain",
  contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "get-definition") {
    const selectedText = info.selectionText;
    const prompt = `Define "${selectedText}"`;
    const apiKey = "";
    const url = "https://api.openai.com/v1/engines/text-davinci-002/completions";

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "prompt": prompt,
        "max_tokens": 100,
        "temperature": 0.5
      })
    })
    .then(response => response.json())
    .then(json => {
      if (json.choices) {
        const definition = json.choices[0].text;
        browser.tabs.sendMessage(tab.id, {action: "displayDefinition", definition: definition, selectedText: selectedText});
      } else {
        console.error("Error: API response does not contain expected format.");
      }
    })
    .catch(error => {
      console.error("Error: API call failed.", error);
    });
  }
});

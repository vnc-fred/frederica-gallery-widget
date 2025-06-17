
const NOTION_TOKEN = "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";
const DATABASE_ID = "68954b2030dd4642bbb3a2e09bf50fd4";

fetch("https://api.notion.com/v1/databases/" + DATABASE_ID + "/query", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + NOTION_TOKEN,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then(data => {
  const container = document.getElementById("gallery");
  data.results.forEach(page => {
    const image = page.properties['Criativo']?.files?.[0]?.external?.url || "";
    const title = page.properties['Name']?.title?.[0]?.plain_text || "Sem título";
    const pageId = page.id.replace(/-/g, "");
    const notionUrl = "https://www.notion.so/" + title.replace(/ /g, "-") + "-" + pageId;

    if (image) {
      const card = document.createElement("a");
      card.href = notionUrl;
      card.className = "card";
      card.target = "_blank";
      card.innerHTML = `
        <img src="${image}" alt="${title}" />
      `;
      container.appendChild(card);
    }
  });
})
.catch(error => console.error("Erro:", error));

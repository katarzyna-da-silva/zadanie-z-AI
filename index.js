const fs = require('fs');
const OpenAI = require('openai');

META_PROMPT = `
`.strip();

// Wczytywanie pliku 
fs.readFile('/home/z390/Bureau/zadanie/artykul.txt', 'utf8', async (err, data) => {
  if (err) {
    console.error("Błąd wczytywania pliku:", err);
    return;
  } 
  // Polaczenie sie z OpenAI, i wyslanie zapytania do OpenAi
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
  });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: META_PROMPT,
          }
        ]
      });

        const outputHtml = response.choices[0].message.content;


fs.writeFile('/home/z390/Bureau/zadanie/output.html', outputHtml, (err) => {
if (err) {
  console.log('Sprobuj ponownie.Problem z plikiem', err);
} else {
  console.log('Plik zapisany w output.html');
}
});
      }catch (apiErr) {
        console.log("Blad w pytaniu dla Openai", apiErr)
      }
    });
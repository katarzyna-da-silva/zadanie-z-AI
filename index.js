const fs = require('fs');
const OpenAI = require('openai');
require('dotenv').config();
console.log(process.env.OPENAI_API_KEY);
// Wczytywanie pliku 
fs.readFile('/home/z390/Bureau/zadanie/text.txt', 'utf8', async (err, data) => {
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
            content: `Please convert the following article into HTML code. It should include headings, paragraphs, and proper HTML structure:
                    Article title: "Understanding the Basics of HTML"
                    Content: "${data}"
                    
                    Use h1 to h5 headers, choose appropriately according to html and css rules.

                    Use <img> tags with src="image_placeholder.jpg" attribute. Add alt attribute to each image with exact prompt that we can use to generate the graphic.

                    Place captions under the graphics using appropriate HTML tag.

                    No CSS or JavaScript code. The returned code should contain only content to be inserted between <body> and </body> tags.

                    Do not include <html>, <head> or <body> tags. `
        }
        ]
      });

        const outputHtml = response.choices[0].message.content;


fs.writeFile('/home/z390/Bureau/zadanie/artykul.html', outputHtml, (err) => {
if (err) {
  console.log('Sprobuj ponownie.Problem z plikiem', err);
} else {
  console.log('Plik zapisany w artykul.html');
}
});
      }catch (apiErr) {
        console.log("Blad w pytaniu dla Openai", apiErr)
      }
    });
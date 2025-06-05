async function runSearch() {
    const location = document.getElementById('location').value;
    const tagSelect = document.getElementById('tags');
    const tags = Array.from(tagSelect.selectedOptions).map(opt => opt.value).join(", ");

    const prompt = `I’m planning a trip to ${location}. What are 3 fun activities or attractions that are tagged with ${tags}? Use the travel guide database style. Keep it concise but helpful. Explain why each one fits.`;

    const apiKey = "YOUR_OPENAI_API_KEY_HERE"; // <-- Replace this with your API key

    const responseBox = document.getElementById('responseBox');
    responseBox.textContent = "Asking GPT...";

    const result = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a travel guide assistant using curated local data." },
                { role: "user", content: prompt }
            ]
        })
    });

    const data = await result.json();
    const answer = data.choices?.[0]?.message?.content || "No response found.";
    responseBox.textContent = answer;
}
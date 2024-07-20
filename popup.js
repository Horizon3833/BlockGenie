document.getElementById('generate').addEventListener('click', async () => {
  const apiKey = document.getElementById('apiKey').value;
  const prompt = document.getElementById('prompt').value;
  const loadingIndicator = document.getElementById('loading');
  const blockXmlTextarea = document.getElementById('blockXml');
  const injectButton = document.getElementById('inject');

  if (!apiKey) {
    alert('Please enter your Gemini API key.');
    return;
  }

  if (prompt) {
    const enhancedPrompt = `
    Generate XML with unique IDs for the following block description:
      Example for prompt: on button btn click, set my_label text to Hello World
      Code: 
      <xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="component_event" id="FzKh{3uf25OBztv/({[W" x="-406" y="-236">
    <mutation component_type="Button" is_generic="false" instance_name="btn" event_name="Click"></mutation>
    <field name="COMPONENT_SELECTOR">btn</field>
    <statement name="DO">
      <block type="component_set_get" id="$y8_WN+xqnaIfw@Cz:R?">
        <mutation component_type="Label" set_or_get="set" property_name="Text" is_generic="false" instance_name="my_label"></mutation>
        <field name="COMPONENT_SELECTOR">my_label</field>
        <field name="PROP">Text</field>
        <value name="VALUE">
          <block type="text" id="7m}IG+iZv(J?$(is{}$t">
            <field name="TEXT">Hello World</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
</xml>
      User Prompt: ${prompt}
      Please ensure the generated XML is well-formed and correctly structured for MIT App Inventor.
    `;

    loadingIndicator.style.display = 'block';
    blockXmlTextarea.style.display = 'none';
    injectButton.style.display = 'none';

    try {
      const blockXml = await generateBlocks(apiKey, enhancedPrompt);
      blockXmlTextarea.value = blockXml;
      blockXmlTextarea.style.display = 'block';
      injectButton.style.display = 'block';
    } catch (error) {
      console.error('Error generating blocks:', error);
      alert(`Error generating blocks: ${error.message}`);
    } finally {
      loadingIndicator.style.display = 'none';
    }
  }
});

document.getElementById('inject').addEventListener('click', () => {
  const blockXml = document.getElementById('blockXml').value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "injectBlocks", blockXml: blockXml}, function(response) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        alert(`Error: ${chrome.runtime.lastError.message}`);
      } else {
        console.log('Message sent successfully');
      }
    });
  });
});

async function generateBlocks(apiKey, prompt) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('API Response:', result);

    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0 && result.candidates[0].content.parts[0].text) {
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Error in generateBlocks:', error);
    throw error;
  }
}

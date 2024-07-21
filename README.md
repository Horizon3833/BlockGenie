# BlockGenie 🧩✨

BlockGenie is a powerful Chrome and Firefox extension designed to generate and inject blocks into MIT App Inventor and its distros (like Niotron and Kodular) using AI. Just provide a prompt, and let BlockGenie create the blocks for you!

## Features 🚀

- **AI-Powered Block Generation**: Uses the Gemini API to generate blocks from natural language prompts.
- **Easy Integration**: Inject the generated blocks directly into your MIT App Inventor workspace.
- **User-Friendly Interface**: Simple and intuitive UI for ease of use.
- **Custom API Key**: Enter your own Gemini API key to get started.

## Installation 🛠️

### For Chrome

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by clicking the toggle switch in the top right corner.
4. Click the "Load unpacked" button and select the downloaded folder.

### For Firefox

1. Clone or download this repository.
2. Open Firefox and navigate to `about:debugging`.
3. Click on "This Firefox" in the sidebar.
4. Click the "Load Temporary Add-on" button and select the `manifest.json` file from the downloaded folder.

## Usage 📖

1. Click on the BlockGenie extension icon in your browser.
2. Enter your Gemini API key.
3. Provide a prompt in natural language describing the blocks you want to create.
4. Click "Generate Blocks" and wait for the blocks to be generated.
5. Click "Inject Blocks" to add the generated blocks to your MIT App Inventor workspace.

## Development 💻

### Directory Structure

BlockGenie/
│
├── manifest.json
├── popup.html
├── popup.js
└── icons/
├── icon48.png
└── icon128.png


### Files

- `manifest.json`: Configuration file for the extension.
- `popup.html`: The HTML file for the extension's popup UI.
- `popup.js`: JavaScript file for handling the logic of the extension.
- `icons/`: Folder containing the extension icons.

## Contributing 🤝

Feel free to submit issues and pull requests. Contributions are welcome!

---

Enjoy using BlockGenie! 🧙‍♂️✨

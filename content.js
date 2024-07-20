console.log('Content script loaded');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "injectBlocks" && request.blockXml != null) {
    injectScriptToHeader(request.blockXml);
    sendResponse({status: "Script injected"});
  }
});

function injectScriptToHeader(blocksXml) {
  const scriptContent = `
    function injectBlocksIntoTab(blocksXml) {
      console.log('Injecting Blocks: ', blocksXml);
      const workspace = Blockly.getMainWorkspace();
      if (!workspace) {
        console.error('Blockly workspace not found or initialized.');
        alert('Blockly workspace not found or initialized.');
        return;
      }

      try {
        const xml = Blockly.Xml.textToDom(blocksXml);
        Blockly.Xml.domToWorkspace(xml, workspace);
        console.log('Blocks injected successfully.');
        alert('Blocks injected successfully :)');
      } catch (error) {
        console.error('Error injecting blocks: ', error);
        alert('Error injecting blocks. See console for details.');
      }
    }

    injectBlocksIntoTab(${JSON.stringify(blocksXml)});
  `;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerHTML = scriptContent;
  // (document.head || document.documentElement).appendChild(script);
}

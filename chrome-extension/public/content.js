// wait until page is fully loaded

function getHyperlink() {
    return window.location.href.toString()
}


// This will send the #someSelector value to popup
chrome.runtime.sendMessage({
    type: 'BETTERBNB_PLUGIN_EVALUATED_CONFIG', 
    configData: this.getHyperlink()
});
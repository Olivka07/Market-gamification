const baseScriptsPath = 'js';

const scriptsUrl = [
    `${baseScriptsPath}/data.js`,
    `${baseScriptsPath}/init.js`,
    `${baseScriptsPath}/add-to-basket.js`,
    `${baseScriptsPath}/animation.js`,
    `${baseScriptsPath}/helpers.js`,
    `${baseScriptsPath}/constants.js`
];

;((scriptsUrl) => {
    scriptsUrl.forEach(loadScript);
})(scriptsUrl);

function loadScript(url){
    const head = document.querySelector('head');

    const HTMLScriptElement = document.createElement('script');
    HTMLScriptElement.type = 'module';
    HTMLScriptElement.src = url;

    head.appendChild(HTMLScriptElement);
}
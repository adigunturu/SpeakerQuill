import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
var Trix = require("trix");

//console.log("Config", Trix.config.blockAttributes);
// var Trix = require("trix");

/* what the newly created button does */
Trix.config.blockAttributes.heading2 = {
  tagName: 'h2',
  terminal: true,
}
Trix.config.blockAttributes.heading3 = {
  tagName: 'h3',
  terminal: true,
}
Trix.config.textAttributes.underline = {
  tagName: 'u'
}
Trix.config.blockAttributes.center = {
  tagName: 'center',
}
const {lang} = Trix.config;

Trix.config.toolbar = {
  getDefaultHTML() { return `\
<div class="trix-button-row">
  <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
    <button type="button" id="boldbutton" class="trix-button trix-button--icon trix-button--icon-bold" data-trix-attribute="bold" data-trix-key="b" title="${lang.bold}" tabindex="-1">${lang.bold}</button>
    <button type="button" id="italicbutton" class="trix-button trix-button--icon trix-button--icon-italic" data-trix-attribute="italic" data-trix-key="i" title="${lang.italic}" tabindex="-1">${lang.italic}</button>
    <button type="button" id="strikebutton" class="trix-button trix-button--icon trix-button--icon-strike" data-trix-attribute="strike" title="${lang.strike}" tabindex="-1">${lang.strike}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-link" data-trix-attribute="href" data-trix-action="link" data-trix-key="k" title="${lang.link}" tabindex="-1">${lang.link}</button>
    <button type="button" id="underlinebutton" class="trix-button  " data-trix-attribute="underline" title="Underline" tabindex="-1">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="100%" fill="#656565" style="
    margin-top: 3px;
"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"></path></svg>
    </button>
    </span>
  <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
   <button type="button" class="trix-button trix-button--icon trix-button--icon-heading-1" data-trix-attribute="heading1" title="Heading" tabindex="-1">Heading</button>
    <button type="button" id="headingbutton" class="trix-button  " data-trix-attribute="heading2" title="h2" tabindex="-1">h2</button>
    <button type="button" class="trix-button  " data-trix-attribute="heading3" title="h3" tabindex="-1">h3</button>
    <button type="button" id="imagebutton" class="trix-button  " data-trix-attribute="image" title="image" tabindex="-1">img</button>
    <button type="button" class="trix-button  " data-trix-attribute="center" title="center" tabindex="-1">
    <svg xmlns="http://www.w3.org/2000/svg" height="1.6em" viewBox="0 0 24 24" width="2.6em" fill="#656565" style="margin-top: 2px;"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"></path></svg>
    </button>
    <button type="button" id="quotebutton" class="trix-button trix-button--icon trix-button--icon-quote" data-trix-attribute="quote" title="${lang.quote}" tabindex="-1">${lang.quote}</button>
    <button type="button" id="codebutton" class="trix-button trix-button--icon trix-button--icon-code" data-trix-attribute="code" title="${lang.code}" tabindex="-1">${lang.code}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-bullet-list" data-trix-attribute="bullet" title="${lang.bullets}" tabindex="-1">${lang.bullets}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-number-list" data-trix-attribute="number" title="${lang.numbers}" tabindex="-1">${lang.numbers}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-decrease-nesting-level" data-trix-action="decreaseNestingLevel" title="${lang.outdent}" tabindex="-1">${lang.outdent}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-increase-nesting-level" data-trix-action="increaseNestingLevel" title="${lang.indent}" tabindex="-1">${lang.indent}</button>
  </span>
  <span class="trix-button-group trix-button-group--file-tools" data-trix-button-group="file-tools">
    <button type="button" class="trix-button trix-button--icon trix-button--icon-attach" data-trix-action="attachFiles" title="${lang.attachFiles}" tabindex="-1">${lang.attachFiles}</button>
  </span>
  <span class="trix-button-group-spacer"></span>
  <span class="trix-button-group trix-button-group--history-tools" data-trix-button-group="history-tools">
    <button type="button" class="trix-button trix-button--icon trix-button--icon-undo" data-trix-action="undo" data-trix-key="z" title="${lang.undo}" tabindex="-1">${lang.undo}</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-redo" data-trix-action="redo" data-trix-key="shift+z" title="${lang.redo}" tabindex="-1">${lang.redo}</button>
  </span>
</div>
<div class="trix-dialogs" data-trix-dialogs>
  <div class="trix-dialog trix-dialog--link" data-trix-dialog="href" data-trix-dialog-attribute="href">
    <div class="trix-dialog__link-fields">
      <input type="url" name="href" class="trix-input trix-input--dialog" placeholder="${lang.urlPlaceholder}" aria-label="${lang.url}" required data-trix-input>
      <div class="trix-button-group">
        <input type="button" class="trix-button trix-button--dialog" value="${lang.link}" data-trix-method="setAttribute">
        <input type="button" class="trix-button trix-button--dialog" value="${lang.unlink}" data-trix-method="removeAttribute">
      </div>
    </div>
  </div>
</div>\
`; }
};
ReactDOM.render(
   <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

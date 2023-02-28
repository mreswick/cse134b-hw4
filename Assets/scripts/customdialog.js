// import { DOMPurify } from 'dompurify';
// import DOMPurify from './dist/purify.min.js';
// import DOMPurify from '../../node_modules/dompurify';
function sanitizeRes(_, promptPrefix, promptRes) {
  return DOMPurify.sanitize(`${promptPrefix} ${promptRes}`)
}
function init() {
  let btnAlert = document.getElementById('btnAlert');
  let btnConfirm = document.getElementById('btnConfirm');
  let btnPrompt = document.getElementById('btnPrompt');
  //let btnSaferPrompt = document.getElementById('btnSaferPrompt');
  let mainEl = document.querySelector('main');
  let tempDialEl = document.getElementById('dialogRep');
  // let tempDialClonedCont = tempDialEl.content.cloneNode(true);
  let tempDialCont = tempDialEl.content;
  let dialogEl = "";
  let dialogToReplEl = "";
  let outputEl = tempDialCont.children[3].cloneNode(true);
  //alert button
  btnAlert.addEventListener('click', (event) => {
    //hide output el for confirm and prompt if present
    let outputToHideEl = document.getElementById('res');
    if(outputToHideEl) {
      mainEl.removeChild(outputToHideEl);
    }

    setTimeout(() => {
      //show alert prompt
      dialogEl = tempDialCont.children[0].cloneNode(true);
      dialogToReplEl = document.querySelector("main dialog");
      if(dialogToReplEl) {
        mainEl.removeChild(dialogToReplEl);
      }
      mainEl.appendChild(dialogEl);
    }, 0);
  });
  //confirm button
  btnConfirm.addEventListener('click', (event) => {
    //hide output el for confirm and prompt if present
    let outputToHideEl = document.getElementById('res');
    if(outputToHideEl) {
      mainEl.removeChild(outputToHideEl);
    }
    setTimeout(() => {
      //show confirm prompt
      dialogEl = tempDialCont.children[1].cloneNode(true);
      dialogToReplEl = document.querySelector('main dialog');
      if(dialogToReplEl) {
        mainEl.removeChild(dialogToReplEl);
      }
      mainEl.appendChild(dialogEl);
      //bind logic to buttons of confirm prompt
      let cancBtn = document.getElementById('confCbtn');
      let okBtn = document.getElementById('confOKbtn');
      const confPrefix = 'Confirm Result:';
      let confRes = "";
      cancBtn.addEventListener('click', (event) => {
        //show output
        confRes = `${confPrefix} False`;
        outputEl.innerHTML = confRes;
        mainEl.appendChild(outputEl);
      });
      okBtn.addEventListener('click', (event) => {
        //show output
        confRes = `${confPrefix} True`
        outputEl.innerHTML = confRes;
        mainEl.appendChild(outputEl);
      });
    }, 0);
  });
  //prompt button
  btnPrompt.addEventListener('click', (event) => {
    //hide output el for confirm and prompt if present
    let outputToHideEl = document.getElementById('res');
    if(outputToHideEl) {
      mainEl.removeChild(outputToHideEl);
    }
    setTimeout(() => {
      //show prompt's prompt
      dialogEl = tempDialCont.children[2].cloneNode(true);
      dialogToReplEl = document.querySelector('main dialog');
      if(dialogToReplEl) {
        mainEl.removeChild(dialogToReplEl);
      }
      mainEl.appendChild(dialogEl);
      //bind logic to buttons of confirm prompt
      let cancBtn = document.getElementById('promptCbtn');
      let okBtn = document.getElementById('promptOKbtn');
      const promPrefix = 'Prompt Result:';
      let promRes = "";
      cancBtn.addEventListener('click', (event) => {
        promRes = `${promPrefix} User did not enter any input.`;
        //show output
        outputEl.innerHTML = DOMPurify.sanitize(promRes);
        mainEl.appendChild(outputEl);
      });
      okBtn.addEventListener('click', (event) => {
        let textAreaEl = document.querySelector('main textarea');
        promRes = textAreaEl.value ? textAreaEl.value : "User did not enter any input.";
        promRes = sanitizeRes`${promPrefix} ${promRes}`
        //show output
        //outputEl.innerHTML = DOMPurify.sanitize(promRes);
        outputEl.innerHTML = promRes
        mainEl.appendChild(outputEl);
      });
    }, 0);
  });
}

export { init };
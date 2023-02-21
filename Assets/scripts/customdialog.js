

function init() {
  let btnAlert = document.getElementById('btnAlert');
  let btnConfirm = document.getElementById('btnConfirm');
  let btnPrompt = document.getElementById('btnPrompt');
  //let btnSaferPrompt = document.getElementById('btnSaferPrompt');
  let mainEl = document.querySelector('main');
  let tempDialEl = document.getElementById('dialogRep');
  let tempDialClonedCont = tempDialEl.content.cloneNode(true);
  let dialogEl = "";
  let dialogToReplEl = "";
  //alert button
  btnAlert.addEventListener('click', (event) => {
    dialogEl = tempDialClonedCont.children[0];
    dialogToReplEl = document.querySelector("main dialog");
    if(dialogToReplEl) {
      mainEl.removeChild(dialogToReplEl);
    }
    mainEl.appendChild(dialogEl);
    console.log("dialog el: ");
    console.log(dialogEl);
  });
  // //confirm button
  // btnConfirm.addEventListener('click', (event) => {
  //   const confPrefix = 'Confirm Result:';
  //   let confRes = window.confirm('Do you confirm this?');
  //   confResEl.innerHTML = `${confPrefix} ${confRes}`;
  //   confResEl.removeAttribute('hidden');
  // });
  // //prompt button
  // btnPrompt.addEventListener('click', (event) => {
  //   const promptPrefix = 'Prompt result:';
  //   let promptRes = window.prompt('What is your name?');
  //   let promptResDefault = 'User did not enter anything; please click again.';
  //   promptRes = promptRes ? promptRes : promptResDefault; 
  //   confResEl.innerHTML = `${promptPrefix} ${promptRes}`; //note to self: template literal (by) itself still unsafe to injection
  //   confResEl.removeAttribute('hidden');
  // });
  // //safe prompt button
  // btnSaferPrompt.addEventListener('click', (event) => {
  //   const promptPrefix = 'Safe prompt result:';
  //   let promptRes = DOMPurify.sanitize(window.prompt('What is your name?'));
  //   let promptResDefault = 'User did not enter anything; please click again.';
  //   promptRes = promptRes ? promptRes : promptResDefault; 
  //   confResEl.innerHTML = DOMPurify.sanitize(`${promptPrefix} ${promptRes}`);
  //   confResEl.removeAttribute('hidden');
  // });
}

export { init };
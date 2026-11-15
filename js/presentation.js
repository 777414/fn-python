/* Универсальный движок слайдов: текст, код, вывод, карточки и раскрытия. */
window.Presentation = (() => {
 let slides=[],index=0,revealIndex=0,outputShown=false,onEnd=null;
 const stage=document.getElementById("slideStage"),counter=document.getElementById("slideCounter"),progress=document.getElementById("slideProgress");
 const prev=document.getElementById("prevSlide"),next=document.getElementById("nextSlide");
 function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node}
 function makeRevealRow(item,number){const row=el("div","reveal-item");row.append(el("span","reveal-number",String(number).padStart(2,"0")));row.append(el("p","",item));return row}
 function makeOutput(slide){const out=el("div","code-output");out.append(el("div","output-caption","РЕЗУЛЬТАТ"));out.append(el("pre","output-pre",slide.output));return out}
 function makeVariablePlayground(){
  const data={name:{value:"Иван",options:["Иван","Анна","Пётр","Мария"]},city:{value:"Москва",options:["Москва","Казань","Сочи","Минск"]},game:{value:"Minecraft",options:["Minecraft","Roblox","шахматы","Тетрис"]}};
  let active="name";
  const root=el("section","variable-lab"),tabs=el("div","variable-lab-tabs"),area=el("div","variable-lab-main");
  const box=el("div","variable-lab-box"),boxHead=el("div","variable-lab-box-head"),boxName=el("span","variable-lab-box-name","name"),boxTag=el("span","variable-lab-box-tag","ПЕРЕМЕННАЯ");
  const boxBody=el("div","variable-lab-box-body"),value=el("button","variable-lab-value"),empty=el("div","variable-lab-empty","Переменная пуста"),boxHint=el("div","variable-lab-hint","Перетащи значение наружу");
  const side=el("div","variable-lab-side"),drop=el("div","variable-lab-drop","Перетащи значение сюда");
  const code=el("div","variable-lab-code"),codeLabel=el("div","variable-lab-code-label","ТАК ВЫГЛЯДИТ В PYTHON"),codeLine=el("code","variable-lab-code-line");
  const choices=el("div","variable-lab-choices"),choicesLabel=el("div","variable-lab-choices-label","ИЛИ ВЫБЕРИ ДРУГОЕ ЗНАЧЕНИЕ");
  const actions=el("div","variable-lab-actions"),take=el("button","variable-lab-action","Достать значение"),put=el("button","variable-lab-action","Положить обратно"),reset=el("button","variable-lab-reset","Сбросить");
  value.type="button";value.draggable=true;take.type=put.type=reset.type="button";
  boxHead.append(boxName,boxTag);boxBody.append(value,empty);box.append(boxHead,boxBody,boxHint);side.append(drop);area.append(box,side);
  code.append(codeLabel,codeLine);actions.append(take,put,reset);root.append(tabs,area,choicesLabel,choices,code,actions);
  function render(){
   tabs.innerHTML="";choices.innerHTML="";
   Object.keys(data).forEach(key=>{const tab=el("button","variable-lab-tab"+(active===key?" is-active":""),key);tab.type="button";tab.addEventListener("click",()=>{active=key;render()});tabs.append(tab)});
   const item=data[active];boxName.textContent=active;value.textContent=item.value===null?"":('"'+item.value+'"');value.hidden=item.value===null;empty.hidden=item.value!==null;
   boxHint.textContent=item.value===null?"Выбери значение ниже или положи его обратно":"Перетащи значение наружу или нажми на него";
   drop.textContent=item.value===null?"Переменная пустая":"Отпусти здесь, чтобы вернуть значение";drop.classList.toggle("is-ready",item.value===null);
   codeLine.textContent=active+" = "+(item.value===null?"None":JSON.stringify(item.value));take.disabled=item.value===null;put.disabled=item.value!==null;
   item.options.forEach(option=>{const chip=el("button","variable-lab-chip",'"'+option+'"');chip.type="button";chip.addEventListener("click",()=>{item.value=option;render()});choices.append(chip)});
  }
  function takeValue(){data[active].value=null;render()}
  function putValue(){if(data[active].value===null)data[active].value=data[active].options[0];render()}
  value.addEventListener("click",takeValue);
  value.addEventListener("dragstart",event=>{event.dataTransfer.setData("text/plain",active);event.dataTransfer.effectAllowed="move"});
  drop.addEventListener("dragover",event=>{event.preventDefault();drop.classList.add("is-over")});
  drop.addEventListener("dragleave",()=>drop.classList.remove("is-over"));
  drop.addEventListener("drop",event=>{event.preventDefault();drop.classList.remove("is-over");putValue()});
  box.addEventListener("dragover",event=>{if(data[active].value===null){event.preventDefault();box.classList.add("is-over")}});
  box.addEventListener("dragleave",()=>box.classList.remove("is-over"));
  box.addEventListener("drop",event=>{event.preventDefault();box.classList.remove("is-over");putValue()});
  take.addEventListener("click",takeValue);put.addEventListener("click",putValue);
  reset.addEventListener("click",()=>{Object.keys(data).forEach(key=>data[key].value=data[key].options[0]);active="name";render()});
  render();return root;
 }
 function outputIsPending(slide){return !!(slide.outputAfterReveal&&slide.output!==undefined&&!outputShown)}
 function updateControls(){
  const slide=slides[index];if(!slide)return;
  prev.disabled=index===0&&revealIndex===0&&!outputShown;
  next.disabled=index===slides.length-1&&revealIndex>=(slide.reveals?.length||0)&&!outputIsPending(slide);
  next.setAttribute("aria-label",revealIndex<(slide.reveals?.length||0)?"Показать следующий ответ":outputIsPending(slide)?"Показать результат":"Следующий слайд");
 }
 function updateRevealHint(){
  const area=stage.querySelector(".reveal-area");if(!area)return;
  area.querySelector(".reveal-hint")?.remove();
  const slide=slides[index];
  if(revealIndex<(slide?.reveals?.length||0))area.append(el("div","reveal-hint","НАЖМИ →, ЧТОБЫ ОТКРЫТЬ ОТВЕТ"));
  else if(outputIsPending(slide))area.append(el("div","reveal-hint","НАЖМИ →, ЧТОБЫ ПОКАЗАТЬ РЕЗУЛЬТАТ"));
 }
 function render(){
  const slide=slides[index];if(!slide)return;stage.innerHTML="";
  const article=el("article","slide-content slide-enter");
  article.append(el("div","slide-kicker",slide.kicker||"PYTHON / ЗАНЯТИЕ"));
  article.append(el("h1","slide-title",slide.title||""));
  if(slide.lead)article.append(el("p","slide-lead",slide.lead));
  if(slide.variablePlayground)article.append(makeVariablePlayground());
  if(slide.code){const wrap=el("div","code-example");if(slide.codeCaption)wrap.append(el("div","code-caption",slide.codeCaption));wrap.append(el("pre","code-pre",slide.code));article.append(wrap)}
  if(slide.output!==undefined&&(!slide.outputAfterReveal||outputShown))article.append(makeOutput(slide))
  if(slide.items?.length){const cards=el("div","slide-columns");slide.items.forEach(item=>{const box=el("div","slide-panel");box.append(el("h3","",item.title));box.append(el("p","",item.text));cards.append(box)});article.append(cards)}
  if(slide.list?.length){const list=el("ul","slide-checklist");slide.list.forEach(item=>list.append(el("li","",item)));article.append(list)}
  if(slide.note)article.append(el("div","slide-note",slide.note));
  if(slide.placeholder)article.append(el("div","placeholder-label","МАТЕРИАЛ БУДЕТ ДОБАВЛЕН ПОЗЖЕ"));
  if(slide.reveals?.length){const revealBox=el("div","reveal-area");slide.reveals.slice(0,revealIndex).forEach((item,i)=>revealBox.append(makeRevealRow(item,i+1)));if(revealIndex<slide.reveals.length)revealBox.append(el("div","reveal-hint","НАЖМИ →, ЧТОБЫ ОТКРЫТЬ ОТВЕТ"));else if(outputIsPending(slide))revealBox.append(el("div","reveal-hint","НАЖМИ →, ЧТОБЫ ПОКАЗАТЬ РЕЗУЛЬТАТ"));article.append(revealBox)}
  stage.append(article);
  counter.textContent=`${String(index+1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;
  progress.style.width=`${(index+1)/slides.length*100}%`;
  updateControls();
 }
 function show(content,afterEnd){slides=content;index=0;revealIndex=0;outputShown=false;onEnd=afterEnd;render()}
 function first(){index=0;revealIndex=0;outputShown=false;render()}
 function last(){index=slides.length-1;revealIndex=slides[index]?.reveals?.length||0;outputShown=!!slides[index]?.outputAfterReveal;render()}
 function forward(){
  const reveals=slides[index]?.reveals||[];
  if(revealIndex<reveals.length){
   const area=stage.querySelector(".reveal-area");
   area?.querySelector(".reveal-hint")?.remove();
   revealIndex++;
   area?.append(makeRevealRow(reveals[revealIndex-1],revealIndex));
   updateRevealHint();updateControls();return;
  }
  if(outputIsPending(slides[index])){
   outputShown=true;
   const article=stage.querySelector(".slide-content");
   article?.append(makeOutput(slides[index]));
   updateRevealHint();updateControls();return;
  }
  if(index<slides.length-1){index++;revealIndex=0;outputShown=false;render()}else if(onEnd)onEnd();
 }
 function backward(){
  if(outputShown){
   stage.querySelector(".code-output")?.remove();outputShown=false;updateRevealHint();updateControls();return;
  }
  if(revealIndex>0){
   const rows=stage.querySelectorAll(".reveal-item");rows[rows.length-1]?.remove();
   revealIndex--;updateRevealHint();updateControls();return;
  }
  if(index>0){index--;revealIndex=slides[index]?.reveals?.length||0;outputShown=!!slides[index]?.outputAfterReveal;render()}
 }
 next.addEventListener("click",forward);prev.addEventListener("click",backward);
 document.getElementById("fullscreen").addEventListener("click",()=>{if(!document.fullscreenElement)document.getElementById("lessonView").requestFullscreen?.();else document.exitFullscreen?.()});
 return {show,forward,backward,first,last};
})();
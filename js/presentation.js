/* Универсальный движок слайдов: текст, код, вывод, карточки и раскрытия. */
window.Presentation = (() => {
 let slides=[],index=0,revealIndex=0,outputShown=false,onEnd=null;
 const stage=document.getElementById("slideStage"),counter=document.getElementById("slideCounter"),progress=document.getElementById("slideProgress");
 const prev=document.getElementById("prevSlide"),next=document.getElementById("nextSlide");
 function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node}
 function makeRevealRow(item,number){const row=el("div","reveal-item");row.append(el("span","reveal-number",String(number).padStart(2,"0")));row.append(el("p","",item));return row}
 function makeOutput(slide){const out=el("div","code-output");out.append(el("div","output-caption","РЕЗУЛЬТАТ"));out.append(el("pre","output-pre",slide.output));return out}
 function outputIsPending(slide){return !!(slide.outputAfterReveal&&slide.output!==undefined&&!outputShown)}
 function updateControls(){
  const slide=slides[index];if(!slide)return;
  prev.disabled=index===0&&revealIndex===0&&!outputShown;
  next.disabled=index===slides.length-1&&revealIndex>=(slide.reveals?.length||0)&&!outputIsPending(slide);
  next.setAttribute("aria-label",revealIndex<(slide.reveals?.length||0)?"Показать следующий ответ":"Следующий слайд");
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
  if(slide.code){const wrap=el("div","code-example");if(slide.codeCaption)wrap.append(el("div","code-caption",slide.codeCaption));wrap.append(el("pre","code-pre",slide.code));article.append(wrap)}
  if(slide.output!==undefined&&(!slide.outputAfterReveal||outputShown))article.append(makeOutput(slide))
  if(slide.items?.length){const cards=el("div","slide-columns");slide.items.forEach(item=>{const box=el("div","slide-panel");box.append(el("h3","",item.title));box.append(el("p","",item.text));cards.append(box)});article.append(cards)}
  if(slide.list?.length){const list=el("ul","slide-checklist");slide.list.forEach(item=>list.append(el("li","",item)));article.append(list)}
  if(slide.note)article.append(el("div","slide-note",slide.note));
  if(slide.placeholder)article.append(el("div","placeholder-label","МАТЕРИАЛ БУДЕТ ДОБАВЛЕН ПОЗЖЕ"));
  if(slide.reveals?.length){const revealBox=el("div","reveal-area");slide.reveals.slice(0,revealIndex).forEach((item,i)=>revealBox.append(makeRevealRow(item,i+1)));if(revealIndex<slide.reveals.length)revealBox.append(el("div","reveal-hint","НАЖМИ →, ЧТОБЫ ОТКРЫТЬ ОТВЕТ"));article.append(revealBox)}
  stage.append(article);
  counter.textContent=`${String(index+1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;
  progress.style.width=`${(index+1)/slides.length*100}%`;
  prev.disabled=index===0&&revealIndex===0;
  next.disabled=index===slides.length-1&&revealIndex>=(slide.reveals?.length||0);
  next.setAttribute("aria-label",revealIndex<(slide.reveals?.length||0)?"Показать следующий ответ":"Следующий слайд");
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
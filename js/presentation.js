/* Движок слайдов: контент конкретного занятия подключается отдельно. */
window.Presentation = (() => {
 let slides=[],index=0,onEnd=null;
 const stage=document.getElementById("slideStage"),counter=document.getElementById("slideCounter"),progress=document.getElementById("slideProgress");
 const prev=document.getElementById("prevSlide"),next=document.getElementById("nextSlide");
 function render(){
  const slide=slides[index];if(!slide)return;
  stage.innerHTML="";
  const article=document.createElement("article");article.className="slide-content";
  const kicker=document.createElement("div");kicker.className="slide-kicker";kicker.textContent=slide.kicker||"PYTHON LAB / ЗАНЯТИЕ";
  const title=document.createElement("h1");title.className="slide-title";title.textContent=slide.title||"";
  article.append(kicker,title);
  if(slide.lead){const p=document.createElement("p");p.className="slide-lead";p.textContent=slide.lead;article.append(p)}
  if(slide.placeholder){const tag=document.createElement("div");tag.className="placeholder-label";tag.textContent="МАТЕРИАЛ БУДЕТ ДОБАВЛЕН ПРИ РАЗРАБОТКЕ УРОКА";article.append(tag)}
  if(slide.note){const note=document.createElement("div");note.className="slide-note";note.textContent=slide.note;article.append(note)}
  if(slide.panels?.length){const columns=document.createElement("div");columns.className="slide-columns";slide.panels.forEach(panel=>{const box=document.createElement("div");box.className="slide-panel";const h=document.createElement("h3");h.textContent=panel.title;const p=document.createElement("p");p.textContent=panel.text;box.append(h,p);columns.append(box)});article.append(columns)}
  stage.append(article);counter.textContent=`${String(index+1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;
  progress.style.width=`${(index+1)/slides.length*100}%`;prev.disabled=index===0;next.disabled=index===slides.length-1;
 }
 function show(content,afterEnd){slides=content;index=0;onEnd=afterEnd;render()}
 function forward(){if(index<slides.length-1){index++;render()}else if(onEnd)onEnd()}
 function backward(){if(index>0){index--;render()}}
 next.addEventListener("click",forward);prev.addEventListener("click",backward);
 document.getElementById("fullscreen").addEventListener("click",()=>{if(!document.fullscreenElement)document.getElementById("lessonView").requestFullscreen?.();else document.exitFullscreen?.()});
 return {show,forward,backward};
})();
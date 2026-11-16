/* Сборка главной страницы и управление состояниями приложения. */
(() => {
 const grid=document.getElementById("moduleGrid"),lessonView=document.getElementById("lessonView");
 COURSE_MODULES.forEach((module,index)=>{
  const entry=document.createElement("div");entry.className="module-entry";entry.style.setProperty("--accent",module.accent);
  const card=document.createElement("div");card.className="module-card";
  const top=document.createElement("div");top.className="module-top";top.innerHTML=`<span class="module-number">МОДУЛЬ 0${index+1}</span><span class="module-icon">${module.icon}</span>`;
  const title=document.createElement("h3");title.textContent=module.title;
  const desc=document.createElement("p");desc.textContent=module.subtitle;
  const bottom=document.createElement("div");bottom.className="module-bottom";bottom.innerHTML=`<span>${module.lessons.length} ЗАНЯТИЯ · ${module.month.toUpperCase()}</span><span class="module-arrow">↗</span>`;
  const lessons=document.createElement("div");lessons.className="module-lesson-squares";lessons.setAttribute("aria-label","Занятия модуля");
  module.lessons.forEach((lessonTitle,lessonIndex)=>{
   const ready=!!window.LESSONS[module.id+"-"+(lessonIndex+1)];
   const lessonButton=document.createElement("button");lessonButton.type="button";
   lessonButton.className="module-lesson-square"+(ready?" is-ready":"");lessonButton.textContent=String(lessonIndex+1);
   lessonButton.setAttribute("aria-label","Занятие "+(lessonIndex+1)+": "+lessonTitle+(ready?" — перейти":" — скоро"));
   lessonButton.title=lessonTitle+(ready?" — Перейти":" — Скоро");
   lessonButton.disabled=!ready;
   if(ready)lessonButton.addEventListener("click",()=>openLesson(index,lessonIndex));
   lessons.append(lessonButton);
  });
  card.append(top,title,desc,bottom,lessons);entry.append(card);grid.append(entry);
 });
 function openLesson(mi,li){
  const module=COURSE_MODULES[mi],title=module.lessons[li],number=mi*4+li+1;
  document.getElementById("lessonCrumb").textContent=`${module.month.toUpperCase()} / ЗАНЯТИЕ ${String(number).padStart(2,"0")}`;
  lessonView.classList.add("active");lessonView.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
  const lesson=window.LESSONS?.[`${module.id}-${li+1}`];
  const slides=lesson||[{kicker:`${module.month.toUpperCase()} · ЗАНЯТИЕ ${String(number).padStart(2,"0")}`,title,lead:"Подробное содержание этого занятия мы разработаем отдельно.",placeholder:true,note:"Пока это заглушка. Уроки создаём и утверждаем последовательно."}];
  Presentation.show(slides);
 }
 function closeLesson(){lessonView.classList.remove("active");lessonView.setAttribute("aria-hidden","true");document.body.style.overflow="";if(document.fullscreenElement)document.exitFullscreen?.()}
 document.getElementById("backHome").addEventListener("click",closeLesson);
 document.getElementById("startCourse").addEventListener("click",()=>openLesson(0,0));
 CourseNavigation.renderDrawer(openLesson);
 document.addEventListener("keydown",e=>{
  if(!lessonView.classList.contains("active"))return;
  const tag=document.activeElement?.tagName;if(["INPUT","TEXTAREA","SELECT"].includes(tag)||document.activeElement?.isContentEditable)return;
  if(e.key==="ArrowRight"){e.preventDefault();Presentation.forward()}
  if(e.key==="ArrowLeft"){e.preventDefault();Presentation.backward()}
  if(e.key.toLowerCase()==="m")CourseNavigation.open();
  if(e.key==="Home"){e.preventDefault();Presentation.first()}
  if(e.key==="End"){e.preventDefault();Presentation.last()}
  if(e.key==="f"&&!e.ctrlKey&&!e.metaKey){e.preventDefault();document.getElementById("fullscreen").click()}
 });
})();
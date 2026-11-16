/* Навигация по каталогу курса и слайдам. */
window.CourseNavigation = (() => {
 const drawer=document.getElementById("courseDrawer"),backdrop=document.getElementById("drawerBackdrop");
 const toggle=document.getElementById("menuToggle"),close=document.getElementById("closeDrawer");
 function open(){drawer.classList.add("open");backdrop.classList.add("open");drawer.setAttribute("aria-hidden","false");toggle?.setAttribute("aria-expanded","true")}
 function shut(){drawer.classList.remove("open");backdrop.classList.remove("open");drawer.setAttribute("aria-hidden","true");toggle?.setAttribute("aria-expanded","false")}
 function renderDrawer(onSelect){
  const root=document.getElementById("drawerContent");root.innerHTML="";
  let lessonOffset=0;
  COURSE_MODULES.forEach((module,mi)=>{
   const section=document.createElement("section");section.className="drawer-module";
   const heading=document.createElement("div");heading.className="drawer-module-title";heading.innerHTML=`<span>${String(mi+1).padStart(2,"0")} / ${module.month} — ${module.title}</span><span>${String(module.lessons.length).padStart(2,"0")}</span>`;section.append(heading);
   module.lessons.forEach((title,li)=>{
    const b=document.createElement("button");b.className="drawer-lesson";b.innerHTML=`<span>${String(lessonOffset+li+1).padStart(2,"0")}</span><span></span><span class="lesson-state">СКОРО</span>`;b.children[1].textContent=title;
    const ready=!!window.LESSONS[module.id+"-"+(li+1)];b.children[2].textContent=ready?"ПЕРЕЙТИ":"СКОРО";if(ready)b.classList.add("is-ready");
    b.addEventListener("click",()=>{shut();onSelect(mi,li)});section.append(b);
   });lessonOffset+=module.lessons.length;root.append(section);
  });
 }
 toggle?.addEventListener("click",open);close?.addEventListener("click",shut);backdrop?.addEventListener("click",shut);
 document.getElementById("lessonMenu")?.addEventListener("click",open);
 document.addEventListener("keydown",e=>{if(e.key==="Escape")shut()});
 return {open,close:shut,renderDrawer};
})();
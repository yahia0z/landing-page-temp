// Global Variables:
const secList = [...document.querySelectorAll("section")];
const ul = document.getElementById("navbar__list");
const frag = document.createDocumentFragment();


// navbar and scrolling:
secList.forEach(sec => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    li.appendChild(a);
    a.textContent = sec.getAttribute("data-nav");
    a.setAttribute("href","#"+sec.getAttribute("id"));
    a.addEventListener('click',function(click){
        click.preventDefault();
        sec.firstElementChild.scrollIntoView({behavior:"smooth",});
    })
    frag.appendChild(li);    
});
ul.appendChild(frag);

// storing navbar items in an array:
const barItems = [...document.querySelectorAll("li")];

// toggle active class: (will not be toggled if the section is collapsed)
function toggleActive (){
    let index = 0;
    secList.forEach(sec => {
        const topSec = sec.getBoundingClientRect().top;
        if (topSec >= -250 && topSec <= 300 && !sec.classList.contains("noActive")){
            sec.classList.add("your-active-class");
            barItems[index].classList.add("active-tab");
        }
        else {
            sec.classList.remove("your-active-class");
            barItems[index].classList.remove("active-tab");
        }
        index +=1;
    });
}
window.addEventListener("scroll", toggleActive);

// scroll-to-top button:
const topButton = document.getElementById("topButton");
window.onscroll = function (){
    if (document.body.scrollTop > screen.height || document.documentElement.scrollTop > screen.height){
        topButton.style.display = "block";
    }
    else{
        topButton.style.display = "none";
    }
};
topButton.addEventListener("click", function(){
    window.scrollTo({top: 0, behavior: 'smooth'});
});

//collapsible sections:
function collapse(){
    const headings = [...document.querySelectorAll("h2")];
    headings.forEach (h => {
        h.addEventListener("click", function(){
            h.classList.toggle("collapsed");
            h.nextElementSibling.classList.toggle("collapsed-container");
            h.parentElement.parentElement.classList.toggle("noActive");
        })
    });

}
collapse();

//hamburger menu on small screens:
function toggleMenu(){
    const navbar = document.querySelector(".navbar__menu");
    const bars = document.querySelector(".hbBars");
    bars.addEventListener("click",function(){
        navbar.classList.toggle("menu");
    });
    window.addEventListener("scroll", function(){
        navbar.classList.remove("menu");
    });
}
toggleMenu();

//hiding the navbar when scrolling stops:
function navbarScroll(){
    const navbar = document.querySelector(".navbar__menu");
    window.addEventListener("scroll",()=>{
        navbar.classList.remove("scroll");
        setTimeout(()=>{
            navbar.classList.add("scroll"); 
        },2000);
    });
}
navbarScroll();

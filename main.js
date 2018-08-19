const blogList = document.getElementsByClassName('collection-blog-list')[0];

for(let i = 0, len = blogList.children.length; i < len; i++) {
    const e = blogList.children[i];
    e.addEventListener('mouseenter', () => {
        //使用children而不要使用chlidNodes
        const itemCount = e.children[1].children[1].children.length;
        e.children[1].style.height = itemCount * 20 + 10 + 'px';
    }, false);
    e.addEventListener('mouseleave', () => {
        e.children[1].style.height = '0px';
    }, false);
}
/*
let percentage = 0;
const skillPercentage = document.getElementById('test');
const loadPercentage = () => {
    clockTimeId = setTimeout(function start() {
        skillPercentage.setAttribute('data-percentage', +percentage);
        percentage++;
        clockTimeId = setTimeout(start, 1000);
    }, 1000);
}
loadPercentage();

*/
//获取DOM元素
const nav = document.querySelector('nav');
const header = document.querySelector('header');
const about = document.querySelector('about');
const experience = document.querySelector('experience');
const skillset = document.querySelector('skillset');
const education = document.querySelector('education');
const works = document.querySelector('works');
const notes = document.querySelector('notes');
const collections = document.querySelector('collections');
const notes = document.querySelector('contact');

const navHeight = nav.offsetHeight;
let scrollHeightNow =  document.body.scrollTop || document.documentElement.scrollTop; 
function handleOnScroll() {
    let scrollHeightNext =  document.body.scrollTop || document.documentElement.scrollTop; 
    console.log(scrollHeightNext)
    let showNav = true;
    if(scrollHeightNow > navHeight) {
        if(scrollHeightNext < scrollHeightNow) {
            showNav = true;
        } else {
            showNav = false;
        } 
    } else {
        showNav = true;   
    }
    if(!showNav) {
        nav.style.height = '5px';
    } else {
        nav.style.height = '70px';
    }  
    scrollHeightNow = scrollHeightNext
} 
window.addEventListener('scroll', handleOnScroll)

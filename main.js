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
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const about = document.querySelector('.about');
const experience = document.querySelector('.experience');
const skillset = document.querySelector('.skillset');
const education = document.querySelector('.education');
const works = document.querySelector('.works');
const notes = document.querySelector('.notes');
const collections = document.querySelector('.collections');
const contact = document.querySelector('.contact');


const navHeight = nav.offsetHeight;
let scrollHeightNow =  document.body.scrollTop || document.documentElement.scrollTop; 


//如果滚动超过导航条高度则导航条缩小
function handleOnNavSilde() {
    let scrollHeightNext =  document.body.scrollTop || document.documentElement.scrollTop; 
    //showNav布尔值是为了减少DOM操作
    let showNav = true;
    //如果滚动高度超过Nav高度
    if(scrollHeightNow > navHeight) {
        //如果向上滚动
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

//判断元素顶部是否进入可视区域
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top < (window.innerHight || document.documentElement.clientHeight);
    
}

//如果元素进入顶部进入可是区域则通过fade-in类形成fadeIn特效
function addCSSFadeIn(el) {
    if(isElementInViewport(el)) {
        el.classList.add('fade-in');
    }
}
//为introduction及所有block执行addCSSFadeIn函数
let hasReachBottom = false;
function handleOnElementFadeIn() {
    //滚到到底部之后便结束
    if(hasReachBottom) return;

    const blocks = document.getElementsByClassName('block');
    const introduction = document.querySelector('.introduction');
    //len - 1：contact部分不需要fadein特效
    for(let i = 0, len = blocks.length; i < len - 1; i++) {
        addCSSFadeIn(blocks[i]);

        //滚动到SKILLSET部分时将percentage的display出来，而它的伪类会执行动画
        if(i == 2) {
            const percentages =  document.getElementsByClassName('skill-percentage');
            for(let j = 0, len = percentages.length; j < len; j++) {
                percentages[j].style.display = 'block';
            }
        }
    }
    addCSSFadeIn(introduction);    

    //一旦滚动到过底部
    if(!hasReachBottom && isElementInViewport(contact)) {
        hasReachBottom = true;
    }  
}

window.addEventListener('scroll', handleOnNavSilde);
window.addEventListener('load', handleOnElementFadeIn);
window.addEventListener('scroll', handleOnElementFadeIn);

//在NOTES部分点击Details按钮，则呈现笔记
const detailBtns = document.getElementsByClassName('detail-btn');
const noteDetails = document.getElementsByClassName('note-details');
const closeBtns = document.getElementsByClassName('close-btn');
const cover = document.querySelector('.cover');
for(let i = 0, len = detailBtns.length; i < len; i++) {
    detailBtns[i].addEventListener('click', () => {
        cover.style.display = 'block';
        noteDetails[i].style.display = 'block';
        noteDetails[i].style.animation = 'detail-fade-in .5s linear both';
        //点击遮罩或关闭按钮则关闭
        cover.addEventListener('click', () => {
            noteDetails[i].style.display = 'none';
            cover.style.display = 'none';
        });
        closeBtns[i].addEventListener('click', () => {
            noteDetails[i].style.display = 'none';
            cover.style.display = 'none';
        });
    });
}

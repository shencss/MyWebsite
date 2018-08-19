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
let scrollHeightNow =  document.documentElement.scrollTop || document.body.scrollTop; 


//如果滚动超过导航条高度则导航条缩小
function handleOnNavSilde() {
    let scrollHeightNext =  document.documentElement.scrollTop || document.body.scrollTop; 
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
function isElementTopInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top < (window.innerHight || document.documentElement.clientHeight); 
}
//判断元素底部是否进入可视区域
function isElementBottomInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.bottom < (window.innerHight || document.documentElement.clientHeight); 
}

//如果元素进入顶部进入可是区域则通过fade-in类形成fadeIn特效
function addCSSFadeIn(el) {
    if(isElementTopInViewport(el)) {
        el.classList.add('fade-in');
    }
}
//为introduction及所有block执行addCSSFadeIn函数
let hasReachBottom = false;
//页面高度
const pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
//浏览器高度
const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
const blocks = document.getElementsByClassName('block');
const introduction = document.querySelector('.introduction');
const skillList = document.querySelector('.skill-list');
const percentages =  document.getElementsByClassName('skill-percentage');
const mailBoxBg = document.querySelector('.mail-box-bg');
const mailBox = document.querySelector('.mail-box');
const emailAddress = document.querySelector('.email-address');
const githubAddress = document.querySelector('.github-address');
function handleOnElementFadeIn() {
    //滚到到底部之后便结束
    if(hasReachBottom) return;
    //单独为introduction添加fadein特效
    addCSSFadeIn(introduction); 
    //len - 1是因为contact部分不需要fadein特效
    for(let i = 0, len = blocks.length; i < len - 1; i++) {
        addCSSFadeIn(blocks[i]);
    }
    //滚动到CONTACT的mail-box-bg底部时将mail-box呈现出来，而它及它的伪类会执行动画
    //同时为两个address添加动画
    if(isElementBottomInViewport(mailBoxBg)) {
        mailBox.style.display = 'block';
        emailAddress.style.animation = 'address-in .5s 1s ease-in-out both';
        githubAddress.style.animation = 'address-in .5s 1s ease-in-out both';
    } 
    //滚动到SKILLSET的skill-list底部时将percentage呈现出来，而它的伪类会执行动画
    if(isElementBottomInViewport(skillList)) {
        for(let j = 0, len = percentages.length; j < len; j++) {
            percentages[j].style.display = 'block';
        }
    }  
    //scrollHeightNow + clientHeight = pageHeight时即滚动到底部，不再执行重复无效的代码
    if(!hasReachBottom && (scrollHeightNow + clientHeight == pageHeight)) {
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
        //animation使得note-detail渐变进入
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

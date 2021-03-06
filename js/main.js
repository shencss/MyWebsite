//DOM元素
//导航条
const nav = document.querySelector('.nav');
//导航列表
const navList = document.querySelector('.nav-list');
//各个板块
const blocks = document.getElementsByClassName('block');
//遮罩
const cover = document.querySelector('.cover');
//header中的introduction元素
const introduction = document.querySelector('.introduction');

//SKILLSET中的技能列表
const skillList = document.querySelector('.skill-list');
//SKILLSET中的技能条
const percentages =  document.getElementsByClassName('skill-percentage');

//WORKS中的向下箭头
const moreBtn = document.querySelector('.work-rest');
//WORKS中的作品列表
const workList = document.querySelector('.work-list');
//WORKS中的所有图片
const worksImgs = document.getElementsByClassName('work-img');

//NOTES中的details按钮
const detailBtns = document.getElementsByClassName('detail-btn');
//NOTES中的details页面
const noteDetails = document.getElementsByClassName('note-details');
//NOTES中的details页面的关闭按钮
const closeBtns = document.getElementsByClassName('close-btn');
//NOTES中的所有图片
const notesImgs = document.getElementsByClassName('note-img');

//COLLECTIONS中的所有图片
const colletcionsImgs = document.getElementsByClassName('collection-img');

//BLOGS中的收藏列表
const blogList = document.querySelector('.collection-blog-list');
//BLOGS中收藏列表每一项的blog-item-introduction
const blogIntroductions = document.getElementsByClassName('blog-item-introduction');

//CONTACT中的邮箱
const mailBox = document.querySelector('.mail-box');
//CONTACT中的email及github地址
const emailAddress = document.querySelector('.email-address');
const githubAddress = document.querySelector('.github-address');

//变量
//页面高度
let pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
//浏览器高度
const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
//导航条高度
let navHeight = nav.offsetHeight;

//上一次滚动到的高度
let scrollHeightPre = 0;
//当前滚动到的高度
let scrollHeightNow =  document.documentElement.scrollTop || document.body.scrollTop; 

//标记当前导航到哪个Nav
let selecetedNav = 0;

//标记是否滚动到过底部
let hasReachBottom = false;

//标记板块是否已经进入过窗口
const hasBlockInViewport = [false, false, false, false, false, false, false, false];

//标记显示中的work数目
let worksOnShow = 6;

//标志当前是否显示导航条
let showNav = true;


//在滚动的时候控制滚动条的响应：1.伸缩 2.定位
function handleOnNavReact() {

    showNav = true;

    //保存上次滚动到的高度
    scrollHeightPre = scrollHeightNow;
    //取得当前滚动的高度
    scrollHeightNow =  document.documentElement.scrollTop || document.body.scrollTop; 

    //只有当滚动高度超过Nav高度且在向下滚动时才缩小导航条
    if(scrollHeightNow > navHeight) {
        //当前高度大于上次的高度
        if(scrollHeightNow > scrollHeightPre) {
            showNav = false;
        } 
    }
    
    nav.style.height = showNav ? navHeight + 'px' : '5px';

    

    for(let i = 0, len = navList.children.length; i < len; i++) {
        if(i < len - 1) {
            //当前板块的顶部到达可视区域中间且下一个板块的顶部还没到达可视区域中间，则导航位置为当前板块
            if(blocks[i].getBoundingClientRect().top <= clientHeight / 2 && blocks[i + 1].getBoundingClientRect().top > clientHeight / 2) {
                selecetedNav = i;
            }
        }

        //到达底部则导航位置为CONTACT板块
        pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight;//由于fadein动画，页面高度在动画执行过程中会变化，这里重新取一次值
        if(scrollHeightNow + clientHeight == pageHeight) {
            selecetedNav = len - 1;
        }

        //为当前导航的nav添加nav-selected类，使之出现下划线
        if(i == selecetedNav) {
            navList.children[i].classList.add('nav-selected');
        } else {
            navList.children[i].classList.remove('nav-selected');
        }
    }
} 

//鼠标进入导航条则删除nav-selected类，鼠标离开后再恢复
navList.addEventListener('mouseover', () => {
    navList.children[selecetedNav].classList.remove('nav-selected');
});
navList.addEventListener('mouseleave', () => {
    navList.children[selecetedNav].classList.add('nav-selected');   
});

//导航菜单点击定位
for(let i = 0, len = navList.children.length; i < len; i++) {
    navList.children[i].addEventListener('click', () => {
        let topToScroll = 0;
        //如果block比可视区域小就居中显示，否则就顶部显示（这里的5是指导航条缩小后的高度）
        if(blocks[i].offsetHeight < clientHeight) {
            topToScroll = blocks[i].offsetTop - (clientHeight - blocks[i].offsetHeight) / 2 - 5;
        } else {
            topToScroll = blocks[i].offsetTop - 5;
        }

        //点击后设置相应的导航位置
        selecetedNav = i;

        //滚动到该位置
        window.scrollTo(0, topToScroll);
    });
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




//图片懒加载
function lazyLoad(imgs) {
    for(let i = 0, len = imgs.length; i < len; i++) {
        //从data-src自定义属性中取出URL然后加载图片
        if(imgs[i].getAttribute('data-src')) {
            imgs[i].src = imgs[i].getAttribute('data-src');
        }
    }
}


function handleOnBlockFadeIn() {
    //滚到到底部之后便结束
    if(hasReachBottom) return;

    //单独为introduction添加fadein特效
    if(isElementTopInViewport(introduction)) {
        introduction.classList.add('fade-in');
    }

    //为除了CONTACT以外的板块添加fadein特效
    for(let i = 0, len = blocks.length; i < len - 1; i++) {
        //当前板块还未fadein过且板块顶部进入可视区域
        if(!hasBlockInViewport[i] && isElementTopInViewport(blocks[i])) {
            //为当前板块添加fadein类
            blocks[i].classList.add('fade-in');

            //当滚动到WORKS部分，懒加载最初的6个work的图片，其他图片点击按钮才会加载
            if(i == 4) {
                lazyLoad(Array.prototype.slice.call(worksImgs, 0, 6));
            }
            
            //但滚动到NOTES部分， 懒加载四张note的图片
            if(i == 5) {      
                lazyLoad(notesImgs);
            }
            
            //当滚动到COLLECTIONS部分，懒加载8本图书的封面图片
            if(i == 6) {
                lazyLoad(colletcionsImgs);
            }

            //标记当前板块已经fadein
            hasBlockInViewport[i] = true;
        }
    }

    //滚动到SKILLSET的skill-list底部时将percentage呈现出来，而它的伪类会执行动画
    if(isElementBottomInViewport(skillList)) {
        for(let j = 0, len = percentages.length; j < len; j++) {
            percentages[j].style.display = 'block';
        }
    }  
    
    //scrollHeightNow + clientHeight = pageHeight时即滚动到底部，不再执行重复无效的代码
    pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight;//重新取一次值
    if(!hasReachBottom && (scrollHeightNow + clientHeight == pageHeight)) {
        hasReachBottom = true;

        //滚动到底部时将mail-box呈现出来，而它及它的伪类会执行动画
        mailBox.style.display = 'block';
        emailAddress.style.animation = 'address-in .5s 1s ease-in-out both';
        githubAddress.style.animation = 'address-in .5s 1s ease-in-out both';
    }  
}

//在WORKS部分点击向下箭头呈现更多work
moreBtn.addEventListener('click', () => {
    //在没显示完之前每次多显示三个
    if(worksOnShow + 3 <= workList.children.length) {
        //每次点击懒加载3张图片
        lazyLoad(Array.prototype.slice.call(worksImgs, worksOnShow, worksOnShow + 3));
        //逐一将work呈现出来
        for(let i = 0; i < 3; i++) { 
            workList.children[worksOnShow].style.display = 'block';
            worksOnShow++;
        }

        //全部显示之后不再显示按钮
        if(worksOnShow == workList.children.length) {
            moreBtn.style.display = 'none';
        }
    } 
});


//在NOTES部分点击Details按钮，则呈现笔记
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



//动态获取blogList部分各自item-introduction长度，实现slide-down特效
for(let i = 0, len = blogList.children.length; i < len; i++) {
    let itemCount = 0;
    //使用children而不要使用chlidNodes
    blogList.children[i].addEventListener('mouseenter', () => {
        //获取item-introduction中列表的项数
        itemCount = blogIntroductions[i].children[1].children.length;
        blogIntroductions[i].style.height = itemCount * 20 + 10 + 'px';
    }, false);
    blogList.children[i].addEventListener('mouseleave', () => {
        blogIntroductions[i].style.height = '0px';
    }, false);
}

//改变窗口宽度时，相应调整导航条高度
function handleOnResize() {
    const clientWidth = document.documentElement.clientWidth  || document.body.clientWidth;

    if(clientWidth > 1400) {
        navHeight = 70;
    }else if (clientWidth < 1400 && clientWidth >1000) {
        navHeight = 60;
    } else if(clientWidth < 1000) {
        navHeight = 50;
    }
    //如果当前正显示着导航条，则立即改变高度
    if(showNav) {
        nav.style.height = navHeight + 'px';
    }
}

//监听resize事件
window.addEventListener('resize', handleOnResize);

//监听load和scroll事件
window.addEventListener('load', handleOnNavReact);
window.addEventListener('scroll', handleOnNavReact);
window.addEventListener('load', handleOnBlockFadeIn);
window.addEventListener('scroll', handleOnBlockFadeIn);

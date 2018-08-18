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
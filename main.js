const blogList = document.getElementsByClassName('collection-blog-list')[0];
console.log(blogList.children)

for(let i = 0, len = blogList.children.length; i < len; i++) {
    const e = blogList.children[i];
    console.log(e)
    e.addEventListener('mouseenter', () => {
        //使用children而不要使用chlidNodes
        const itemCount = e.children[1].children[1].children.length;
        e.children[1].style.height = itemCount * 20 + 10 + 'px';
    }, false);
    e.addEventListener('mouseleave', () => {
        //使用children而不要使用chlidNodes
        e.children[1].style.height = '0px';
    }, false);
}
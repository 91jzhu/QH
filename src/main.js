const $siteList = $(".siteList")
const $lastli = $(".last")
const x = localStorage.getItem("x")
const xObject = JSON.parse(x)
const hashMap = xObject || [{
    logo: "C", url: "https://codesandbox.io"
}, {
    logo: "C", url: "https://css-tricks.com"
}, {
    logo: "V", url: "https://validator.w3.org"
}]

function removeX(url) {
    return url.replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .replace(/\/.*/, "")
}

const render = () => {
    $siteList.find("li:not(.last)").remove()
    hashMap.forEach((node, index) => {
        const $li = $(` 
        <li>
            <div class="site">
                <div class="logo">${node.logo.toUpperCase()}</div>
                <div class="link">${removeX(node.url)}</div>
                <div class="close">                        
                    <svg class="icon-close">
                        <use xlink:href="#icon-close1"></use>
                    </svg>
                </div>
            </div>
        </li>`
        ).insertBefore($lastli)
        $li.on("click", () => {
            window.open(node.url)
        })
        $li.on("click", ".close", (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })

}

render()

$(".new").on("click", () => {
    let url = window.prompt("请输入你想要添加的网址")
    if (url.indexOf("http") !== 0) {
        url = "https://" + url
    }
    console.log(url)
    hashMap.push({
        logo: removeX(url)[0],
        url: url
    });
    render()
})

window.onbeforeunload = () => {
    console.log("页面关闭")
    const string = JSON.stringify(hashMap)
    localStorage.setItem("x", string)
}
$(document).on("keypress", (e) => {
    console.log(e.key)
    const key = e.key
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key && e.target === this) {
            window.open(hashMap[i].url)
        }
    }
})

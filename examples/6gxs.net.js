/// <reference lib="es2021" />
const reader = new Shosetsu({
    selector: {
        title: "#container > div > div > div.reader-main > h1",
        readContentSet: "body",
        readDetail: "#container > div > div > div.reader-main",
        read_chapterDetail: "#content",
        removeList: [
            "body > ul.m-nav",
            "#container > div > div > div.reader-main > div:nth-child(1)",
            "body > div.header",
            "#container > div > div > div.reader-main > p",
            "body > div.hotcmd-wp",
            "#footer",
            "body > div.topbar",
            "body > ul",
            "#container > div > div > div.layout-tit.xs-hidden"
        ],
        pageNav: "div.section-opt.m-bottom-opt"

    },
    function: {
        getNextPage: function () {
            return nextpage;
        },
        getChapterDetail: function (nextPageDoc) {
            const contentElement = nextPageDoc.querySelector("#content");
            contentElement.innerHTML = $.base64.decode(contentElement.innerHTML.trim());
            [
                ["dh", "，"],
                ["wenhao", "？"],
                ["hao1", "”"],
                ["hao2", "！"],
                ["hao3", "。"]
            ].forEach(([imgSrc, replacement]) => {
                const regexPattern = new RegExp(`<img src=["']http://www.6gxs.net/img/${imgSrc}.png["'] height=["']26["'] ?/?>`, 'g');
                contentElement.innerHTML = contentElement.innerHTML.replaceAll(regexPattern, replacement);
            });

            contentElement.innerHTML = contentElement.innerHTML
                .split(/<br ?\/?>/)
                .map((segment) => {
                    return `<p>${segment
                        .trim()
                        .split('            ')
                        .filter(
                            (subsegment) =>
                                subsegment.trim().length > 0 &&
                                !['6gxs.net', '6G小说网'].some(s => subsegment.includes(s))
                        )
                        .join(' ')}</p>`;
                })
                .filter((segment) => segment.trim().length > 7)
                .join('\n');

            contentElement.style.display = "block";

            window.nextpage = Array.from(
                nextPageDoc.querySelectorAll("script:not([src])")
            )
                .map(e => e.textContent).join()
                .match(/var nextpage = '(.*)'/)[1];

            return contentElement;
        }
    },
    encoding: 'utf-8'
});
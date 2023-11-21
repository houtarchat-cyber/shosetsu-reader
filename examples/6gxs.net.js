const reader = new Shosetsu({
    selector: {
        title: "#container > div > div > div.reader-main > h1",
        readContentSet: "#container",
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
        pageNav: "#container > div > div > div.reader-main > div.section-opt.m-bottom-opt"
    },
    function: {
        getNextPage: function () {
            return nextpage;
        },
        getChapterDetail: function (nextPageDoc) {
            const content = nextPageDoc.querySelector("#content");
            content.innerHTML = $.base64.decode(content.innerHTML.trim())
                .replaceAll(/<img src=["']http:\/\/www\.6gxs\.net\/img\/dh\.png["'] height=["']26["'] ?\/?>/g, "，")
                .replaceAll(/<img src=["']http:\/\/www\.6gxs\.net\/img\/wenhao\.png["'] height=["']26["'] ?\/?>/g, "？")
                .replaceAll(/<img src=["']http:\/\/www\.6gxs\.net\/img\/hao1\.png["'] height=["']26["'] ?\/?>/g, "”")
                .replaceAll(/<img src=["']http:\/\/www\.6gxs\.net\/img\/hao2\.png["'] height=["']26["'] ?\/?>/g, "！")
                .replaceAll(/<img src=["']http:\/\/www\.6gxs\.net\/img\/hao3\.png["'] height=["']26["'] ?\/?>/g, "。");
            content.style.display = "block";
            window.nextpage = nextPageDoc.querySelector("script:not([src])").textContent.match(/var nextpage = '(.*)'/)[1];
            return content;
        }
    },
    encoding: 'utf-8'
});
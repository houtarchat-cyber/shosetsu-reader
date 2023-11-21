const reader = new Shosetsu({
    selector: {
        title: "#readContent_set > div.readDetail > div.read_chapterName.tc > h1",
        readContentSet: "#readContent_set",
        readDetail: "#readContent_set > div.readDetail",
        read_chapterDetail: "#readContent_set > div > div.read_chapterDetail",
        removeList: [
            "body > div.head",
            "body > div.newNav",
            "#readContent_set > div.readTop",
            "#readContent_set > div.readDetail > div.next_pre",
            "#readContent_set > div.readDetail > div.hotlist",
            "body > div.copyright",
        ],
        pageNav: "#readContent_set > div > div.pageNav"
    },
    encoding: "gbk"
});
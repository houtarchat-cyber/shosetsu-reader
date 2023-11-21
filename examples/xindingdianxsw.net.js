const reader = new Shosetsu({
    selector: {
        title: "#chapter > h1",
        readContentSet: "html",
        readDetail: "#chapter",
        read_chapterDetail: "#chapter > div.content",
        removeList: [
            "#chapter > div.path",
            "#chapter > div.tui",
            "#chapter > div.pager",
            "#chapter > div.content:nth-of-type(2) > p:nth-child(1)",
            "#chapter > div.content:nth-of-type(2) > p:nth-last-child(1)",
            "#chapter > div.content:last-of-type > p:nth-child(1)",
            "#chapter > div.content:last-of-type > p:nth-last-child(1)",
            "p[style=\"color:red;text-align:center\"]",
            "#chapter > form",
            "#chapter > div.footer",
            "#chapter > ul.layui-fixbar",
            "#chapter > ul.tabbar",
            "#chapter > div.setting"
        ],
        pageNav: "this_is_not_a_selector"
    },
    encoding: 'utf-8'
});
const reader = new Shosetsu({
    selector: {
        title: "#chapter > h1",
        readContentSet: "#chapter",
        readDetail: "#chapter",
        read_chapterDetail: "#chapter > div.content",
        removeList: [
            "#chapter > div.path",
            "#chapter > div.tui",
            "#chapter > div.pager.z1",
            "#chapter > div.content > p > a",
            "p[style=\"color:red;text-align:center\"]",
            "#chapter > form",
            "#chapter > div.footer",
            "#chapter > ul.layui-fixbar",
            "#chapter > ul.tabbar",
            "#chapter > div.setting"
        ],
        pageNav: "#chapter > div.pager:not(.z1)"
    },
    function: {
        getNextPage: function () {
            return document.querySelector("#chapter > div.pager > a:nth-child(3)")?.href;
        }
    },
    encoding: 'utf-8'
});
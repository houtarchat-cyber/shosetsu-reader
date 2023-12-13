Shosetsu.removeElement("#center_tip");
document.querySelector(".nr_page").remove();

document.getElementById("nr1").innerHTML = document.getElementById("nr1")
    .innerText.split("\n\n").map((line, i) => {
        return `<p${i == 0 ? ' id="shosetsu_reader_title"' : ''}>${line.trim()}</p>`;
    }).join("");

const reader = new Shosetsu({
    selector: {
        title: "#shosetsu_reader_title",
        readContentSet: "#nr_body",
        readDetail: "#nr",
        read_chapterDetail: "#nr1",
        removeList: [
            "#_bqgmb_head",
            "div.nr_set",
            // ".nr_page:has( ~ .nr_page)", // :has() only works in Chrome 105+
            "div.footer",
            "#center_tip"
        ],
        pageNav: ".nr_page"
    },
    function: {
        getNextPage: function () {
            return document.querySelector("#pb_next")?.href;
        },
        getChapterDetail: function (nextPageDoc) {
            nextPageDoc.querySelector('.nr_page').remove();

            const contentElement = nextPageDoc.querySelector("#nr1");

            const newContentElement = document.createElement("div");
            newContentElement.id = "nr1";

            contentElement.querySelectorAll("#center_tip").forEach((element) => {
                element.remove();
            });

            contentElement.textContent.split("\n\n").forEach((line, index, { length }) => {
                const newLine = document.createElement("p");
                newLine.innerText = line.trim();

                if (index == 0) {
                    const titleEndIndex = line.indexOf(')') + 1;
                    const title = line.substring(0, titleEndIndex).trim();
                    const chapter = line.substring(titleEndIndex).trim();

                    const titleElement = document.createElement("p");
                    titleElement.id = "shosetsu_reader_title";
                    titleElement.innerText = title;
                    newContentElement.appendChild(titleElement);

                    const chapterElement = document.createElement("p");
                    chapterElement.innerText = chapter;
                    newContentElement.appendChild(chapterElement);

                    return;
                }

                if (index == length - 1) {
                    newLine.innerText = newLine.innerText.replace("    （本章未完，请点击下一页继续阅读）", "");
                }

                newContentElement.appendChild(newLine);
            });

            return newContentElement;
        }
    },
    encoding: 'utf-8'
});
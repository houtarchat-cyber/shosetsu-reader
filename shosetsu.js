/**
 * Shosetsu reader.
 * @class
 * @author Houtar
 */
class Shosetsu {
    #config;
    #currentPage;
    #isLoadingPage;

    #scrollObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.getNextPage();
                }
            });
        },
        { 'threshold': 0.5 }
    )

    /**
     * @typedef {object} Config The configuration object.
     * @property {Selector} selector The selector object containing various CSS selectors.
     * @property {Functions} function The function object containing various functions.
     */

    /**
     * @typedef {object} Selector The selector object containing various CSS selectors.
     * @property {string} title The CSS selector for the div that contains the title only.
     * @property {string} readContentSet The CSS selector for the reader background.
     * @property {string} readDetail The CSS selector for the container that holds the text and title.
     * @property {string} read_chapterDetail The CSS selector for the container that holds the text.
     * @property {string[]} removeList An array of CSS selectors for elements to be removed.
     * @property {string} pageNav The CSS selector for the page navigation container.
     * @property {string} encoding A specific character encoding, like utf-8, iso-8859-2, koi8, cp1261, gbk, etc.
     */

    /**
     * @typedef {object} Functions The function object containing various functions.
     * @property {getNextPage} function.getNextPage A function that returns the URL of the next page.
     * @property {getChapterDetail} function.getChapterDetail A function that returns the chapter detail element.
     */

    /**
     * @callback getNextPage A function that returns the URL of the next page.
     * @param {string} currentPage The URL of the current page.
     * @returns {string} The URL of the next page.
     */

    /**
     * @callback getChapterDetail A function that returns the chapter detail element.
     * @param {Document} nextPageDoc The document object of the next page.
     * @returns {HTMLElement} The chapter detail element.
     * @returns {null} If the chapter detail element is not found.
     */

    /**
     * Constructs a new instance of the Shosetsu class.
     * @param {Config} config The configuration object.
     */
    constructor(config) {
        this.#config = config;

        document.body.addEventListener("click", () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
        });

        document.querySelectorAll("style, link[rel=\"stylesheet\"]").forEach((e) => e.remove());

        Shosetsu.progress();

        this.init(true);

        const pageNav = document.querySelector(this.#config.selector.pageNav);
        if (pageNav) {
            this.#scrollObserver.observe(document.querySelector(this.#config.selector.pageNav));
        }
        else {
            window.addEventListener("scroll", () => {
                if (
                    (window.innerHeight + window.scrollY) / document.body.offsetHeight >=
                    0.9
                ) {
                    this.getNextPage();
                }
            });
        }

        this.#currentPage = window.location.href;
        this.#isLoadingPage = false;
    }

    /**
     * Gets the configuration object.
     * @returns {object} The configuration object.
     */
    get config() {
        return this.#config;
    }

    /**
     * Sets the configuration object.
     * @param {object} config - The new configuration object.
     */
    set config(config) {
        this.#config = config;
    }

    /**
     * Removes all elements matching the given selector from the DOM.
     *
     * @param {string} selector - The CSS selector used to select the elements to be removed.
     * @returns {void}
     */
    static removeElement(selector) {
        const element = Array.from(document.querySelectorAll(selector));
        if (element.length > 0) {
            element.forEach((e) => e.remove());
        }
    };

    /**
     * Sets the document title based on the provided selector.
     * @returns {void}
     */
    setTitle() {
        const chapterName = document.querySelectorAll(this.#config.selector.title);
        if (chapterName) {
            document.title = chapterName[chapterName.length - 1].innerText;
        }
    };

    /**
     * Optimizes the styles of elements based on the provided selector.
     * @returns {void}
     */
    optimizeStyles() {
        const chapterDetails = Array.from(
            document.querySelectorAll(this.#config.selector.read_chapterDetail)
        );
        if (chapterDetails.length > 0) {
            chapterDetails.forEach((chapterDetail) => {
                chapterDetail.style.fontSize = "26px";
                chapterDetail.style.textIndent = "2em";
                chapterDetail.style.padding = "15px 0px";
                chapterDetail.style.webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
                chapterDetail.style.lineHeight = "46.8px";
                chapterDetail.style.textAlign = "justify";
            });
        }
        const readContentSet = document.querySelectorAll(this.#config.selector.readContentSet);
        if (readContentSet.length > 0) {
            readContentSet.forEach((element) => {
                element.style.backgroundColor = "rgb(251, 246, 236)";
                element.style.margin = "10px";
                element.style.padding = "10px 2px";
                element.style.lineHeight = "1.8";
                element.style.textAlign = "justify";
                element.style.fontSize = "1.125rem";
                element.style.wordBreak = "break-all";
            });
        }
    };

    /**
     * Initializes the reader with the specified configurations.
     *
     * @param {boolean} isFirstLoaded - Indicates whether it is the first time the reader is loaded.
     * @returns {void}
     */
    init() {
        // 移除多余元素
        this.#config.selector.removeList.forEach(Shosetsu.removeElement);

        // 设置标题
        this.setTitle();

        // 优化样式
        this.optimizeStyles();

        // 格式化章节内容
        const chapterDetails = document.querySelectorAll(
            this.#config.selector.read_chapterDetail
        );
        if (chapterDetails.length > 0) {
            chapterDetails.forEach((chapterDetail) => {
                Array.from(chapterDetail.children).forEach((element) => {
                    element.textContent = element.textContent.trim();
                });
                const chapters = Array.from(chapterDetail.children).filter((e) =>
                    /第[\d一二三四五六七八九十百千万]*?[章节]/.test(e.textContent)
                );
                chapters.forEach(Shosetsu.styleTitle);
            });
        }

        document.querySelectorAll(this.#config.selector.title).forEach(Shosetsu.styleTitle);
    };

    /**
     * Displays a progress bar indicating the reading progress.
     * @returns {void}
     */
    static progress() {
        const css = `
            progress {
                position: fixed;
                left: 0;
                top: 0;
                z-index: 1000;
                width: 100%;
                height: 4px;
                appearance: none;
                border: none;
                background-color: transparent;
                color: #007bb1;
            }
            
            progress::-webkit-progress-bar {
                background-color: transparent;
            }
            
            progress::-webkit-progress-value {
                background-color: #007bb1;
            }
        `;
        const style = document.createElement("style");
        style.innerHTML = css;
        document.head.appendChild(style);
        let progressBar;
        progressBar = document.createElement("progress");
        progressBar.max = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.value = window.scrollY;
        document.body.appendChild(progressBar);
        window.addEventListener("scroll", updateProgress);
        function updateProgress() {
            progressBar.max = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.value = window.scrollY;
            requestAnimationFrame(updateProgress);
        }
    }

    /**
     * Styles the title element.
     * @param {HTMLElement} titleElement The title element to style.
     * @returns {void}
     */
    static styleTitle(titleElement) {
        titleElement.style.padding = "10px 5px";
        titleElement.style.fontWeight = "700";
        titleElement.style.fontSize = "18px";
        titleElement.style.textAlign = "center";
        titleElement.style.lineHeight = "20px";
        titleElement.style.textIndent = "0px";
    }

    /**
     * Fetches and appends the next page of the novel to the DOM.
     * @async
     * @returns {Promise<void>} A promise that resolves when the next page is fetched and appended successfully.
     */
    async getNextPage() {
        if (this.#isLoadingPage) {
            return;
        }
        this.#isLoadingPage = true;
        const nextPage = this.#config.function.getNextPage(this.#currentPage) ?? (() => {
            let nextPage = this.#currentPage.substring(0, this.#currentPage.lastIndexOf("/") + 1);
            const currentPageNumber = this.#currentPage.match(/\d+\.html/)[0];
            const nextPageNumber = parseInt(currentPageNumber) + 1;
            nextPage += nextPageNumber + ".html";
            return nextPage;
        })();
        try {
            const response = await fetch(nextPage);
            if (response.status == 404) {
                this.getNextPage = () => null;
                throw 'There\'s nothing more.';
            }
            const buffer = await response.arrayBuffer();
            const data = new TextDecoder(this.#config.encoding).decode(buffer);
            Shosetsu.removeElement(this.#config.selector.pageNav);
            this.#currentPage = nextPage;
            history.pushState(null, '', this.#currentPage);
            const parser = new DOMParser();
            const nextPageDoc = parser.parseFromString(data, "text/html");
            document
                .querySelector(this.#config.selector.readDetail)
                .append(
                    nextPageDoc.querySelector(this.#config.selector.title),
                    this.#config.function.getChapterDetail(nextPageDoc) ??
                    nextPageDoc.querySelector(this.#config.selector.read_chapterDetail)
                );
            this.init();
            const chapterDetails = document.querySelectorAll(this.#config.selector.read_chapterDetail);
            if (chapterDetails.length > 0) {
                if (chapterDetails.length > 2) {
                    document.querySelector(this.#config.selector.title).remove();
                    chapterDetails[0].remove();
                }
                chapterDetails.forEach((chapterDetail) => {
                    const chapters = Array.from(chapterDetail.children).filter((e) =>
                        /第[\d一二三四五六七八九十百千万]*?[章节]/.test(e.textContent)
                    );
                    chapters.forEach((chapter) => {
                        Shosetsu.styleTitle(chapter);
                    });
                });
                this.#isLoadingPage = false;
            }
        } catch (error) {
            await this.forceGetNextPage();
        }
    }

    /**
     * Forces the retrieval of the next page.
     * @async
     * @returns {Promise<void>}
     */
    async forceGetNextPage() {
        this.#isLoadingPage = false;
        await this.getNextPage();
    }
}

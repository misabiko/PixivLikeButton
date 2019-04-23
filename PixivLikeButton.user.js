// ==UserScript==
// @name         PixivLikeButton
// @version      0.0
// @description  Adds a like (not bookmark/favorite) button to thumbnails
// @author       misabiko
// @match        https://www.pixiv.net/
// @grant none
// ==/UserScript==

$(document).ready(() => {
	let bookmark = $("._one-click-bookmark");

	bookmark.before($("<div>", {
		class: "foo",
		css: {
			"background": bookmark.css("background"),
			right: "calc((100% - 150px)/2 + 52px)",
			width: "20px",
			height: "20px",
			bottom: "4px",
			position: "absolute",
			opacity: "0.8",
			transition: "opacity 0.2s ease-in-out",
			"z-index": "3"
		},
		click(event) {
			fetch("https://www.pixiv.net/ajax/illusts/like", {
				method: "POST",
				credentials: "same-origin",
				cache: "no-cache",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Cache-Control": "no-cache",
					"X-CSRF-Token": pixiv.context.token
				},
				body: JSON.stringify({
					illust_id: this.previousElementSibling.getAttribute("data-id")
				})
			});

			return false;
		}
	}));
});
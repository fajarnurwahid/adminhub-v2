// start: Sidebar
(function () {
    document
        .querySelectorAll('[data-toggle="sidebar"]')
        .forEach(function (item) {
            item.addEventListener("click", function (e) {
                e.preventDefault();
                document.body.classList.toggle("sidebar-collapsed");
            });
        });
})();
// end: Sidebar

// start: Dropdown
(function () {
    let cleanup;

    document
        .querySelectorAll('[data-toggle="dropdown"]')
        .forEach(function (item) {
            item.addEventListener("click", function (e) {
                e.preventDefault();
                const parent = item.closest(".dropdown");
                if (parent) {
                    const dropdownMenu = parent.querySelector(
                        ".dropdown-menu-wrapper"
                    );
                    if (dropdownMenu) {
                        cleanup = window.FloatingUIDOM.autoUpdate(
                            item,
                            dropdownMenu,
                            function () {
                                updatePosition(item, dropdownMenu);
                            }
                        );
                        if (parent.classList.contains("active")) {
                            parent.classList.remove("active");
                            cleanup();
                        } else {
                            closeDropdown();
                            parent.classList.add("active");
                        }
                    }
                }
            });
        });
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".dropdown")) {
            closeDropdown();
            cleanup && cleanup();
        }
    });

    function updatePosition(referenceEl, floatingEl) {
        window.FloatingUIDOM.computePosition(referenceEl, floatingEl, {
            middleware: [
                window.FloatingUIDOM.shift({
                    padding: 16,
                }),
            ],
            placement: "bottom-start",
        }).then(({ x, y }) => {
            Object.assign(floatingEl.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }
    function closeDropdown() {
        document.querySelectorAll(".dropdown").forEach(function (item) {
            item.classList.remove("active");
        });
    }
})();
// end: Dropdown

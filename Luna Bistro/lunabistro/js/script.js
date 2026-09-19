/* =========================================================
   LUNA BISTRO - GLOBAL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("nav-open");

            menuToggle.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        /* Close menu after clicking a link */

        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("nav-open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            const clickedInsideNav =
                mainNav.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideNav &&
                !clickedToggle
            ) {

                mainNav.classList.remove("nav-open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }



    /* =====================================================
       HEADER SCROLL EFFECT
    ====================================================== */

    const header = document.querySelector(".site-header");

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );



    /* =====================================================
       SCROLL REVEAL ANIMATION
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }



    /* =====================================================
       HERO PARALLAX
    ====================================================== */

    const hero =
        document.querySelector(".hero");

    if (hero && window.innerWidth > 768) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollPosition =
                    window.scrollY;

                if (scrollPosition < window.innerHeight) {

                    hero.style.backgroundPosition =
                        `center ${scrollPosition * 0.35}px`;

                }

            },
            { passive: true }
        );

    }



    /* =====================================================
       MENU FILTERS
       Used on index.html
    ====================================================== */

    const menuTabs =
        document.querySelectorAll(".menu-tab");

    const menuItems =
        document.querySelectorAll(
            ".menu-section .menu-item"
        );


    if (
        menuTabs.length > 0 &&
        menuItems.length > 0
    ) {

        menuTabs.forEach(tab => {

            tab.addEventListener("click", () => {

                const category =
                    tab.dataset.category;


                /* Remove active state */

                menuTabs.forEach(item => {

                    item.classList.remove("active");

                });


                /* Activate selected tab */

                tab.classList.add("active");


                /* Filter menu */

                menuItems.forEach(item => {

                    const itemCategory =
                        item.dataset.category;


                    if (
                        category === "all" ||
                        itemCategory === category
                    ) {

                        item.style.display = "flex";

                    } else {

                        item.style.display = "none";

                    }

                });

            });

        });

    }



    /* =====================================================
       RESERVATION FORM
    ====================================================== */

    const reservationForm =
        document.querySelector(
            "#reservation-form"
        );

    const reservationSuccess =
        document.querySelector(
            "#reservation-success"
        );


    if (reservationForm) {

        reservationForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                if (reservationSuccess) {

                    reservationSuccess.classList.add(
                        "show"
                    );

                }


                reservationForm.reset();


                /* Hide success message */

                setTimeout(() => {

                    if (reservationSuccess) {

                        reservationSuccess.classList.remove(
                            "show"
                        );

                    }

                }, 6000);

            }
        );

    }



    /* =====================================================
       PREVENT PAST RESERVATION DATES
    ====================================================== */

    const dateInput =
        document.querySelector(
            'input[type="date"]'
        );


    if (dateInput) {

        const today =
            new Date().toISOString().split("T")[0];

        dateInput.min = today;

    }



    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const currentYear =
        document.querySelector(
            "#current-year"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navigationLinks =
        document.querySelectorAll(
            ".main-nav a"
        );


    navigationLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) return;


        const linkPage =
            href
                .split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();


        if (
            linkPage === currentPage &&
            currentPage !== ""
        ) {

            link.classList.add("active");

        }

    });



    /* =====================================================
       SMOOTH SCROLL FOR SAME-PAGE ANCHORS
    ====================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });

});
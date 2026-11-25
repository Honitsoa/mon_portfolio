document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");
    const header = document.getElementById("header");
    const menuButton = document.getElementById("menuButton");
    const navbar = document.getElementById("navbar");
    const themeButton = document.getElementById("themeButton");
    const typingText = document.getElementById("typingText");
    const year = document.getElementById("currentYear");
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");

    // MASQUER LE CHARGEMENT
    window.addEventListener("load", () => {
        if (loader) {
            loader.classList.add("hidden");
        }
    });

    window.setTimeout(() => {
        if (loader) {
            loader.classList.add("hidden");
        }
    }, 1800);

    // ANNÉE AUTOMATIQUE
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // MENU MOBILE
    if (menuButton && navbar) {

        menuButton.addEventListener("click", () => {
            const opened = navbar.classList.toggle("active");

            menuButton.setAttribute("aria-expanded", String(opened));
            menuButton.setAttribute(
                "aria-label",
                opened ? "Fermer le menu" : "Ouvrir le menu"
            );
        });

        navbar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", event => {
            if (
                !navbar.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                navbar.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            }
        });
    }

    // HEADER AU SCROLL
    const updateHeader = () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 30);
        }
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    // CHANGEMENT DE THÈME
    if (themeButton) {

        themeButton.addEventListener("click", () => {

            document.body.classList.toggle("dark-theme");

            const dark = document.body.classList.contains("dark-theme");

            themeButton.textContent = dark ? "☀" : "☾";

            themeButton.setAttribute(
                "aria-label",
                dark ? "Activer le thème clair" : "Activer le thème sombre"
            );
        });
    }

    // ANIMATION DU TEXTE
    if (typingText) {

        const words = [
            "développement web",
            "programmation",
            "bases de données"
        ];

        let wordIndex = 0;
        let charIndex = words[0].length;
        let deleting = false;

        const type = () => {

            const current = words[wordIndex];

            typingText.textContent = current.substring(0, charIndex);

            if (!deleting && charIndex < current.length) {

                charIndex++;

                window.setTimeout(type, 85);

            } else if (!deleting) {

                deleting = true;

                window.setTimeout(type, 1200);

            } else if (charIndex > 0) {

                charIndex--;

                window.setTimeout(type, 45);

            } else {

                deleting = false;

                wordIndex = (wordIndex + 1) % words.length;

                window.setTimeout(type, 250);
            }
        };

        window.setTimeout(() => {
            deleting = true;
            type();
        }, 1200);
    }

    // ANIMATION DES SECTIONS
    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    obs.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.12
        });

        revealItems.forEach(item => {
            observer.observe(item);
        });

    } else {

        revealItems.forEach(item => {
            item.classList.add("visible");
        });
    }

    // LIEN ACTIF DANS LA NAVIGATION
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${entry.target.id}`
                        );
                    });
                }
            });

        }, {
            rootMargin: "-35% 0px -55% 0px"
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // FORMULAIRE DE CONTACT
    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const destinationEmail = "honintsoa.sah@zurcher.edu.mg";

            const name = document.getElementById("name").value.trim();
            const senderEmail = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !senderEmail || !subject || !message) {

                formFeedback.textContent =
                    "Veuillez remplir tous les champs.";

                return;
            }

            const body =
                `Nom : ${name}\nEmail : ${senderEmail}\n\nMessage :\n${message}`;

            const mailto =
                `mailto:${destinationEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            formFeedback.textContent =
                "Votre application email va s'ouvrir pour envoyer le message.";

            window.location.href = mailto;
        });
    }

});
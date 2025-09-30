// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mainNav = document.querySelector('.main-nav');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Add scrolled class to navigation on scroll
    window.addEventListener('scroll', () => {
        if (mainNav && window.scrollY > 100) {
            mainNav.classList.add('scrolled');
        } else if (mainNav) {
            mainNav.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Wyłączenie hover effects na urządzeniach dotykowych przez CSS
const disableHoverStyle = document.createElement("style");
disableHoverStyle.textContent = `
    @media (hover: none) and (pointer: coarse) {
        .service-card:hover,
        .testimonial-card:hover,
        .stat-card:hover,
        .gallery-item:hover {
            transform: none !important;
            box-shadow: none !important;
        }

        .service-card,
        .testimonial-card,
        .stat-card,
        .gallery-item {
            transition: none !important;
        }

        .gallery-item:hover img {
            transform: none !important;
        }

        .gallery-item:hover .gallery-overlay {
            opacity: 1 !important;
        }
    }
`;
document.head.appendChild(disableHoverStyle);

// Enhanced counter animation
function animateCounters() {
	const counters = document.querySelectorAll(".stat-number");

	counters.forEach(counter => {
		const target = parseInt(counter.getAttribute("data-target"));
		const duration = 2000;
		const step = target / (duration / 16);
		let current = 0;

		const timer = setInterval(() => {
			current += step;
			if (current >= target) {
				counter.textContent = target;
				clearInterval(timer);
			} else {
				counter.textContent = Math.floor(current);
			}
		}, 16);
	});
}

// Intersection Observer for animations
const observer = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				if (entry.target.classList.contains("stats")) {
					animateCounters();
				}
				entry.target.classList.add("animate-in");
			}
		});
	},
	{ threshold: 0.1 }
);

// Observe sections
document.querySelectorAll("section").forEach(section => {
	observer.observe(section);
});

// Animacja dla sekcji O mnie
const aboutObserver = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.querySelector('.about-image').classList.add('slide-in-left');
				entry.target.querySelector('.about-text').classList.add('slide-in-right');
			}
		});
	},
	{ threshold: 0.2 }
);

const aboutSection = document.querySelector('.about');
if (aboutSection) {
	aboutObserver.observe(aboutSection);
}

// Gallery animation on scroll
const galleryObserver = new IntersectionObserver(
	entries => {
		entries.forEach((entry, index) => {
			if (entry.isIntersecting) {
				setTimeout(() => {
					entry.target.style.opacity = '1';
					entry.target.style.transform = 'translateY(0)';
				}, index * 100);
			}
		});
	},
	{ threshold: 0.1 }
);

// Apply gallery animations when DOM is loaded
window.addEventListener('load', () => {
	const galleryItems = document.querySelectorAll('.gallery-item');
	galleryItems.forEach(item => {
		item.style.opacity = '0';
		item.style.transform = 'translateY(30px)';
		item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		galleryObserver.observe(item);
	});
});

// Parallax mouse effect - tylko na desktopie
if (
	!("ontouchstart" in window) &&
	window.matchMedia("(min-width: 1025px)").matches
) {
	document.addEventListener("mousemove", e => {
		const mouseX = e.clientX / window.innerWidth;
		const mouseY = e.clientY / window.innerHeight;

		document
			.querySelectorAll(".geometric-element")
			.forEach((element, index) => {
				const speed = (index + 1) * 0.3;
				const x = mouseX * speed * 10;
				const y = mouseY * speed * 10;

				element.style.transform = `translate(${x}px, ${y}px) rotate(${
					mouseX * 45
				}deg)`;
			});
	});
}

// Smooth scrolling for CTA buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	});
});

// Funkcja sprawdzająca czy urządzenie ma możliwość hover
function hasHoverCapability() {
	return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

// Enhanced hover effects - całkowite wyłączenie na urządzeniach dotykowych
if (hasHoverCapability()) {
	document
		.querySelectorAll(".testimonial-card, .service-card, .stat-card")
		.forEach(card => {
			card.addEventListener("mouseenter", function () {
				this.style.transform = "translateY(-10px) rotate(1deg) scale(1.02)";
				this.style.boxShadow = "0 20px 40px rgba(255, 215, 0, 0.2)";
			});

			card.addEventListener("mouseleave", function () {
				this.style.transform = "translateY(0) rotate(0deg) scale(1)";
				this.style.boxShadow = "";
			});
		});
}

// Dodatkowe wymuszenie braku hover na urządzeniach dotykowych
if (!hasHoverCapability()) {
	document
		.querySelectorAll(".testimonial-card, .service-card, .stat-card")
		.forEach(card => {
			// Usuń wszystkie event listenery hover
			card.style.transition = "none";
			card.addEventListener("touchstart", function () {
				this.style.transform = "none";
				this.style.boxShadow = "none";
			});

			// Zablokuj hover states
			card.addEventListener("mouseenter", function (e) {
				e.preventDefault();
				this.style.transform = "none";
				this.style.boxShadow = "none";
			});

			card.addEventListener("mouseleave", function (e) {
				e.preventDefault();
				this.style.transform = "none";
				this.style.boxShadow = "none";
			});
		});
}

// Parallax background effect - tylko na desktopie
if (hasHoverCapability()) {
	window.addEventListener("scroll", () => {
		const scrolled = window.pageYOffset;
		const parallax = document.querySelector(".mesh-background");
		if (parallax) {
			const speed = scrolled * 0.5;
			parallax.style.transform = `translateY(${speed}px)`;
		}
	});
}

// Loading screen
window.addEventListener("load", () => {
	const loadingOverlay = document.querySelector(".loading-overlay");
	if (loadingOverlay) {
		loadingOverlay.style.display = "none";
	}
});

// Dynamic gradient animation
let gradientPosition = 0;
setInterval(() => {
	gradientPosition += 1;
	document.documentElement.style.setProperty(
		"--gradient-position",
		`${gradientPosition}%`
	);
}, 50);

// Add interactive particles - tylko na desktopie
function createParticle() {
	if (!hasHoverCapability()) return; // Nie tworz cząsteczek na urządzeniach mobilnych

	const particle = document.createElement("div");
	particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: linear-gradient(45deg, #00ff88, #00cc66);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat 4s linear forwards;
            left: ${Math.random() * 100}%;
            top: 100%;
            z-index: 1;
        `;

	document.body.appendChild(particle);

	setTimeout(() => {
		particle.remove();
	}, 3000);
}

// Add particle animation
const particleStyle = document.createElement("style");
particleStyle.textContent = `
        @keyframes particleFloat {
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
document.head.appendChild(particleStyle);

// Create particles periodically - tylko na desktopie
if (hasHoverCapability()) {
	setInterval(createParticle, 500);
}

// Service cards enhanced interaction - tylko na desktopie
if (hasHoverCapability()) {
	document.querySelectorAll(".service-card").forEach(card => {
		card.addEventListener("mouseenter", function () {
			// Efekt glow tylko na desktopie (już obsłużone wyżej)
		});

		card.addEventListener("mouseleave", function () {
			// Efekt glow tylko na desktopie (już obsłużone wyżej)
		});
	});
}

// Animate service icons on scroll
const serviceObserver = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const icon = entry.target.querySelector(".service-icon");
				if (icon) {
					icon.style.animation = "iconPulse 0.6s ease-out";
					setTimeout(() => {
						icon.style.animation = "";
					}, 600);
				}
			}
		});
	},
	{ threshold: 0.5 }
);

document.querySelectorAll(".service-card").forEach(card => {
	serviceObserver.observe(card);
});

// Add icon pulse animation
const iconPulseStyle = document.createElement("style");
iconPulseStyle.textContent = `
        @keyframes iconPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
document.head.appendChild(iconPulseStyle);

// Animacja wejścia dla opcji kontaktu
const options = document.querySelectorAll(".contact-option");
options.forEach((option, index) => {
	option.style.opacity = "0";
	option.style.transform = "translateY(30px)";

	setTimeout(() => {
		option.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
		option.style.opacity = "1";
		option.style.transform = "translateY(0)";
	}, index * 200 + 500);
});

// Efekt świetlny podążający za kursorem - tylko na desktopie
if (hasHoverCapability()) {
	document.addEventListener("mousemove", e => {
		const contactSection = document.querySelector(".contact-section");
		if (contactSection) {
			const rect = contactSection.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width) * 100;
			const y = ((e.clientY - rect.top) / rect.height) * 100;

			contactSection.style.background = `
				radial-gradient(circle at ${x}% ${y}%, 
					rgba(255, 215, 0, 0.08) 0%, 
					rgba(255, 215, 0, 0.03) 50%, 
					rgba(255, 215, 0, 0.01) 100%)
			`;
		}
	});
}

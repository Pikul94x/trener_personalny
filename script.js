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

// Parallax mouse effect
document.addEventListener("mousemove", e => {
	const mouseX = e.clientX / window.innerWidth;
	const mouseY = e.clientY / window.innerHeight;

	document.querySelectorAll(".geometric-element").forEach((element, index) => {
		const speed = (index + 1) * 0.3;
		const x = mouseX * speed * 10;
		const y = mouseY * speed * 10;

		element.style.transform = `translate(${x}px, ${y}px) rotate(${
			mouseX * 45
		}deg)`;
	});
});

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

// Enhanced hover effects
document.querySelectorAll(".testimonial-card, .service-card").forEach(card => {
	card.addEventListener("mouseenter", function () {
		this.style.transform = "translateY(-10px) rotate(1deg) scale(1.02)";
	});

	card.addEventListener("mouseleave", function () {
		this.style.transform = "translateY(0) rotate(0deg) scale(1)";
	});
});

// Parallax background effect
window.addEventListener("scroll", () => {
	const scrolled = window.pageYOffset;
	const parallax = document.querySelector(".mesh-background");
	const speed = scrolled * 0.5;
	parallax.style.transform = `translateY(${speed}px)`;
});

// Loading screen
window.addEventListener("load", () => {
	document.querySelector(".loading-overlay").style.display = "none";
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

// Add interactive particles
function createParticle() {
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

// Create particles periodically
setInterval(createParticle, 500);

// Service cards enhanced interaction
document.querySelectorAll(".service-card").forEach(card => {
	card.addEventListener("mouseenter", function () {
		// Add glow effect
		this.style.boxShadow = "0 20px 40px rgba(255, 215, 0, 0.2)";
	});

	card.addEventListener("mouseleave", function () {
		this.style.boxShadow = "";
	});
});

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

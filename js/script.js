const tiers = [
    {
        monthlyContribution: 66,
        projectedEarnings: [
            [0, 0],
            [6, 396],
            [12, 792],
            [24, 1584],
            [36, 2376]
        ]
    },
    {
        monthlyContribution: 132,
        projectedEarnings: [
            [0, -300],
            [6, 492],
            [12, 1284],
            [24, 2868],
            [36, 4452]
        ]
    },
    {
        monthlyContribution: 198,
        projectedEarnings: [
            [0, -1300],
            [6, -112],
            [12, 1076],
            [24, 3452],
            [36, 5828]
        ]
    },
    {
        monthlyContribution: 264,
        projectedEarnings: [
            [0, -3100],
            [6, -1516],
            [12, 68],
            [24, 3236],
            [36, 6404]
        ]
    },
    {
        monthlyContribution: 330,
        projectedEarnings: [
            [0, -5600],
            [6, -3620],
            [12, -1640],
            [24, 2320],
            [36, 6280]
        ]
    },
    {
        monthlyContribution: 435,
        projectedEarnings: [
            [0, -5600],
            [6, -2990],
            [12, -380],
            [24, 2230],
            [24, 4840],
            [36, 10060]
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.story-section');
    const continueBtn = document.getElementById('beginJourney');
    const cards = document.querySelectorAll('.card');
    const modal = document.getElementById('tierModal');
    const closeModal = document.querySelector('.close-modal');
    let currentSection = 0;

    // Initialize the first section
    showSection(0);

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle continue button click
    continueBtn.addEventListener('click', () => {
        if (currentSection < sections.length - 1) {
            currentSection++;
            showSection(currentSection);
        }
    });

    // Handle card clicks
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const tier = card.getAttribute('data-tier');
            showTierDetails(tier);
        });
    });

    // Footer visibility control
    const footer = document.querySelector('.main-footer');
    
    function checkFooterVisibility() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Toon footer alleen als we dicht bij de bodem zijn
        if (windowHeight + scrollTop >= documentHeight - 100) {
            footer.classList.add('visible');
        } else {
            footer.classList.remove('visible');
        }
    }

    // Check footer visibility on scroll
    window.addEventListener('scroll', checkFooterVisibility);
    // Check on page load
    checkFooterVisibility();
    // Check when window is resized
    window.addEventListener('resize', checkFooterVisibility);

    function showSection(index) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show current section
        sections[index].classList.add('active');

        // Update continue button text
        if (index === sections.length - 1) {
            continueBtn.textContent = 'Start Over';
            continueBtn.addEventListener('click', () => {
                currentSection = 0;
                showSection(0);
            }, { once: true });
        } else {
            continueBtn.textContent = 'Continue';
        }
    }

    function showTierDetails(tier) {
        // Handle different tier 5 versions
        const tierIndex = tier === "5opt" ? 5 : parseInt(tier) - 1;
        const tierData = tiers[tierIndex];
        const modalContent = document.getElementById('modalContent');
        
        let content = '<h2>Bitcoin Tiger Collective</h2>';
        content += `<h3>Tier ${tier}: ${tier === "5opt" ? "Elite" : "Explorer"}</h3>`;
        
        content += '<div class="monthly-return">';
        content += '<h4>Monthly Return per Tiger:</h4>';
        content += `<div class="amount">$${tierData.monthlyContribution}</div>`;
        content += '</div>';

        content += '<div class="roi-section">';
        content += '<h4>Projected Growth Over Time</h4>';
        content += '<div class="roi-table">';
        content += '<div class="header-row">';
        content += '<span class="month-header">Month</span>';
        content += '<span class="roi-header">ROI</span>';
        content += '</div>';
        
        tierData.projectedEarnings.forEach(([months, value]) => {
            const prefix = value >= 0 ? '+' : '-';
            const formattedValue = `${prefix}$${Math.abs(value).toLocaleString()}`;
            content += '<div class="roi-row">';
            content += `<span class="month">${months}</span>`;
            content += `<span class="roi" data-value="${prefix}">${formattedValue}</span>`;
            content += '</div>';
        });
        
        content += '</div></div>';
        content += '<button class="close-button">Close</button>';
        
        modalContent.innerHTML = content;
        modal.style.display = 'block';

        // Add click handler for the new close button
        modalContent.querySelector('.close-button').addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .story-section').forEach(element => {
        observer.observe(element);
    });
}); 
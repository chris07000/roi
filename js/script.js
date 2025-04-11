document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.story-section');
    const continueBtn = document.getElementById('beginJourney');
    const cards = document.querySelectorAll('.card');
    let currentSection = 0;

    // Initialize the first section
    showSection(0);

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
        const details = {
            1: {
                title: 'Tier 1: Starter',
                monthly: '$66',
                roi: {
                    0: '$0',
                    6: '+$396',
                    12: '+$792',
                    18: '+$1,188',
                    24: '+$1,584',
                    36: '+$2,376'
                }
            },
            2: {
                title: 'Tier 2: Explorer',
                monthly: '$132',
                roi: {
                    0: '-$300',
                    6: '+$492',
                    12: '+$1,284',
                    18: '+$2,076',
                    24: '+$2,868',
                    36: '+$4,452'
                }
            },
            3: {
                title: 'Tier 3: Builder',
                monthly: '$198',
                roi: {
                    0: '-$1,300',
                    6: '-$112',
                    12: '+$1,076',
                    18: '+$2,264',
                    24: '+$3,452',
                    36: '+$5,828'
                }
            },
            4: {
                title: 'Tier 4: Master',
                monthly: '$264',
                roi: {
                    0: '-$3,100',
                    6: '-$1,516',
                    12: '+$68',
                    18: '+$1,652',
                    24: '+$3,236',
                    36: '+$6,404'
                }
            },
            5: {
                title: 'Tier 5: Elite',
                monthly: '$330',
                roi: {
                    0: '-$5,600',
                    6: '-$3,620',
                    12: '-$1,640',
                    18: '+$340',
                    24: '+$2,320',
                    36: '+$6,280'
                }
            },
            '5opt': {
                title: 'Tier 5: Elite+',
                monthly: '$435',
                roi: {
                    0: '-$5,600',
                    6: '-$2,990',
                    12: '-$380',
                    18: '+$2,230',
                    24: '+$4,840',
                    36: '+$10,060'
                }
            }
        };

        const tierInfo = details[tier];
        if (!tierInfo) return;

        // Create and show modal with tier details
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${tierInfo.title}</h2>
                <div class="tier-stats">
                    <p>Monthly Cost: <span>${tierInfo.monthly}</span></p>
                </div>
                <div class="roi-timeline">
                    <h3>Return on Investment Timeline</h3>
                    <table>
                        <tr>
                            <th>Month</th>
                            <th>ROI</th>
                        </tr>
                        ${Object.entries(tierInfo.roi).map(([month, value]) => `
                            <tr>
                                <td>${month}</td>
                                <td class="${value.startsWith('+') ? 'positive' : 'negative'}">${value}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                <button class="close-modal">Close</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }

            .modal-content {
                background: var(--card-bg);
                padding: 2rem;
                border-radius: 10px;
                border: 1px solid var(--primary-color);
                max-width: 500px;
                width: 90%;
                animation: slideUp 0.3s ease;
            }

            .tier-stats {
                margin: 1rem 0;
                padding: 1rem;
                background: rgba(255, 165, 0, 0.1);
                border-radius: 5px;
            }

            .roi-timeline {
                margin: 1rem 0;
            }

            .roi-timeline table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 1rem;
            }

            .roi-timeline th, .roi-timeline td {
                padding: 0.5rem;
                text-align: left;
                border-bottom: 1px solid var(--primary-color);
            }

            .roi-timeline th {
                color: var(--primary-color);
            }

            .roi-timeline .positive {
                color: #00ff00;
            }

            .roi-timeline .negative {
                color: #ff0000;
            }

            .close-modal {
                background: var(--primary-color);
                color: var(--background-color);
                border: none;
                padding: 0.5rem 1rem;
                font-family: 'Press Start 2P', cursive;
                cursor: pointer;
                margin-top: 1rem;
                transition: all 0.3s ease;
            }

            .close-modal:hover {
                background: var(--secondary-color);
                transform: scale(1.05);
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;

        document.head.appendChild(style);

        // Handle modal close
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            style.remove();
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
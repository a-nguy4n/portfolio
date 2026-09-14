const projectInformationMap = {
    'dermidew-card': {
        'project-preview-page-link': {
            href: 'https://a-nguy4n.github.io/projects-docs/dermi-dew/index.html',
            text: 'allison.dev > project > dermidew',
        },
        'project-preview-thumbnail': {
            src: '/assets/images/thumbnails/projects/dermidew-thumbnail.png',
            alt: 'DermiDew Project Card',
        },
        'project-preview-title': 'DermiDew',
        'project-preview-subtitle': 'Smart Skincare Face Analyzer',
        'project-tags': ['Full-Stack', 'API Integration', 'IoT', 'Teamwork'],
'project-preview-description': `DermiDew reimagines skincare through smart, personalized technology. A connected mirror, camera, and light source capture real-time skin data that is analyzed by AI to provide tailored skin insights. Through the web app, users can build and track skincare routines, manage products, and monitor their progress over time. DermiDew also provides personalized product and ingredient recommendations based on each user's unique skin needs.`,
        'project-preview-github-link': {
            href: 'https://github.com/a-nguy4n/dermiDew',
            text: 'here',
        },
    },

    'weatherwardrobe-card': {
        'project-preview-page-link': {
            href: 'https://a-nguy4n.github.io/projects-docs/aura-fit/weather-wardrobe.html',
            text: 'allison.dev > project > weather-wardrobe',
        },
        'project-preview-thumbnail': {
            src: '/assets/images/thumbnails/projects/weatherWardrobe-thumbnail.png',
            alt: 'Weather Wardrobe Thumbnail',
        },
        'project-preview-title': 'Weather Wardrobe',
        'project-preview-subtitle': 'Forecast-Based Outfit Planning',
        'project-tags': ['IoT', 'Full-Stack', 'Weather API Integration', 'Teamwork'],
        'project-preview-description': `Weather Wardrobe is a full-stack IoT web app that recommends outfits using real-time weather and environmental data collected through an ESP32 sensor. I designed and developed the responsive frontend, integrated live sensor data through REST APIs, and implemented an AI chatbot that provides personalized outfit and style suggestions.`,
        'project-preview-github-link': {
            href: 'https://github.com/a-nguy4n/weatherWardrobe',
            text: 'here',
        },
    },

    'socal-card': {
        'project-preview-page-link': {
            href: 'https://a-nguy4n.github.io/projects-docs/socal-social/socal-social.html',
            text: 'allison.dev > project > socal-social',
        },
        'project-preview-thumbnail': {
            src: '/assets/images/thumbnails/projects/socal-thumbnail.png',
            alt: 'SoCal Social Thumbnail',
        },
        'project-preview-title': 'SoCal Social',
        'project-preview-subtitle': 'Local event discovery platform for students',
        'project-tags': ['Full-Stack', 'React', 'Teamwork'],
        'project-preview-description': `SoCal Social is a full-stack web app designed to centralize campus event discovery for UCSD students. Students can discover events, follow organizations, and keep track of events they’re interested in, while clubs can create and manage their own events. Built with React, TypeScript, Flask, and SQL, the platform focuses on making campus involvement easier to discover and manage.`,
        'project-preview-github-link': {
            href: 'https://github.com/harry-lons/SoCalSocial',
            text: 'here',
        },
    },
};

function getProjectPreviewElements(previewPanel) {
    return {
        pageLink: previewPanel.querySelector('.project-preview-page-link'),
        pageLabel: previewPanel.querySelector('.project-preview-page-label'),
        thumbnail: previewPanel.querySelector('.project-preview-thumbnail'),
        title: previewPanel.querySelector('.project-preview-title'),
        subtitle: previewPanel.querySelector('.project-preview-subtitle'),
        tags: previewPanel.querySelector('.project-tags'),
        description: previewPanel.querySelector('.project-preview-description'),
        githubContainer: previewPanel.querySelector('.project-preview-github'),
        githubLink: previewPanel.querySelector('.project-preview-github-link'),
    };
}

function renderProjectPreview(previewPanel, projectId) {
    const projectInformation = projectInformationMap[projectId];

    if (!projectInformation) {
        return;
    }

    const previewElements = getProjectPreviewElements(previewPanel);

    previewElements.pageLink.href = projectInformation['project-preview-page-link'].href;
    previewElements.pageLabel.textContent = projectInformation['project-preview-page-link'].text;

    previewElements.thumbnail.src = projectInformation['project-preview-thumbnail'].src;
    previewElements.thumbnail.alt = projectInformation['project-preview-thumbnail'].alt;

    previewElements.title.textContent = projectInformation['project-preview-title'];
    previewElements.subtitle.textContent = projectInformation['project-preview-subtitle'];
    previewElements.description.innerHTML = projectInformation['project-preview-description']
        .trim()
        .split('\n')
        .map(line => line.trim())
        .join('<br>');

    previewElements.tags.innerHTML = projectInformation['project-tags']
        .map(tag => `<span>${tag}</span>`)
        .join('');

    previewElements.githubLink.href = projectInformation['project-preview-github-link'].href;
    previewElements.githubLink.textContent = projectInformation['project-preview-github-link'].text;
    previewElements.githubLink.target = '_blank';
    previewElements.githubLink.rel = 'noopener noreferrer';
}

function bindPreviewGithubLink(previewPanel) {
    const githubContainer = previewPanel.querySelector('.project-preview-github');

    if (!githubContainer) {
        return;
    }

    githubContainer.addEventListener('click', event => {
        const githubLink = event.target.closest('.project-preview-github-link');

        if (githubLink) {
            return;
        }

        const activeGithubLink = previewPanel.querySelector('.project-preview-github-link');

        if (activeGithubLink && activeGithubLink.href) {
            activeGithubLink.click();
        }
    });
}

function bindProjectCardHoverPreview(projectCards, projectBody, previewPanel, state) {
    projectCards.forEach(card => {
        if (card.closest('a')) {
            return;
        }

        card.addEventListener('mouseenter', () => {
            if (!projectBody.classList.contains('open-panel')) {
                return;
            }

            state.hoveredCardId = card.id;
            renderProjectPreview(previewPanel, card.id);
        });

        card.addEventListener('mouseleave', () => {
            if (!projectBody.classList.contains('open-panel')) {
                return;
            }

            state.hoveredCardId = null;

            if (state.selectedCardId) {
                renderProjectPreview(previewPanel, state.selectedCardId);
            }
        });
    });
}

function bindProjectCardClicks(projectCards, projectBody, previewPanel, state) {
    projectCards.forEach(card => {
        if (card.closest('a')) {
            return;
        }

        card.addEventListener('click', event => {
            event.preventDefault();

            projectCards.forEach(currentCard => currentCard.classList.remove('selected'));
            card.classList.add('selected');

            state.selectedCardId = card.id;
            state.hoveredCardId = null;

            renderProjectPreview(previewPanel, card.id);
            projectBody.classList.add('open-panel');
            previewPanel.classList.add('open-panel');
        });
    });
}

function bindPreviewCloseButton(projectBody, previewPanel, closeButton, state) {
    if (!closeButton) {
        return;
    }

    closeButton.addEventListener('click', () => {
        const selectedCards = document.querySelectorAll('.project-card.selected');

        selectedCards.forEach(card => card.classList.remove('selected'));
        state.selectedCardId = null;
        state.hoveredCardId = null;
        projectBody.classList.remove('open-panel');
        previewPanel.classList.remove('open-panel');
    });
}

function activateProjectPreviewPanel() {
    const projectBody = document.querySelector('main.page-container');
    const projectCards = document.querySelectorAll('.project-card');
    const previewPanel = document.getElementById('project-preview-panel');
    const closeButton = document.getElementById('close-preview-panel');
    const previewState = {
        selectedCardId: null,
        hoveredCardId: null,
    };

    bindPreviewGithubLink(previewPanel);
    bindProjectCardHoverPreview(projectCards, projectBody, previewPanel, previewState);
    bindProjectCardClicks(projectCards, projectBody, previewPanel, previewState);
    bindPreviewCloseButton(projectBody, previewPanel, closeButton, previewState);
}

activateProjectPreviewPanel();


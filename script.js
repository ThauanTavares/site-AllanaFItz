// Dados das fotos para cada álbum (simulado)
const albumPhotos = {
    'Ana & Carlos': Array.from({length: 28}, (_, i) => `Foto ${i + 1} - Casamento Ana & Carlos`),
    'Marina & João': Array.from({length: 30}, (_, i) => `Foto ${i + 1} - Casamento Marina & João`),
    'Isabella': Array.from({length: 25}, (_, i) => `Foto ${i + 1} - 15 Anos Isabella`),
    'Sophia': Array.from({length: 22}, (_, i) => `Foto ${i + 1} - 15 Anos Sophia`),
    'Pedro - 30 anos': Array.from({length: 18}, (_, i) => `Foto ${i + 1} - Aniversário Pedro`),
    'Família Silva': Array.from({length: 24}, (_, i) => `Foto ${i + 1} - Aniversário Família Silva`),
    'Turma Medicina 2024': Array.from({length: 30}, (_, i) => `Foto ${i + 1} - Formatura Medicina`),
    'Camila': Array.from({length: 20}, (_, i) => `Foto ${i + 1} - Ensaio Camila`),
    'Lucas & Maria': Array.from({length: 26}, (_, i) => `Foto ${i + 1} - Ensaio Lucas & Maria`)
};

// Filtros
const filterBtns = document.querySelectorAll('.filter-btn');
const albumCards = document.querySelectorAll('.album-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active de todos os botões
        filterBtns.forEach(b => b.classList.remove('active'));
        // Adiciona active ao botão clicado
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        albumCards.forEach(card => {
            if (filter === 'todos' || card.dataset.category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Modal da galeria
const galleryModal = document.getElementById('galleryModal');
const galleryTitle = document.getElementById('galleryTitle');
const galleryGrid = document.getElementById('galleryGrid');
const closeBtn = document.getElementById('closeBtn');

albumCards.forEach(card => {
    card.addEventListener('click', () => {
        const clientName = card.dataset.client;
        const eventType = card.dataset.type;
        const photos = albumPhotos[clientName] || [];

        // Atualiza o título
        galleryTitle.textContent = `${clientName} - ${eventType}`;

        // Limpa a galeria
        galleryGrid.innerHTML = '';

        // Adiciona as fotos
        photos.forEach((photo, index) => {
            const photoDiv = document.createElement('div');
            photoDiv.className = 'gallery-photo';
            photoDiv.innerHTML = `📷<span style="position: absolute; bottom: 10px; left: 10px; font-size: 0.8rem; color: rgba(255,255,255,0.7);">${index + 1}</span>`;
            galleryGrid.appendChild(photoDiv);
        });

        // Mostra o modal
        galleryModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Fechar modal
closeBtn.addEventListener('click', closeModal);
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        closeModal();
    }
});

function closeModal() {
    galleryModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal.style.display === 'block') {
        closeModal();
    }
});
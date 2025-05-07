document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const galleryContainer = document.querySelector('.gallery-container');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const closeModal = document.querySelector('.close-modal');

  // Show loading state
  galleryContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading gallery...</div>';

  // Initialize gallery after short delay (simulate loading)
  setTimeout(initGallery, 800);

  function initGallery() {
    // Complete gallery data
    const galleryItems = [
      { 
        src: 'https://i.pinimg.com/736x/88/73/cd/8873cd36fea428143e36e261b11bb57d.jpg', 
        alt: 'Design Project 1', 
        category: 'design',
        title: 'Creative Design Solution',
        description: 'Innovative visual solutions for modern businesses'
      },
      { 
        src: 'https://i.pinimg.com/736x/51/0f/ad/510fad7ac4829296ea029b69deea4319.jpg', 
        alt: 'Design Project 2', 
        category: 'design',
        title: 'UI/UX Design',
        description: 'User-centered interface design'
      },
      { 
        src: 'https://i.pinimg.com/736x/fb/9c/af/fb9caf5ec5b9a346e89497e2e1b99d15.jpg', 
        alt: 'Design Project 3', 
        category: 'design',
        title: 'Graphic Design',
        description: 'Visual communication solutions'
      },
      { 
        src: 'https://i.pinimg.com/736x/80/03/34/800334a52009b75f6c42e23da886ac3e.jpg', 
        alt: 'Development Project 1', 
        category: 'development',
        title: 'Web Development Project',
        description: 'Responsive website development'
      },
      { 
        src: 'https://i.pinimg.com/736x/8f/5f/a5/8f5fa5035ee11bce27ca31372e7d54c5.jpg', 
        alt: 'Development Project 2', 
        category: 'development',
        title: 'Mobile App Development',
        description: 'Cross-platform mobile applications'
      },
      { 
        src: 'https://i.pinimg.com/736x/85/0b/ba/850bbab21ce6a7f48632b5ad88cc02f8.jpg', 
        alt: 'Marketing Project 1', 
        category: 'marketing',
        title: 'Marketing Campaign',
        description: 'Strategic marketing solutions'
      },
      { 
        src: 'https://i.pinimg.com/736x/0b/c7/6e/0bc76edb2ec70b0efab6951b8aaa8a39.jpg', 
        alt: 'Marketing Project 2', 
        category: 'marketing',
        title: 'Social Media Strategy',
        description: 'Engagement-focused social campaigns'
      },
      { 
        src: 'https://i.pinimg.com/736x/f8/88/bd/f888bdb652a46cc684079b8244bb6806.jpg', 
        alt: 'Branding Project 1', 
        category: 'branding',
        title: 'Brand Identity',
        description: 'Comprehensive brand development'
      },
      { 
        src: 'https://i.pinimg.com/736x/db/38/b7/db38b7c4920415752a746b71189a17ab.jpg', 
        alt: 'Branding Project 2', 
        category: 'branding',
        title: 'Logo Design',
        description: 'Memorable brand marks'
      }
    ];

    // Clear loading state
    galleryContainer.innerHTML = '';

    // Create gallery items
    galleryItems.forEach(item => {
      const galleryItem = document.createElement('div');
      galleryItem.className = `gallery-item ${item.category}`;
      galleryItem.setAttribute('data-category', item.category);

      galleryItem.innerHTML = `
        <img src="${item.src}" alt="${item.alt}" loading="lazy">
        <div class="item-info">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <span class="item-category">${item.category}</span>
        </div>
      `;

      galleryContainer.appendChild(galleryItem);
    });

    // Add click events to gallery items for lightbox
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const info = this.querySelector('.item-info').innerHTML;

        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalCaption.innerHTML = info;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });
  }

  // Filter functionality
  function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');

    items.forEach(item => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }

  // Add event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      // Filter gallery
      filterGallery(this.getAttribute('data-filter'));
    });
  });

  // Close modal
  function closeModalFunction() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Event listeners for modal
  closeModal.addEventListener('click', closeModalFunction);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModalFunction();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModalFunction();
  });

  // Initialize with all items showing
  filterGallery('all');
});
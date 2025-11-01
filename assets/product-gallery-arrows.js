// Product Gallery Arrows - Make them functional
function initializeGalleryArrows(container = document) {
  const mediaWrapper = container.querySelector('.product__media-wrapper');

  if (!mediaWrapper) {
    return;
  }

  const sliderComponent = mediaWrapper.querySelector('slider-component');
  if (!sliderComponent) {
    return;
  }

  const slider = sliderComponent.querySelector('[id^="Slider-"]');
  const slides = sliderComponent.querySelectorAll('.slider__slide');
  const prevButton = mediaWrapper.querySelector('.slider-button--prev');
  const nextButton = mediaWrapper.querySelector('.slider-button--next');
  const thumbnails = container.querySelectorAll('.thumbnail');

  if (!prevButton || !nextButton || slides.length <= 1) {
    return;
  }

  // Remove any existing listeners to avoid duplicates
  const newPrevButton = prevButton.cloneNode(true);
  const newNextButton = nextButton.cloneNode(true);
  prevButton.parentNode.replaceChild(newPrevButton, prevButton);
  nextButton.parentNode.replaceChild(newNextButton, nextButton);

  // Ensure buttons are clickable
  newPrevButton.style.pointerEvents = 'auto';
  newNextButton.style.pointerEvents = 'auto';
  newPrevButton.style.cursor = 'pointer';
  newNextButton.style.cursor = 'pointer';
  newPrevButton.removeAttribute('disabled');
  newNextButton.removeAttribute('disabled');

  let currentSlide = 0;

  // Function to update active slide and thumbnail
  function updateSlide(index) {
    const isQuickAddModal = container.id && container.id.startsWith('QuickAddInfo-');

    // Preload next/prev images to prevent white flash (for quick-add modal)
    if (isQuickAddModal) {
      const nextIndex = index < slides.length - 1 ? index + 1 : 0;
      const prevIndex = index > 0 ? index - 1 : slides.length - 1;
      [nextIndex, prevIndex].forEach((i) => {
        const img = slides[i]?.querySelector('img');
        if (img && !img.complete) {
          const tempImg = new Image();
          tempImg.src = img.src;
        }
      });
    }

    // Update active class
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('is-active');
      } else {
        slide.classList.remove('is-active');
      }
    });

    // Scroll the slider to the target slide (only if not in a quick-add modal)
    const targetSlide = slides[index];
    if (targetSlide && !isQuickAddModal && slider) {
      // Use scrollIntoView to scroll to the slide on the main page
      targetSlide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }

    // Update active thumbnail
    thumbnails.forEach((thumb, i) => {
      if (i === index) {
        thumb.setAttribute('aria-current', 'true');
        thumb.classList.add('active-thumbnail');
      } else {
        thumb.setAttribute('aria-current', 'false');
        thumb.classList.remove('active-thumbnail');
      }
    });

    currentSlide = index;
  }

  // Main image Previous button
  newPrevButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const newIndex = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    updateSlide(newIndex);
  });

  // Main image Next button
  newNextButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const newIndex = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    updateSlide(newIndex);
  });

  // Thumbnail click
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', function (e) {
      e.preventDefault();
      updateSlide(index);
    });
  });

  // Thumbnail navigation arrows
  const thumbnailSlider = document.querySelector('.thumbnail-slider');

  if (thumbnailSlider) {
    const thumbPrevButton = thumbnailSlider.querySelector('.slider-button--prev');
    const thumbNextButton = thumbnailSlider.querySelector('.slider-button--next');

    if (thumbPrevButton) {
      // Remove disabled attribute if it exists
      thumbPrevButton.removeAttribute('disabled');
      thumbPrevButton.style.cursor = 'pointer';
      thumbPrevButton.style.pointerEvents = 'all';

      thumbPrevButton.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          const newIndex = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
          updateSlide(newIndex);
        },
        true,
      );
    }

    if (thumbNextButton) {
      // Remove disabled attribute if it exists
      thumbNextButton.removeAttribute('disabled');
      thumbNextButton.style.cursor = 'pointer';
      thumbNextButton.style.pointerEvents = 'all';

      thumbNextButton.addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          const newIndex = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
          updateSlide(newIndex);
        },
        true,
      );
    }
  }

  // Initialize - find which slide is currently active
  slides.forEach((slide, i) => {
    if (slide.classList.contains('is-active')) {
      currentSlide = i;
      updateSlide(i);
    }
  });

  // Preload all images in quick-add modal to prevent delays
  const isQuickAddModal = container.id && container.id.startsWith('QuickAddInfo-');
  if (isQuickAddModal) {
    slides.forEach((slide) => {
      const img = slide.querySelector('img');
      if (img && img.dataset.src) {
        // Trigger lazy load
        img.src = img.dataset.src;
      }
    });
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
  initializeGalleryArrows();
});

// Expose globally for quick-add modal and other dynamic content
window.initializeGalleryArrows = initializeGalleryArrows;

// Product Gallery Arrows - Make them functional
document.addEventListener('DOMContentLoaded', function () {
  const mediaWrapper = document.querySelector('.product__media-wrapper');

  if (!mediaWrapper) return;

  const sliderComponent = mediaWrapper.querySelector('slider-component');
  if (!sliderComponent) return;

  const slides = sliderComponent.querySelectorAll('.slider__slide');
  const prevButton = mediaWrapper.querySelector('.slider-button--prev');
  const nextButton = mediaWrapper.querySelector('.slider-button--next');
  const thumbnails = document.querySelectorAll('.thumbnail');

  if (!prevButton || !nextButton || slides.length <= 1) return;

  let currentSlide = 0;

  // Function to update active slide and thumbnail
  function updateSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('is-active');
        slide.style.display = 'block';
      } else {
        slide.classList.remove('is-active');
        slide.style.display = 'none';
      }
    });

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
  prevButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const newIndex = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    updateSlide(newIndex);
  });

  // Main image Next button
  nextButton.addEventListener('click', function (e) {
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
          console.log('Thumbnail prev clicked');
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
});

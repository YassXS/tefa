window.SiteShell = (() => {
  const escapeHtml = (value = "") =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const renderHead = ({ title = "TEFA PROJECT", includeGsap = false } = {}) => {
    const sharedHead = [
      '<meta name="theme-color" content="#ffffff">',
      '<meta name="color-scheme" content="light">',
      '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">',
      '<link rel="stylesheet" type="text/css" href="css/style.css">',
      '<link rel="icon" type="image/png" sizes="32x32" href="images/icon1.png">',
      '<link rel="shortcut icon" href="images/icon1.png" type="image/x-icon">',
      '<link rel="apple-touch-icon" href="images/icon1.png">',
      '<link rel="preconnect" href="https://fonts.googleapis.com">',
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
      '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">',
      `<title>${escapeHtml(title)}</title>`
    ];

    if (includeGsap) {
      sharedHead.splice(
        2,
        0,
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"><\/script>',
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"><\/script>'
      );
    }

    document.write(sharedHead.join("\n"));
  };

  const renderNavbar = (page = "") => {
    const isProjectPage = page === "ongoing" || page === "finished";
    const navHtml = `
<nav class="navbar navbar-expand-lg navbar-dark bg-navy fixed-top custom-navbar">
  <div class="container">
    <a class="navbar-brand" href="index.html">
      <img src="images/02 DPIB BRAND WH.png" alt="Logo TEFA" class="navbar-logo" width="202" height="64" decoding="async">
    </a>
    <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link ${page === "index" ? "active" : ""}" href="index.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${page === "about" ? "active" : ""}" href="about.html">About</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle ${isProjectPage ? "active" : ""}" href="#" role="button" data-bs-toggle="dropdown">
            Project
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item ${page === "ongoing" ? "active" : ""}" href="ongoing.html">On Going Project</a></li>
            <li><a class="dropdown-item ${page === "finished" ? "active" : ""}" href="finished.html">Finish Project</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link ${page === "gallery" ? "active" : ""}" href="gallery.html">Gallery</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${page === "contact" ? "active" : ""}" href="contact.html">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;

    document.write(navHtml);
  };

  const renderFooterScripts = () => {
    document.write(`
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"><\/script>
<script>
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".custom-navbar");

  if (!navbar) {
    return;
  }

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

(function () {
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var interactiveTargets = [
    ".page-hero-panel",
    ".section-heading",
    ".company-story-card",
    ".about-card-modern",
    ".journey-card",
    ".asset-card",
    ".gallery-card",
    ".gallery-img",
    ".team-hero-card",
    ".team-card",
    ".contact-card",
    ".map-mini-info",
    ".map-card"
  ].join(",");

  document.querySelectorAll(interactiveTargets).forEach(function (item, index) {
    if (!item.classList.contains("about-reveal")) {
      item.classList.add("site-reveal");
      item.style.setProperty("--reveal-delay", Math.min(index * 28, 240) + "ms");
    }
  });

  var revealItems = document.querySelectorAll(".site-reveal");

  if (prefersReducedMotion) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  var navCollapse = document.querySelector(".navbar-collapse");
  if (navCollapse && window.bootstrap) {
    document.querySelectorAll(".navbar-collapse .nav-link:not(.dropdown-toggle), .navbar-collapse .dropdown-item").forEach(function (link) {
      link.addEventListener("click", function () {
        var instance = bootstrap.Collapse.getInstance(navCollapse);
        if (instance) {
          instance.hide();
        }
      });
    });
  }

  var backToTop = document.createElement("button");
  backToTop.type = "button";
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.textContent = "↑";
  document.body.appendChild(backToTop);

  var toggleBackToTop = function () {
    backToTop.classList.toggle("is-visible", window.scrollY > 520);
  };

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  if (!prefersReducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".asset-card, .gallery-card, .journey-card, .team-card, .about-stat-card, .contact-card").forEach(function (card) {
      card.classList.add("tilt-ready");
      card.addEventListener("pointermove", function (event) {
        var rect = card.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        var y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
        card.style.setProperty("--tilt-x", y.toFixed(2) + "deg");
        card.style.setProperty("--tilt-y", x.toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () {
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      });
    });
  }

  var zoomImages = Array.prototype.slice.call(document.querySelectorAll(".project-showcase .gallery-card img, .gallery-section .gallery-img, .journey-img"));
  var lightbox = null;
  var activeImageIndex = 0;

  var setLightboxImage = function (index) {
    if (!lightbox || !zoomImages.length) {
      return;
    }

    activeImageIndex = (index + zoomImages.length) % zoomImages.length;
    var image = zoomImages[activeImageIndex];
    var lightboxImage = lightbox.querySelector(".site-lightbox-image");
    var caption = lightbox.querySelector(".site-lightbox-caption");
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || "TEFA image preview";
    caption.textContent = image.alt || "TEFA image preview";
  };

  var closeLightbox = function () {
    if (!lightbox) {
      return;
    }

    lightbox.remove();
    lightbox = null;
    document.body.classList.remove("project-lightbox-open");
  };

  var openLightbox = function (index) {
    if (!zoomImages.length) {
      return;
    }

    closeLightbox();
    lightbox = document.createElement("div");
    lightbox.className = "site-lightbox";
    lightbox.innerHTML = '<button class="site-lightbox-close" type="button" aria-label="Close preview">&times;</button><button class="site-lightbox-nav site-lightbox-prev" type="button" aria-label="Previous image">‹</button><figure class="site-lightbox-frame"><img class="site-lightbox-image" src="" alt=""><figcaption class="site-lightbox-caption"></figcaption></figure><button class="site-lightbox-nav site-lightbox-next" type="button" aria-label="Next image">›</button>';
    document.body.appendChild(lightbox);
    document.body.classList.add("project-lightbox-open");
    setLightboxImage(index);

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox || event.target.classList.contains("site-lightbox-close")) {
        closeLightbox();
      }

      if (event.target.classList.contains("site-lightbox-prev")) {
        setLightboxImage(activeImageIndex - 1);
      }

      if (event.target.classList.contains("site-lightbox-next")) {
        setLightboxImage(activeImageIndex + 1);
      }
    });
  };

  zoomImages.forEach(function (image, index) {
    image.classList.add("is-zoomable");
    image.setAttribute("tabindex", "0");
    image.addEventListener("click", function () {
      openLightbox(index);
    });
    image.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (!lightbox) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      setLightboxImage(activeImageIndex - 1);
    } else if (event.key === "ArrowRight") {
      setLightboxImage(activeImageIndex + 1);
    }
  });

  document.querySelectorAll(".project-showcase .gallery-card").forEach(function (card) {
    var image = card.querySelector("img");
    if (image) {
      card.setAttribute("data-caption", image.alt || "TEFA Project");
    }
  });

  document.querySelectorAll("form").forEach(function (form) {
    var submitButton = form.querySelector('[type="submit"]');
    var status = document.createElement("p");
    status.className = "form-live-status";
    status.setAttribute("aria-live", "polite");
    form.appendChild(status);

    form.querySelectorAll(".form-control").forEach(function (field) {
      field.addEventListener("input", function () {
        field.classList.toggle("is-filled", field.value.trim().length > 0);
      });
    });

    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        form.classList.add("was-validated");
        status.textContent = "Please complete the required fields first.";
        return;
      }

      if (submitButton) {
        submitButton.classList.add("is-sending");
        submitButton.textContent = "Sending...";
      }
      status.textContent = "Message is ready to send.";
    });
  });
})();
<\/script>`);
  };

  return {
    renderHead,
    renderNavbar,
    renderFooterScripts
  };
})();

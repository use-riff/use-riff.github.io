(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var fineHoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

  /* ---- sticky header surface ---- */
  var header = doc.querySelector("[data-header]");
  if (header) {
    var lastScrolled = null;
    var updateHeader = function () {
      var scrolled = window.scrollY > 8;
      if (scrolled !== lastScrolled) {
        header.classList.toggle("is-scrolled", scrolled);
        lastScrolled = scrolled;
      }
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  /* ---- scroll reveals ---- */
  var revealEls = doc.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- roadmap progress line ---- */
  var roadmapList = doc.querySelector("[data-roadmap-list]");
  var roadmapProgress = doc.querySelector("[data-roadmap-progress]");
  if (roadmapList && roadmapProgress) {
    var progressTicking = false;
    var updateProgress = function () {
      progressTicking = false;
      var rect = roadmapList.getBoundingClientRect();
      var viewportH = window.innerHeight || doc.documentElement.clientHeight;
      var total = rect.height;
      var visibleTravel = viewportH * 0.6 - rect.top;
      var pct = total > 0 ? Math.max(0, Math.min(1, visibleTravel / total)) : 0;
      roadmapProgress.style.height = (pct * 100).toFixed(2) + "%";
    };
    var requestProgressUpdate = function () {
      if (!progressTicking) {
        progressTicking = true;
        requestAnimationFrame(updateProgress);
      }
    };
    var progressActive = false;
    var scrollHandler = function () { requestProgressUpdate(); };
    if ("IntersectionObserver" in window) {
      var roadmapObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !progressActive) {
            progressActive = true;
            window.addEventListener("scroll", scrollHandler, { passive: true });
            requestProgressUpdate();
          } else if (!entry.isIntersecting && progressActive) {
            progressActive = false;
            window.removeEventListener("scroll", scrollHandler);
          }
        });
      }, { threshold: 0 });
      roadmapObserver.observe(roadmapList);
    } else {
      window.addEventListener("scroll", scrollHandler, { passive: true });
      requestProgressUpdate();
    }
  }

  /* ---- pause continuous CSS animation when tab hidden ---- */
  var applyVisibilityPause = function () {
    root.classList.toggle("anim-paused", doc.visibilityState === "hidden");
  };
  doc.addEventListener("visibilitychange", applyVisibilityPause);
  applyVisibilityPause();

  /* ---- hero sculpture: subtle pointer-reactive tilt ---- */
  var sculptureWrap = doc.querySelector(".sculpture-wrap");
  var sculpture = doc.querySelector("[data-sculpture]");
  if (sculptureWrap && sculpture && fineHoverQuery.matches && !reduceMotionQuery.matches) {
    var targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    var settling = false;
    var maxDeg = 5;

    var applyTransform = function () {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      sculpture.style.transform =
        "rotateX(" + (currentY * maxDeg).toFixed(2) + "deg) " +
        "rotateY(" + (currentX * maxDeg).toFixed(2) + "deg)";

      var closeEnough =
        Math.abs(targetX - currentX) < 0.001 && Math.abs(targetY - currentY) < 0.001;

      if (!closeEnough && doc.visibilityState !== "hidden") {
        requestAnimationFrame(applyTransform);
      } else {
        settling = false;
      }
    };

    var startSettle = function () {
      if (!settling) {
        settling = true;
        requestAnimationFrame(applyTransform);
      }
    };

    sculptureWrap.addEventListener("mousemove", function (e) {
      var rect = sculptureWrap.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      startSettle();
    });

    sculptureWrap.addEventListener("mouseleave", function () {
      targetX = 0;
      targetY = 0;
      startSettle();
    });
  }

  /* ---- no-js marker cleanup (class already swapped inline in <head>) ---- */
  root.classList.remove("no-js");
})();

$(document).ready(function () {
  "use strict";

  // Variables for screen dimensions
  const windowWidth = $(window).width();
  const windowHeight = window.innerHeight;
  const headerHeight = $(".default-header").height();
  const headerHeightStatic = $(".site-header.static").outerHeight();
  const fitScreenHeight = windowHeight - headerHeight;

  // Set fullscreen and fitscreen heights
  $(".fullscreen").css("height", windowHeight);
  $(".fitscreen").css("height", fitScreenHeight);

  // Sticky Header
  $(".default-header").sticky({ topSpacing: 0 });

  // Nice Select Initialization
  $("select").niceSelect();

  // Mobile Menu Toggle
  $(".menu-bar").on("click", function (e) {
      e.preventDefault();
      $("nav").toggleClass("hide");
      $("span", this).toggleClass("lnr-menu lnr-cross");
      $(".main-menu").addClass("mobile-menu");
  });

  // Activate the first tab in navigation
  $(".nav-item a:first").tab("show");

// Learn More Functionality
    $("#toggleBtn").on("click", function () {
        const moreText = $("#moreText");
        const button = $(this);

        // Smooth slide transition with callback to update button text
        moreText.stop(true, false).slideToggle(500, function () {
            if (moreText.is(":visible")) {
                button.html('Show Less <span class="lnr lnr-arrow-left"></span>');
            } else {
                button.html('Learn More <span class="lnr lnr-arrow-right"></span>');
            }
        });
    });




    // Read More Functionality for Details Section
  $(".details .toggle-button").on("click", function (e) {
    e.preventDefault();  // Prevent the default action of the anchor tag
    const shortText = $(this).siblings(".short-text");
    const fullText = $(this).siblings(".full-text");
    const isExpanded = fullText.is(":visible");
  
    if (isExpanded) {
      // Slide up the full text to hide it
      fullText.slideUp();
      shortText.slideDown();
      $(this).text("Read More");
    } else {
      // Slide down the full text to show it
      fullText.slideDown();
      shortText.slideUp();
      $(this).text("Read Less");
    }
  });
  

  // Smooth Scroll for Links with Hashes
  $(".main-menubar a[href*='#']")
      .not('[href="#"]')
      .not('[href="#0"]')
      .on("click", function (event) {
          if (
              location.pathname.replace(/^\//, "") ===
                  this.pathname.replace(/^\//, "") &&
              location.hostname === this.hostname
          ) {
              const target = $(this.hash);
              if (target.length) {
                  event.preventDefault();
                  $("html, body").animate(
                      {
                          scrollTop: target.offset().top,
                      },
                      1000,
                      function () {
                          target.attr("tabindex", "-1").focus();
                      }
                  );
              }
          }
      });

  // AJAX Form Submission for Mailing
  const form = $("#myForm");
  const submit = $(".submit-btn");
  const alert = $(".alert-msg");

  form.on("submit", function (e) {
      e.preventDefault();

      $.ajax({
          url: "mail.php",
          type: "POST",
          dataType: "html",
          data: form.serialize(),
          beforeSend: function () {
              alert.fadeOut();
              submit.html("Sending...");
          },
          success: function (data) {
              alert.html(data).fadeIn();
              form.trigger("reset");
              submit.css("display", "none");
          },
          error: function (e) {
              console.error(e);
          },
      });
  });
});

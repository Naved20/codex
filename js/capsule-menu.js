/* ============================================================
   RESPONSIVE CAPSULE MENU CONTROLLER
   Smooth Mobile Menu Toggle & Dropdown Handling
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  var menuBar = document.querySelector('.et_pb_menu_0_tb_header .mobile_menu_bar');
  var mobileNav = document.querySelector('.et_pb_menu_0_tb_header .mobile_nav');
  var headerContainer = document.querySelector('.et_pb_section_0_tb_header');

  if (mobileNav) {
    // Ensure mobile menu list exists
    var mobileMenu = mobileNav.querySelector('.et_mobile_menu');
    if (!mobileMenu) {
      var desktopMenu = document.querySelector('.et_pb_menu_0_tb_header .et-menu-nav > ul');
      if (desktopMenu) {
        mobileMenu = desktopMenu.cloneNode(true);
        mobileMenu.className = 'et_mobile_menu';
        mobileMenu.id = 'mobile_menu_cloned';
        mobileNav.appendChild(mobileMenu);
      }
    }

    // Toggle mobile menu on clicking hamburger button
    if (menuBar) {
      menuBar.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var isClosed = mobileNav.classList.contains('closed');
        var m = mobileNav.querySelector('.et_mobile_menu');
        if (isClosed) {
          mobileNav.classList.remove('closed');
          mobileNav.classList.add('opened');
          if (m) m.style.setProperty('display', 'block', 'important');
        } else {
          mobileNav.classList.remove('opened');
          mobileNav.classList.add('closed');
          if (m) m.style.setProperty('display', 'none', 'important');
        }
      });
    }

    // Close mobile menu if clicked outside
    document.addEventListener('click', function(e) {
      if (mobileNav.classList.contains('opened')) {
        if (!mobileNav.contains(e.target)) {
          mobileNav.classList.remove('opened');
          mobileNav.classList.add('closed');
          var m = mobileNav.querySelector('.et_mobile_menu');
          if (m) m.style.setProperty('display', 'none', 'important');
        }
      }
    });

    // Close mobile menu when a nav link is clicked
    if (mobileMenu) {
      mobileMenu.addEventListener('click', function(e) {
        var link = e.target.closest('a');
        if (link && !link.closest('.menu-item-has-children > a')) {
          mobileNav.classList.remove('opened');
          mobileNav.classList.add('closed');
          mobileMenu.style.setProperty('display', 'none', 'important');
        }
      });
    }
  }

  // Packages dropdown: ensure keyboard focus accessibility & smooth click toggle
  var packagesItem = document.querySelector('.et_pb_menu_0_tb_header .menu-item-has-children');
  if (packagesItem) {
    var packagesLink = packagesItem.querySelector('a');
    if (packagesLink) {
      packagesLink.addEventListener('click', function(e) {
        // On desktop, if clicked, toggle or keep open
        if (window.innerWidth > 980) {
          if (packagesLink.getAttribute('href') === '#' || packagesLink.getAttribute('href') === './#packages') {
            e.preventDefault();
          }
        }
      });
    }
  }
});

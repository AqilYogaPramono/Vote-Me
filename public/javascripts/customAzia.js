document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('#postVotingNav .nav-item');
  
  navItems.forEach(item => {
    item.classList.remove('active');
  });

  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const linkPath = link.getAttribute('href');
    
    if (currentPath == '/' && linkPath == '/') {
      item.classList.add('active');
    }
    else if (currentPath != '/' && linkPath != '/' && currentPath.includes(linkPath)) {
      item.classList.add('active');
    }
  });
});

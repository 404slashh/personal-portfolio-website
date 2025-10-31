const themeToggle = document.querySelector('#theme-toggle');
const htmlElement = document.documentElement;
const projectsContainer = document.querySelector('.projects-container');

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

const renderProjects = () => {
  let allProjectsHTML = '';
  projects.forEach(project => {
    const projectCardHTML = `
      <div class="project-card">
        <div class="project-image-container">
            <img 
              src="${linkOfProfile}"
              alt="Screenshot of the ${project.title} project" 
              class="project-image"
            >
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-links">
            <a 
              href="${project.liveUrl}" 
              class="btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
            <a 
              href="${project.codeUrl}" 
              class="btn btn-secondary" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    `;
    
    allProjectsHTML += projectCardHTML;
  });

  projectsContainer.innerHTML = allProjectsHTML;

};

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');

      formStatus.innerHTML = 'Sending...';
      formStatus.className = 'info'; 
      formStatus.style.display = 'block';
      submitButton.disabled = true;

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          formStatus.innerHTML = "Thank you! Your message has been sent.";
          formStatus.className = 'success';
          contactForm.reset();
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
            }
            formStatus.className = 'error';
          })
        }
      }).catch(error => {
        formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
        formStatus.className = 'error';
      }).finally(() => {
        submitButton.disabled = false;
      });
    });
  }
});





themeToggle.addEventListener('click', () => {
  const newTheme = themeToggle.checked ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});


(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
      themeToggle.checked = true;
    }
  }
})();


const projects = [
  {
    title: "Portfolio Project (This Website!)",
    description: "A responsive personal portfolio built from scratch using HTML, CSS, and vanilla JavaScript. Features a dynamic theme switcher and is populated by a JavaScript data structure.",
    imageUrl: "./images/portfolio-project-preview.jpg",
    liveUrl: "https://your-live-site.com", // Replace with your actual deployed URL
    codeUrl: "https://github.com/your-username/your-repo-name" // Replace with your actual GitHub repo
  },

  {
    title: "E-commerce Website Concept",
    description: "A concept design and front-end implementation for an e-commerce platform. Focused on a clean UI, responsive product grids, and a streamlined checkout process using modern CSS techniques.",
    imageUrl: "./images/ecommerce-project-preview.jpg", // Make sure to add this image to your 'images' folder!
    liveUrl: "#", // Use "#" if there's no live link yet
    codeUrl: "https://github.com/your-username/ecommerce-repo" // Replace with your repo link
  },

  {
    title: "Task Management App",
    description: "A client-side task management application built with vanilla JavaScript. Allows users to add, edit, delete, and mark tasks as complete, with all data saved to localStorage.",
    imageUrl: "./images/task-app-preview.jpg", // Add this image to your 'images' folder
    liveUrl: "#",
    codeUrl: "https://github.com/your-username/task-app-repo" // Replace with your repo link
  }
 ];
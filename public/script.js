// Filename: public/script.js

// Confirm before deleting a post
document.addEventListener("DOMContentLoaded", function () {
    const deleteForms = document.querySelectorAll("form[action^='/delete/']");
  
    deleteForms.forEach(form => {
      form.addEventListener("submit", function (e) {
        const confirmed = confirm("Are you sure you want to delete this post?");
        if (!confirmed) {
          e.preventDefault();
        }
      });
    });
  
    // Animate buttons on click
    const buttons = document.querySelectorAll("button, a");
  
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        button.classList.add("clicked");
        setTimeout(() => button.classList.remove("clicked"), 200);
      });
    });
  });
  
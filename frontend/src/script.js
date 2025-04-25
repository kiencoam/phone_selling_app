function includeHTML() {
    document.querySelectorAll("[include-html]").forEach(async (el) => {
      const file = el.getAttribute("include-html");
      const response = await fetch(file);
      if (response.ok) {
        const text = await response.text();
        el.innerHTML = text;
      } else {
        el.innerHTML = "Không thể tải file: " + file;
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", includeHTML);
  
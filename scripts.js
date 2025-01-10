document.addEventListener("DOMContentLoaded", function () {
  const whitelist = [805974090, 725392258, 616311386, 881836932, 894976880]; // Replace with repository IDs you want to show

  const urls = [
    "https://api.github.com/users/Iv4nd3r/repos",
    "https://api.github.com/users/SistemBasisData2024/repos",
    "https://api.github.com/users/Evandita/repos",
  ];

  Promise.all(urls.map((url) => fetch(url).then((response) => response.json())))
    .then((results) => {
      const allRepos = results.flat();
      const publicRepos = allRepos.filter((repo) => !repo.private);
      const filteredRepos = publicRepos.filter(
        (repo) =>
          (whitelist.length === 0 || whitelist.includes(repo.id)) &&
          !blacklist.includes(repo.id)
      );

      const featuredProjectsContainer = document.querySelector(
        "#featured-projects .gallery"
      );

      if (featuredProjectsContainer) {
        filteredRepos.forEach((repo) => {
          const projectItem = document.createElement("div");
          projectItem.classList.add("gallery-item");
          projectItem.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
          <a href="${repo.html_url}" target="_blank" data-en="Project link" data-id="Tautan proyek">Project link</a>
          `;
          featuredProjectsContainer.appendChild(projectItem);
        });
      } else {
        console.error("Required containers not found in the DOM.");
      }
    })
    .catch((error) => {
      console.error("Error fetching repositories:", error);
    });
});

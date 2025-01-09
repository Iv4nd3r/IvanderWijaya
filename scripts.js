document.addEventListener("DOMContentLoaded", function () {
  const whitelist = []; // Replace with repository IDs you want to show
  const blacklist = [
    860541982, 881402676, 796146457, 802070650, 881403512, 687890082, 913292574,
    802121392,
  ]; // Replace with repository IDs you want to hide

  fetch("https://api.github.com/users/Iv4nd3r/repos")
    .then((response) => response.json())
    .then((data) => {
      const publicRepos = data.filter((repo) => !repo.private);
      const filteredRepos = publicRepos.filter(
        (repo) =>
          (whitelist.length === 0 || whitelist.includes(repo.id)) &&
          !blacklist.includes(repo.id)
      );
      const projectsContainer = document.querySelector(
        "#featured-projects .gallery"
      );
      filteredRepos.forEach((repo) => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("gallery-item");
        projectItem.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                `;
        projectsContainer.appendChild(projectItem);
      });
    });
});

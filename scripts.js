document.addEventListener("DOMContentLoaded", function () {
  const whitelist = [805974090, 725392258]; // Replace with repository IDs you want to show
  const blacklist = [
    860541982, 881402676, 796146457, 802070650, 881403512, 687890082, 913292574,
    802121392, 914268436,
  ]; // Replace with repository IDs you want to hide

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
          projectItem.textContent = repo.name;
          allProjectsContainer.appendChild(projectItem);
          featuredProjectsContainer.appendChild(projectItem.cloneNode(true));
        });
      } else {
        console.error("Required containers not found in the DOM.");
      }
    })
    .catch((error) => {
      console.error("Error fetching repositories:", error);
    });
});

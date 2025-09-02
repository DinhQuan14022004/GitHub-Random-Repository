
  const dropdown = document.querySelector(".dropdown");
  const selected = document.getElementById("dropdownSelected");
  const items = document.querySelectorAll(".dropdown__item");
  const list= document.getElementById("dropdownList");
  const state=document.querySelector(".state");
  const repoCard=document.querySelector(".repoCard")
  const refresh = document.querySelector(".refresh")

async function fetchRepository(){
    const language=selected.textContent;
    try{
state.classList.remove("err");
        state.classList.remove("hidden");
        state.textContent = "Loading...";
        repoCard.classList.add("hidden");
        const response=await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`);
        if (!response.ok) throw new Error("Lỗi API: " + response.status);
            const data = await response.json();
               if (data.items.length === 0){
                state.classList.add("err")
               state.textContent = " Không tìm thấy repository nào";
            return;
               }
               refresh.classList.remove("hidden")
               state.classList.add("hidden");
               repoCard.classList.remove("hidden");
 const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];
            repoCard.innerHTML = `
      <h2><a href="${randomRepo.html_url}" target="_blank">${randomRepo.full_name}</a></h2>
      <p>${randomRepo.description || "Không có mô tả."}</p>
      <p> Stars: ${randomRepo.stargazers_count} |  Forks: ${randomRepo.forks_count} |  Issues: ${randomRepo.open_issues_count}</p>
      `;

    }
    catch(err){
        state.textContent= err.message;
         state.classList.add("err");
    }
}
selected.addEventListener("click", () =>{
list.classList.toggle("dropdownList");
})
  items.forEach(item => {
    item.addEventListener("click", () => {
      selected.textContent = item.textContent;
      items.forEach(i => i.classList.remove("selected"));
      item.classList.add("selected");
      list.classList.remove("dropdownList")
      fetchRepository();
    });
  });
refresh.addEventListener("click", () =>{
        fetchRepository();
      })

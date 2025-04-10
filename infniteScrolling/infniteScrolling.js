document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".content");
  const loading = document.querySelector(".loading");

  let limit = 30;
  let skip = 0;
  let isloading = false;
  let hasMore = true;

  async function fetchData() {
    if (isloading || !hasMore) return;
    isloading = true;
    loading.style.display = "block";

    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await res.json();
      console.log(data);

      data.products.forEach((product) => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `<strong>${product.title} <br/> ${product.price}</strong>`;
        container.appendChild(div);
      });

      skip += limit;
      console.log("skip", skip);
      hasMore = skip < data.total;
    } catch (error) {
      console.log(error);
    } finally {
      isloading = false;
      loading.style.display = "none";
    }
  }

  window.addEventListener('scroll', () => {
    console.log("scrolling");
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log(scrollTop , clientHeight ,  scrollHeight)
    console.log(scrollTop + clientHeight >= scrollHeight - 5)
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      fetchData();
    }
  });

  fetchData();
  
});

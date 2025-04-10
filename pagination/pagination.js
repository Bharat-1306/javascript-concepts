document.addEventListener("DOMContentLoaded", () => {
  let paginationItems = document.getElementById("current-page-data");
  let paginationBtns = document.getElementById("pagination-btns");

  const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
  //   something like
  // const data = Array.from({length : 100}) creates an 100 arrays of undefined
  // data.map((_,i) => {
  //  return `Item ${i + 1}`;
  // })
  const itemsPerPage = 10;
  let currentPage = 1
  //need to slice the data 

  function displayData(page) {
    const start = (page - 1) * itemsPerPage; // 0
    const end = page*itemsPerPage; //10
    const paginationData = data.slice(start, end);
    console.log(paginationData); // shoild nhave the first 10 elemnts
    // insert them into the data 
    paginationItems.innerHTML = "";
    paginationItems.innerHTML = paginationData.map((data) => {
        return `<p>${data}</p>`;
    }).join("");


  }

  function createPagination() {
    const pageCount = Math.ceil(data.length/itemsPerPage);
    console.log(pageCount);
    paginationBtns.innerHTML = "";
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
    pages.forEach((page) => {
        const btn = document.createElement("button");
        btn.innerText = page;
        btn.addEventListener('click' , () => {
            currentPage = page;
            displayData(currentPage);
            createPagination()
        })
        paginationBtns.appendChild(btn);
    })
  }
  displayData(currentPage);
  createPagination()


});

Math.ceil(4.1); // 5
Math.ceil(4.9); // 5
Math.ceil(4);   // 4

Math.ceil(101 / 10) // 11 pages (we need a page even for that last single item!)
//we have used math.ceil to round up the number of pages

Math.round(4.1); // 4
Math.round(4.5); // 5
Math.round(4.9); // 5
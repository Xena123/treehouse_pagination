/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
const listItems = document.querySelectorAll('.student-item');
const noPerPage = 10;

const showPage = (collection, page) => {
  // get the first index and last index based on the page number passed in
  firstIndex = (page * noPerPage) - 10;
  lastIndex = (noPerPage * page);
  // loop through the collection and compare the current index to firstindex and lastindex variables
  for (i = 0; i < collection.length; i++) {
    if (i >= firstIndex && i < lastIndex) {
      // if its in the range leave the display property the same
      collection[i].style.display = '';
    } else {
      // if its out the range hide the whole list item
      collection[i].style.display = 'none';
    } 
  }
}

// call the function once to show the first page.
showPage(listItems, 1);

const appendPageLinks = (collection) => {
  // get the number of links needed by dividing the collection length by the number per page
  let noOfPages = collection.length / noPerPage;
  // round up to get number of buttons
  noOfPages = Math.ceil(noOfPages);
  // create and append the div container and the unordered list that will house the links
  const linkContainer = document.createElement('div');
  linkContainer.className = 'pagination';
  document.querySelector('.page').appendChild(linkContainer);
  const ul = document.createElement('ul');
  linkContainer.appendChild(ul);

  // create a loop and create a list item and a link for each page number
  for (let i = 0; i < noOfPages; i++) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.textContent = `${i+1}`;
    a.href = "#";
    if (i === 0) {
      a.className = 'active';
    }
    ul.appendChild(li);
    li.appendChild(a);
  }

  ul.addEventListener('click', (e) => {
    const link = e.target;
    // get the page number from the pressed link
    let page = e.target.textContent;
    // run the showpage function passing in the page number from the button pressed
    showPage(collection, page);
    const links = document.querySelectorAll('.pagination a');
    // loop through the links and remove the class before adding it
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove('active');
    }
    // add class to link that was clicked
    link.className = "active";
  });
}

appendPageLinks(listItems);

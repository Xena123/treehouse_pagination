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
  // get the number of buttons needed by dividing the collection length by the number per page
  let noOfPages = collection.length / noPerPage;
  // round up to get number of buttons
  noOfPages = Math.ceil(noOfPages);
  // create and append the div container and the unordered list that will house the buttons
  const linkContainer = document.createElement('div');
  linkContainer.className = 'js-buttonDiv';
  document.querySelector('.page').appendChild(linkContainer);
  const ul = document.createElement('ul');
  linkContainer.appendChild(ul);

  // create a loop and create a list item and a button for each page number
  for (let i = 0; i < noOfPages; i++) {
    let li = document.createElement('li');
    li.textContent = `${i+1}`;
    if (i === 0) {
      li.className = 'js-currentPage';
    }
    ul.appendChild(li);
    
  }

  ul.addEventListener('click', (e) => {
    const li = e.target;
    // get the page number from the pressed button
    let page = e.target.textContent;
    // run the showpage function passing in the page number from the button pressed
    showPage(collection, page);
    const lis = document.querySelectorAll('.js-buttonDiv li');
    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove('js-currentPage');
    }
    li.className = "js-currentPage";
  });
}

appendPageLinks(listItems);

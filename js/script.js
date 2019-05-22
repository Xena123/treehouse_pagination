/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
const listItems = document.querySelectorAll('.student-item');
const noPerPage = 10;
const names = document.querySelectorAll('.student-item h3');

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

// create all the search elements and append in the correct places
const header = document.querySelector('.page-header');   
const searchDiv = document.createElement('div');
searchDiv.classList.add('student-search');
const searchInput = document.createElement('input');
searchInput.placeholder = "Search for students...";
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
header.appendChild(searchDiv);


const searchContent = (searchInput, content) => {
  // loop through all the content that is passed in with the content parameter
  for (let i = 0; i < content.length; i++) {
    let currentItem = content[i].textContent.toLowerCase();
    let currentParent = content[i].parentNode.parentNode;
    let currentInput = searchInput.value.toLowerCase();

    currentParent.style.display = '';
    currentParent.classList.add('match');
    // then if the content does not match what is submitted/typed in the input then add the hide class to that parent element
    if (currentInput.length != 0) {
      if (!(currentItem.includes(currentInput))) {
        currentParent.style.display = 'none';
        currentParent.classList.remove('match');
      }
    }
  }
}

searchButton.addEventListener('click', (e) => {
  // prevent button from refreshing page
  e.preventDefault();
  // call the search function when clicking on the search button
  searchContent(searchInput, names);
  let searchResults = document.querySelectorAll('.match');
  appendPageLinks(searchResults);
});

searchInput.addEventListener('keyup', () => {
  // call the search function on the keyup event
  searchContent(searchInput, names);
  let searchResults = document.querySelectorAll('.match');
  appendPageLinks(searchResults);
});



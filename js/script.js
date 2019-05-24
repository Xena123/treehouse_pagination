/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
let listItems = document.querySelectorAll('.student-item');
const noPerPage = 10;
const names = document.querySelectorAll('.student-item h3');
const page = document.querySelector('.page');

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
  
    if (link.tagName === 'A') {
      // get the page number from the pressed link
      let pageLink = e.target.textContent;
      // run the showpage function passing in the page number from the button pressed
      showPage(collection, pageLink);
      const links = document.querySelectorAll('.pagination a');
      // loop through the links and remove the class before adding it
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
      }
      // add class to link that was clicked
      link.className = "active";
    }
  });
  
}

const searchContent = (searchInput, content) => {
  let storageArr = [];
  // loop through all the content that is passed in with the content parameter
  for (let i = 0; i < content.length; i++) {
    let currentItem = content[i].textContent.toLowerCase();
    let currentParent = content[i].parentNode.parentNode;
    let currentInput = searchInput.value.toLowerCase();

    // first hide all the list items
    currentParent.style.display = 'none';
    // then if the current input is not empty add all the results to storageArr array
    if (currentInput.length != 0) {
      if (currentItem.includes(currentInput)) {
        storageArr.push(currentParent);
      }
    }
  }
  // return the array
  return storageArr;
}

const searchEvent = (searchInput, content) => {
  // store the results of the searchContent function in a variable
  const searchResults = searchContent(searchInput, content);
  const paginationDiv = document.querySelector('.pagination');

  // if the pagination links already exist then remove them
  if (paginationDiv) {
    page.removeChild(paginationDiv);
  }
  if (document.querySelector('p')) {
    page.removeChild(document.querySelector('p'));
  }
  // if the array is not empty and the 'no search' message exists then remove the message
  if (searchResults.length != 0) {
    // then run the showPage and appendPageLinks function
    showPage(searchResults, 1);
    appendPageLinks(searchResults);
  // else if the search input is not empty then add the search results message
  } else if (searchInput.value.length != 0) {
    const messageDiv = document.createElement('p');
    messageDiv.textContent = "No results found";
    page.appendChild(messageDiv);
  } else {
    showPage(listItems, 1);
    appendPageLinks(listItems);
  }
}

const searchInit = () => {
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

  searchInput.addEventListener('keyup', () => {
    // call the search event function on the keyup event 
    searchEvent(searchInput, names);
  });
  searchButton.addEventListener('click', (e) => {
    // prevent button from refreshing page
    e.preventDefault();
    // call the search function when clicking on the search button
    searchEvent(searchInput, names);
  });
}

// call the showPage function once to show the first page.
showPage(listItems, 1);
appendPageLinks(listItems);
searchInit();
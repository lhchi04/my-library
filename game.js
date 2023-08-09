let myLibrary = []

function Book(title, author, pages, finished, rating) {
  this.title = title
  this.author = author
  this.pages = pages
  this.finished = finished
  this.rating = rating
  this.titleInfo = function() {
    return title;
  }
  this.authorInfo = function() {
    return author;
  }
  this.finishedInfo = function() {
    if (finished === false)
      return 'Not finished'
    return 'Read'
  }
  this.ratingInfo = function() {
    if (rating === -1) return -1
    return parseInt(rating)
  }
}

function addToLibrary() {
  let i = myLibrary.length-1;
  let book = new Book(myLibrary[i].title, myLibrary[i].author, myLibrary[i].pages, myLibrary[i].finished, myLibrary[i].rating);
  return book;
}

function printPreview(book, position) {
  if (position === 0) return book.titleInfo();
  else if (position === 1) return book.authorInfo();
  else if (position === 2) return book.finishedInfo();
  return book.ratingInfo();
}

let read;
let title = document.getElementById('title');
let author = document.getElementById('author');
let pages = document.getElementById('pages');
let finished = document.getElementById('finished');
let allRating = Array.from(document.querySelectorAll('input[type=radio]'));
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let newBook = {
    title: title.value,
    author: author.value,
    pages: pages.value,
    finished: finished.checked,
    rating: value,
  }
  myLibrary.push(newBook);
  let myNewBook = addToLibrary();

  // Add book preview
  const bookPreview = document.createElement('div');
  bookPreview.classList.add('preview');

  // Add book preview content
  const content = document.createElement('p');
  content.classList.add('content');
  const titleContent = document.createElement('h2');
  content.appendChild(titleContent);
  const authorContent = document.createElement('h3');
  content.appendChild(authorContent);
  const finishedContent = document.createElement('h4');
  content.appendChild(finishedContent);
  const ratingContent = document.createElement('div');
  ratingContent.classList.add('rating-display');
  content.appendChild(ratingContent);
  titleContent.textContent = printPreview(myNewBook, 0);
  authorContent.textContent = printPreview(myNewBook, 1);
  finishedContent.textContent = printPreview(myNewBook, 2);
  displayStar(ratingContent, printPreview(myNewBook, 3));

  // Add setting section
  const setting = document.createElement('div');
  setting.classList.add('setting');

  // Add button-container
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  setting.appendChild(buttonContainer);

  // Add view button
  const view = document.createElement('button');
  view.textContent = 'View';
  view.classList.add('view');
  buttonContainer.appendChild(view);

  // Add delete button
  const del = document.createElement('button');
  del.textContent = 'Delete';
  del.classList.add('delete');
  buttonContainer.appendChild(del);

  // Add toggle button
  const toggleContainer = document.createElement('div');
  toggleContainer.classList.add('toggle-container');
  const toggle = document.createElement('div');
  toggle.classList.add('toggle');
  const circle = document.createElement('div');
  circle.classList.add('circle');
  toggle.appendChild(circle);
  toggleContainer.appendChild(toggle);
  const toggleText = document.createElement('span');
  toggleText.classList.add('toggle-text');
  toggleText.textContent = finishedContent.textContent;
  if (toggleText.textContent === 'Read') {
    read = true;
    toggle.classList.add('active');
    toggleText.textContent = 'Read';
  }
  else {
    read = false;
    toggle.classList.remove('active');
    toggleText.textContent = 'Not finished';
  }
  toggleContainer.appendChild(toggleText);
  buttonContainer.appendChild(toggleContainer);
  bookPreview.appendChild(content);
  bookPreview.appendChild(setting);

  // Hover over preview to show setting
  bookPreview.addEventListener('mouseover', () => {
    bookPreview.lastChild.style.display = "block";
  });
  bookPreview.addEventListener('mouseout', () => {
    bookPreview.lastChild.style.display = "none";
  });
  document.querySelector('.books').appendChild(bookPreview);

  // Toggle the read button
  const index = myLibrary.indexOf(newBook);
  toggle.addEventListener('click', () => {
    read = !read;
    if (read) {
      myLibrary[index].finished = true;
      toggle.classList.add('active');
      toggleText.textContent = 'Read';
      finishedContent.textContent = 'Read';
    } else {
      myLibrary[index].finished = false;
      toggle.classList.remove('active');
      toggleText.textContent = 'Not finished';
      finishedContent.textContent = 'Not finished';
    }
  });
  
  // Delete the book preview
  del.addEventListener('click', () => deleteBook(del,index));
  showEmpty();
  resetForm();
})

document.addEventListener("DOMContentLoaded", function() {
  showEmpty();
});

// Check the rating
let value = -1;
function starValue() {
  allRating.forEach(star => {
    if (star.checked) {
      value = star.value;
    }
  })
  return value;
}

function displayStar(ratingContent, num) {
  for (let i=0; i<5; i++) {
    let star = document.createElement('div');
    ratingContent.appendChild(star);
  }
  if (num === -1) {}
  else {
    for (let i=0; i<num; i++) {
      let child = ratingContent.children[i];
      child.classList.add('star-display');
    }
  }
  return ratingContent;
}

function deleteBook(e, index) {
  myLibrary.splice(index, 1);
  e.parentElement.parentElement.parentElement.remove();
  showEmpty();
}

function showEmpty() {
  if (myLibrary.length === 0) {
    document.querySelector('.empty').style.display = "block";
  }
  else {
    document.querySelector('.empty').style.display = "none";
  }
}

function openForm() {
  document.querySelector('.form-container').style.cssText = "opacity: 1; top: 50%";
}

function closeForm() {
  document.querySelector('.form-container').style.cssText = "opacity: 0; top: -400px;";
}

function resetForm() {
  title.value = '';
  author.value = '';
  pages.value = '';
  finished.checked = false;
  if (value !== -1)
    document.querySelector('input[name="rating"]:checked').checked = false;
}


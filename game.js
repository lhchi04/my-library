let myLibrary = []

function Book(title, author, pages, finished) {
  this.title = title
  this.author = author
  this.pages = pages
  this.finished = finished
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
}

function addToLibrary() {
  let i = myLibrary.length-1;
  let book = new Book(myLibrary[i].title, myLibrary[i].author, myLibrary[i].pages, myLibrary[i].finished);
  return book;
}

function printPreview(book, position) {
  if (position === 0) return book.titleInfo();
  else if (position === 1) return book.authorInfo();
  return book.finishedInfo();
}

let read;

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = document.getElementById('title');
  let author = document.getElementById('author');
  let pages = document.getElementById('pages');
  let finished = document.getElementById('finished');
  let newBook = {
    title: title.value,
    author: author.value,
    pages: pages.value,
    finished: finished.checked,
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
  titleContent.textContent = printPreview(myNewBook,0).toString();
  authorContent.textContent = printPreview(myNewBook,1).toString();
  finishedContent.textContent = printPreview(myNewBook,2).toString();
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
  // Add content and setting to book preview
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
  // View details of the book
  // view.addEventListener('click', () => {
  //   bookPreview.classList.add('viewPreview');
  // });
  // Delete the book preview
  del.addEventListener('click', () => {
    myLibrary.splice(index, 1);
    del.parentElement.parentElement.parentElement.remove();
  });
  title.value = '';
  author.value = '';
  pages.value = '';
  finished.checked = false;
})

function openForm() {
  document.querySelector('.form-container').style.cssText = "opacity: 1; top: 50%";
}

function closeForm() {
  document.querySelector('.form-container').style.cssText = "opacity: 0; top: -400px;";
}


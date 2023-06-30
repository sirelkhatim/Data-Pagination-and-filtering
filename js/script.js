/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, pageNumber){
   // set the number of items a page will have
   const itemsPerPage = 9;
   // calculate the start index
   let startIdx = pageNumber*itemsPerPage - itemsPerPage;
   // calculate the end index
   let endIdx = pageNumber*itemsPerPage;
   // declare variable to store all student info
   let studentInfo = '';
   // fetch the student list element on the page
   let studentList = document.getElementsByClassName('student-list')[0];
   studentList.innerHTML = '';
   if(list.length == 0){
      studentInfo += '<big><h1>No results</h1></big>'
   }else{
   // loop through the list argument and add info to studentInfo
   for(let i = 0; i < list.length; i++){
      if(i>=startIdx && i< endIdx){
         studentInfo += `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
           <h3>${list[i].name.first} ${list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">${list[i].registered.date}</span>
         </div>
       </li>`; 
      }

   }
}
   //insert the student info into the studentList element
   studentList.insertAdjacentHTML("beforeend", studentInfo)
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(studentList){
   
   //calculate the number of buttons needed
   const noButtons = Math.ceil(studentList.length/9);
   // fetch the link-list element from the web page
   let ulElement = document.getElementsByClassName('link-list')[0];
   ulElement.innerHTML = '';
   // loop through the no of buttons and set the label to be the index
   for(let i = 0; i < noButtons; i++){
      ulElement.insertAdjacentHTML("beforeend",  `<li>
      <button type="button">${i+1}</button>
    </li>`)
   }
   //select the first button
   const firstButton = document.querySelector('button');
   //the first Button will be the active page
   firstButton.setAttribute('class', 'active');
   //add an event listener to listen for clicks and select the correct pagination page.
   ulElement.addEventListener('click', (e)=> {
   if(e.target.tagName === 'BUTTON'){
      const removeButton = document.querySelector('.active');
      removeButton.classList.remove('active')
      const newActiveButton = e.target;
      newActiveButton.classList.add('active');
      const display = newActiveButton.textContent;
      showPage(studentList, display);
      }
   });
}

// function to add search bar to webpage
function addSearch(){
   const header = document.querySelector('.header');
   searchBarHTML = `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>
 `
 header.insertAdjacentHTML('beforeend', searchBarHTML)
}


// Call functions
showPage(data,1);
addPagination(data);
addSearch();

// declare global variables for searching

const searchName = document.getElementById('search');
const searchButton = document.querySelector('button.submit');

// on the event of a key filter the elements accordingly
searchName.addEventListener('keyup', ()=>{
   // get the query
   let query = searchName.value.toLowerCase();
   //on the event of a "click" filter the query and check it against all first names and last names
   query.onClick = () => {
      searchName.value = '';
   }
   const results = data.filter(student =>{
      return (student.name.first.toLowerCase().includes(query) ||
      student.name.last.toLowerCase().includes(query)
      );
   });
   // finally call functions to show the page and add pagination
   showPage(results, 1);
   addPagination(results);
})
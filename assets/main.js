
    const accountButton = document.querySelector(".nav--button--account");
    const coursesButton = document.querySelector(".nav--button--courses");
    const calendarButton = document.querySelector(".nav--button--calendar");
    const dashboardButton = document.querySelector(".nav--button--home");
    const accountSection = document.querySelector("#account");
    const coursesSection = document.querySelector("#courses");
    const calendarSection = document.querySelector("#cal");
    const dashboardSection = document.querySelector(".dashboard");
    const dashboardNotifs = document.querySelector(".notifications");
    const overlayElement = document.querySelector('.overlay');

    let overlayOn = false;
    let accountOn = false;
    let coursesOn = false;

    function isOverlayOn() {

    }
  

  // Close the overlay when clicking outside the account section
//   overlayElement.addEventListener('click', function () {
//     overlayElement.style.display = 'none';
//   });


    accountButton.addEventListener("click", function () {
        // Toggle the visibility by changing the right position
        accountSection.style.left = accountSection.style.left === "0px" ? "-350px" : "0px";
        if (overlayOn) {
            overlayElement.style.display = 'none';
            overlayOn = false;
            accountOn = false;
        } else {
            overlayElement.style.display = 'block';
            overlayOn = true;
            accountOn = true;
            coursesOn = false;
        }
        
    });
    coursesButton.addEventListener("click", function () {
        // Toggle the visibility by changing the right position
        coursesSection.style.left = coursesSection.style.left === "0px" ? "-350px" : "0px";
        if (overlayOn) {
            overlayElement.style.display = 'none';
            overlayOn = false;
            coursesOn = false;
        } else {
            overlayElement.style.display = 'block';
            overlayOn = true;
            coursesOn = true;
            accountOn = false;
        }
    });

    calendarButton.addEventListener("click", function () {
        // overlayElement.style.display = 'block';
        if (overlayOn) {
            overlayElement.style.display = 'none';
            overlayOn = false;
            if (accountOn) {
                accountSection.style.left = accountSection.style.left === "0px" ? "-350px" : "0px";
            } else if (coursesOn) {
                coursesSection.style.left = coursesSection.style.left === "0px" ? "-350px" : "0px";
            }   
        }
        calendarSection.classList.remove("hidden");
        dashboardSection.classList.add("hidden");
        dashboardNotifs.classList.add("hidden");
    });

    dashboardButton.addEventListener("click", function () {
        if (overlayOn) {
            overlayElement.style.display = 'none';
            overlayOn = false;
            if (accountOn) {
                accountSection.style.left = accountSection.style.left === "0px" ? "-350px" : "0px";
            } else if (coursesOn) {
                coursesSection.style.left = coursesSection.style.left === "0px" ? "-350px" : "0px";
            }   
        }
        dashboardSection.classList.remove("hidden");
        dashboardNotifs.classList.remove("hidden");
        calendarSection.classList.add("hidden");
    });



// CALENDAR

let weeklyView = false;
let monthlyView = true;

    function daysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    }

function formatHour(hour) {
  const twelveHourFormat = hour % 12 || 12;
  const amPm = hour < 12 ? 'AM' : 'PM';
  return `${twelveHourFormat} ${amPm}`;
}


  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function generateCalendar(year, month) {
    const calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = "";
    
    document.getElementById("curr-month").textContent = `${getMonthName(month)} ${year}`;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const daysInThisMonth = daysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Calculate the last day of the previous month
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    const startingPoint = lastDayOfPrevMonth - firstDayOfMonth + 1;

    let dayCounter = 1;

    for (let i = 0; i < 5; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");

        if (i === 0 && j < firstDayOfMonth) {
          // Days of the previous month
          cell.textContent = startingPoint + j;
          cell.classList.add("previous-month");
          // Explicitly add the class to the cell for days from the previous month
          cell.classList.add("day-number");
        } else if (dayCounter <= daysInThisMonth) {
          // Days of the current month
          const dayNumber = document.createElement("div");
          dayNumber.textContent = dayCounter++;
          dayNumber.classList.add("day-number");
          cell.appendChild(dayNumber);

          // Highlight the current date
          if (year === currentYear && month === currentMonth && dayCounter - 1 === currentDay) {
            cell.classList.add("current-date");
          }
        } else {
          // Days of the next month
          const dayNumber = document.createElement("div");
          dayNumber.textContent = dayCounter - daysInThisMonth;
          dayNumber.classList.add("day-number", "next-month");
          cell.appendChild(dayNumber);
          dayCounter++;
        }

        row.appendChild(cell);
      }

      calendarBody.appendChild(row);
    }
  }


    function getMonthName(month) {
      const monthAbbr = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      if (monthlyView) {
        return monthNames[month];
      } else if (weeklyView) {
        return monthAbbr[month];

      }
      
      
    }

function getStartAndEndDateOfWeek(currentDate) {
  const currentDateCopy = new Date(currentDate);
  const currentDayOfWeek = currentDateCopy.getDay();

  const startDate = new Date(currentDateCopy);
  startDate.setDate(currentDateCopy.getDate() - currentDayOfWeek);

  const endDate = new Date(currentDateCopy);
  endDate.setDate(currentDateCopy.getDate() + (6 - currentDayOfWeek));

  return { startDate, endDate };
}

    function prevMonth() {
      if (monthlyView) {
        const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
        const currDate = currentDate.getDate();

      // Save the current state of the calendar
      const savedState = {
        year: currentYear,
        month: currentMonth,
      };

      // Update the calendar for the previous month
      currentDate.setMonth(currentMonth - 1);
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

      // Restore the saved state if needed
      // savedState can be used to store additional information about the state
      
      // Update the "curr-month" button text for the previous month
      document.getElementById("curr-month").textContent = `${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`;
      } else if (weeklyView) {
        console.log("prev-week");
        currentDate.setDate(currentDate.getDate() - 7);
        let lastWeek = new Date(currentDate);
        const { startDate, endDate } = getStartAndEndDateOfWeek(currentDate);
        generateWeeklyCalendar(currentDate);
        
        document.getElementById("curr-week").textContent = `${getMonthName(startDate.getMonth())} ${startDate.getDate()} - ${getMonthName(endDate.getMonth())} ${endDate.getDate()}`;
      }
      
    }

    // Function to update the calendar for the next month
    function nextMonth() {
      if (monthlyView) {
        const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      // Save the current state of the calendar
      const savedState = {
        year: currentYear,
        month: currentMonth,
      };

      // Update the calendar for the next month
      currentDate.setMonth(currentMonth + 1);
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
      
      

      // Restore the saved state if needed
      // savedState can be used to store additional information about the state
      
       // Update the "curr-month" button text for the next month
      document.getElementById("curr-month").textContent = `${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`;
      } else if (weeklyView) {
        console.log("next-week");
        currentDate.setDate(currentDate.getDate() + 7);
        let nextWeek = new Date(currentDate);
        const { startDate, endDate } = getStartAndEndDateOfWeek(currentDate);
        generateWeeklyCalendar(currentDate);
        
        document.getElementById("curr-week").textContent = `${getMonthName(startDate.getMonth())} ${startDate.getDate()} - ${getMonthName(endDate.getMonth())} ${endDate.getDate()}`;
        
      }
      
    }

    // Example: Generate the calendar for the current month
    const currentDate = new Date();
    const today = new Date();
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

// Function to generate the weekly calendar
function generateWeeklyCalendar(currDate) {
    const weeklyCalendarHeader = document.getElementById("weekly-calendar-header");
    const weeklyHeaderCells = weeklyCalendarHeader.getElementsByTagName('th');
    
    
    
    const weeklyCalendarBody = document.getElementById("weekly-calendar-body");
    weeklyCalendarBody.innerHTML = "";

    
    
    // const currDate = new Date();
    const currentDay = currDate.getDay(); // Get the day index (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const currentTime = currDate.getTime();
    const currentHour = currDate.getHours();

    const daysOfWeek = ['', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    
    for (let i = 1; i < weeklyHeaderCells.length; i++) {
      // Access each <th> element and perform actions
      const headerCell = weeklyHeaderCells[i];
      const dayDate = addDays(currDate, i - currentDay); // Calculate the date for the current day
      const formattedDate = `${daysOfWeek[i]} ${dayDate.getMonth() + 1}/${dayDate.getDate() - 1}`;
      headerCell.textContent = formattedDate;
    }

    for (let hour = 0; hour < 24; hour++) {
      for (let halfHour = 0; halfHour < 2; halfHour++) {
        const row = document.createElement("tr");

        for (let day = 0; day < 8; day++) {
          const cell = document.createElement("td");

          if (day === 0 && halfHour === 0) {
            // Display the hour in the leftmost column (for the first row only)
            const formattedHour = formatHour(hour);
            cell.textContent = `${formattedHour}`
            cell.classList.add("hours");
          }

          if (halfHour === 1 && day === 0) {
            // Display the half-hour mark in the leftmost column (for the second row only in the first column)
            cell.textContent = "";
            cell.classList.add("hours");
          }

          if ((halfHour === 0 || halfHour === 1) && day !== 0) {
            
            const dayContent = document.createElement("div");
            dayContent.textContent = ""; 
            
            dayContent.classList.add("day-content");
            cell.appendChild(dayContent);

            if (day === currentDay + 1 && currDate.getDate() === today.getDate() 
                && currDate.getMonth() === today.getMonth() && day != 0) {
              cell.classList.add("current-day");
            } 
            
            if (hour === currentHour && halfHour === pastHalfHour(currDate) && currDate.getDate() === today.getDate() && currDate.getMonth() === today.getMonth()) {
              cell.classList.add("current-hour");
            }
          }

          row.appendChild(cell);
        }

        weeklyCalendarBody.appendChild(row);
      }
    }
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function pastHalfHour(date) {
  const mins = date.getMinutes();
  if (mins <= 29) {
    return 0;
  } else {
    return 1;
  }
}

const monthlyCalendar = document.getElementById("monthly-calendar");
const weeklyCalendar = document.getElementById("weekly-calendar");
const monthButton = document.getElementById("monthly");
const weeklyButton = document.getElementById("weekly");
const currMonth = document.getElementById("curr-month");
const currWeek = document.getElementById("curr-week");

monthButton.addEventListener('click', () => {
  if (monthlyCalendar.classList.contains("hidden")) {
    monthlyView = true;
    weeklyView = false;
        monthlyCalendar.classList.remove("hidden");
        weeklyCalendar.classList.add("hidden");
    monthButton.classList.add("active-btn");
    weeklyButton.classList.remove("active-btn");
    currMonth.classList.remove("hidden");
        currWeek.classList.add("hidden");
    
      }
});

weeklyButton.addEventListener('click', () => {
  if (weeklyCalendar.classList.contains("hidden")) {
    weeklyView = true;
    monthlyView = false;
        monthlyCalendar.classList.add("hidden");
        weeklyCalendar.classList.remove("hidden");
weeklyButton.classList.add("active-btn");
monthButton.classList.remove("active-btn");
    currMonth.classList.add("hidden");
        currWeek.classList.remove("hidden");
    const { startDate, endDate } = getStartAndEndDateOfWeek(currentDate);
        document.getElementById("curr-week").textContent = `${getMonthName(startDate.getMonth())} ${startDate.getDate()} - ${getMonthName(endDate.getMonth())} ${endDate.getDate()}`;
      }
});
    generateWeeklyCalendar(currentDate);






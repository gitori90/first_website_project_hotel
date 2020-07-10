
const dayNames = ['Sunday', 'Monday', 'Tuesday',
'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const monthNames = ['January', 'February', 'March', 'April',
'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const monthNamesShort = ['Jan', 'Feb', 'Mar',
'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const today = new Date();
var selectedMonth = today.getMonth();
var selectedYear = today.getFullYear();
var reservedDays = [];

const originalCalendarHtml = $(".calendar-wrapper").html();


function formatDateDayMonth(num)
{
  if (num < 10)
  {
    num = "0" + num.toString();
  }

  return num.toString();
}

function idDateFormat(dayStr, monthStr, yearNumber)
{
  return yearNumber.toString() + "-" + monthStr + "-" + dayStr;
  // return dayStr + monthStr + yearNumber.toString()
}

function removeElementFromArray(element, array)
{
  let matchIndex = array.indexOf(element);
  if (matchIndex === -1){}
  else
  {
    array.splice(matchIndex, 1);
  }

  return array
}

function toggleReservedDay(dateID)
{
  if (reservedDays.includes(dateID))
  {
    reservedDays = removeElementFromArray(dateID, reservedDays);
  }
  else
  {
    reservedDays.push(dateID);
  }
}



function assignArrowButtons()
{
  $(".top-left-arrow").on("click", function(){
    $(".calendar-wrapper").html(originalCalendarHtml);
    selectedMonth--;
    if (selectedMonth < today.getMonth())
    {
      selectedMonth = today.getMonth();
    }
    buildMonth(selectedMonth);
  });

  $(".top-right-arrow").on("click", function(){
    $(".calendar-wrapper").html(originalCalendarHtml);
    selectedMonth++;
    buildMonth(selectedMonth);
  });
}



function monthLastDay()
{
  let tempDate = new Date();
  tempDate.setDate(1);
  tempDate.setMonth(selectedMonth);
  var j = 28;
  var monthNumber = selectedMonth % 12;

  tempDate.setDate(j)
  while (tempDate.getMonth() === monthNumber)
  {
    j++;
    tempDate.setDate(j);
  }

  return j - 1;
}



function buildFirstWeek()
{
  let tempDate = new Date();
  tempDate.setDate(1);
  tempDate.setMonth(selectedMonth);
  var firstMonthDay = tempDate.getDay();

  tempDate.setDate(-firstMonthDay);

  let monthNumber = tempDate.getMonth();
  let yearNumber = tempDate.getFullYear();
  let lastDays = tempDate.getDate() + 1;

  for (let l = 0 ; l < firstMonthDay ; l++)
  {
    let dayStr = formatDateDayMonth(lastDays)
    let monthStr = formatDateDayMonth(monthNumber + 1);

    date = idDateFormat(dayStr, monthStr, yearNumber);

    $(".week0").append("<td class='day prevMonth' id="
    + date + ">" + lastDays + "</td>");
    lastDays++;
  }
}

function finishLastWeek(numberDaysLeft, weekNumber)
{
  let tempDate = new Date();
  tempDate.setDate(1);
  tempDate.setMonth(selectedMonth + 1);
  let monthNumber = tempDate.getMonth();
  let yearNumber = tempDate.getFullYear();

  for (let i = 0 ; i < numberDaysLeft ; i++)
  {
    let day = formatDateDayMonth(i + 1);
    let month = formatDateDayMonth(monthNumber + 1);

    date = idDateFormat(day, month, yearNumber);

    $(".week" + weekNumber).append("<td class='day nextMonth' id="
    + date + ">" + (i + 1) + "</td>");
  }
}

function buildMonth(monthNumber)
{
  assignArrowButtons();
  monthNumber = monthNumber % 12;
  var lastMonthDay = monthLastDay();
  var day = 1;
  let tempDate = new Date();
  tempDate.setDate(1);
  tempDate.setMonth(monthNumber);

  var firstMonthDay = tempDate.getDay();

  tempDate.setMonth(selectedMonth);
  selectedYear = tempDate.getFullYear();
  $(".month-label").text(monthNames[monthNumber] + " " + selectedYear);


  for(let j = 0 ; j < 7 ; j++)
  {
    $(".calendar").append("<tr class='week " + "week" +  j + "'></tr>");
    if(j === 0)
    {
      buildFirstWeek();
    }

    for(let i = 0 ; i < 7 ; i++)
    {
      day = formatDateDayMonth(day);
      month = formatDateDayMonth(monthNumber + 1)

      date = idDateFormat(day, month, selectedYear);
      $(".week" +  j).append("<td class='day day-available' "
      + "id=" + date + "><b>" + day + "</b></td>");
      day++;

      if (day > lastMonthDay)
      {
        var numberDaysLeft = 6 - i;
        finishLastWeek(numberDaysLeft, j);
        j = 9; /* to break the outer loop */
        break;
      }

      if ($(".week" + j)[0].cells.length >= 7)
      {
        break;
      }
    }
  }

  for(let i = 0 ; i < reservedDays.length ; i++)
  {
    $("#" + reservedDays[i]).addClass("day-chosen");
  }

  $(".day-available").on("click",
  function(){
    $(this).toggleClass("day-chosen");
    toggleReservedDay(this.id);
  });
}

function insertIDs()
{
  if (reservedDays.length === 0)
  {
    alert("Choose Date(s) to proceed");
    $("#datesForm").attr("method", "");
  }
  else
  {
    $(".datesInput").val(reservedDays);
  }

}

// initiate the calendar upon page loading
buildMonth(selectedMonth);

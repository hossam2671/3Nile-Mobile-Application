
// Convert this -> 17:00 to pm or 05:00 to am 
export function convertToAmPm(timeString) {
    const [hour, minute] = timeString?.split(':');
    let hourInt = parseInt(hour);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
  
    hourInt = hourInt % 12;
    hourInt = hourInt === 0 ? 12 : hourInt;
  
    const formattedTime = `${hourInt}:${minute} ${ampm}`;
    return formattedTime;

  }
export function convertToAmPmFor3NileBus(timeString) {
  const str = timeString;
const separator = ':';

if (str) {
  const a = str.split(separator);
  const hour = a[0];
  const minute = a[1];

  let hourInt = parseInt(hour);
  const ampm = hourInt >= 12 ? 'PM' : 'AM';

  hourInt = hourInt % 12;
  hourInt = hourInt === 0 ? 12 : hourInt;

  const formattedTime = `${hourInt}:${minute} ${ampm}`;
  return formattedTime;

  }}

export function formatTime(utcTimeString) {
    const date = new Date(utcTimeString);
    const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
    return formattedTime;
  }
export function renderMessageTime(timestamp) {
    const messageDate = new Date(timestamp);
    const currentDate = new Date();

    if (
      messageDate.getDate() === currentDate.getDate() - 1 &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear()
    ) {
      return 'Yesterday';
    }
    else if (messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear()){
      return formatTime(messageDate)
    }

    return messageDate.toLocaleDateString();
  }
  

// 

export function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = padNumber(date.getMonth() + 1);
    const day = padNumber(date.getDate());
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  
  function padNumber(number) {
    return number.toString().padStart(2, '0');
  }
  



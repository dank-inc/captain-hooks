function checkForKeyword(chatText, keyword) {
  if (chatText.includes(keyword)) {
    reutrn`Hey! ${keyword} is a bad word. you are bad`;
  } else return;
}

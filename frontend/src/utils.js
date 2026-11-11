export function capitaliseFirstLetter(string) {
  let newString = "";

  if (!string.includes(" ")) {
    return string[0].toUpperCase() + string.slice(1);
  }

  for (const word of string.split(" ")) {
    newString += word[0].toUpperCase() + word.slice(1) + " ";
  }

  return newString.substring(0, newString.length - 1);
}

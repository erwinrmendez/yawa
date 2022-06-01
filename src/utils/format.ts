/**
 * converts string into object of characters with their occurrences
 * @param str (string)
 * @returns {[key: string]: number}
 */
export const toCharObject = (str: string) => {
  let charObject: { [key: string]: number } = {};
  for (let ch of str) {
    charObject[ch] ? charObject[ch]++ : (charObject[ch] = 1);
  }

  return charObject;
};

/**
 * return an object with the correspoding styles given a guess word and a solution
 * @param word (string)
 * @param solution (string)
 * @returns {[key: number]: string}
 */
export const getStyles = (word: string, solution: string) => {
  let charObject = toCharObject(solution); // object of characters with number of occurrences
  let indexes: { [key: string]: number[] } = {}; // object of characters with corresponding indexes in word
  let styles: { [key: number]: string } = {};

  const isCorrectPosition = (i: number) => {
    return solution[i] === word[i];
  };

  for (let i = 0; i < word.length; i++) {
    let ch = word[i];

    if (charObject[ch] !== undefined) {
      // when is at the correct position
      if (isCorrectPosition(i)) {
        styles[i] = "bg-wgreen ";

        // checks to set back to gray previous occurrences where the character
        // is not at the correct position
        if (charObject[ch] === 0) {
          for (let j of indexes[ch]) {
            if (isCorrectPosition(j)) continue;

            styles[j] = "bg-gray-800 ";
            break;
          }
        }

        // when the character is included and there are occurrences left
      } else if (charObject[ch] > 0) {
        styles[i] = "bg-wyellow ";

        // when the character is included but was already accounted for
      } else {
        styles[i] = "bg-gray-800 ";
      }

      // reduce occurrences (keep >= 0)
      charObject[ch] = charObject[ch] === 0 ? 0 : charObject[ch] - 1;
    } else {
      styles[i] = "bg-gray-800 ";
    }

    indexes[ch] = indexes[ch] ? [i, ...indexes[ch]] : [i];
  }

  return styles;
};

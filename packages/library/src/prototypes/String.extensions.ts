/* eslint-disable no-extend-native */

String.prototype.toCapitalisedCase = function (): string {
    const string = this.toString();

    const array = string.split(' ');

    for (let i = 0; i < array.length; i += 1) {
        const word = array[i];

        if (word && word.length > 0) {
            const splitWord = word.split('') as string[];
            splitWord[0] = splitWord[0]!.toUpperCase();
            const newWord = splitWord.join('');
            array[i] = newWord;
        } else {
            array[i] = word as string;
        }
    }

    const newString: string = array.join(' ');
    return newString;
};

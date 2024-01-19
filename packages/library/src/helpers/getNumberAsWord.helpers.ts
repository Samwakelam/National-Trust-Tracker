const units = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
];

const tens = [
    'zero',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
];

const teens = [
    'zero',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
];

const bases = ['unit', 'ten', 'hundred', 'thousand', 'million'];

const resolveTens = (num: string) => {
    const numberArray = num.split('');
    let wordArray = [];

    if (parseInt(numberArray[0]) >= 2) {
        wordArray[0] = tens[parseInt(numberArray[0])];
        wordArray[1] = units[parseInt(numberArray[1])];
    }

    if (parseInt(numberArray[0]) === 1) {
        wordArray[0] = teens[parseInt(numberArray[1])];
    }

    return wordArray.join('-');
};

// ToDO: numbers longer than 4

export const getNumberAsWord = (num: string): string => {
    const length = num.length;

    if (length === 1) {
        return units[parseInt(num)];
    }

    if (length === 2) {
        return resolveTens(num);
    }

    if (length === 3 || length === 4) {
        const numberArray = num.split('').reverse();

        const tens = resolveTens(`${numberArray[1]}${numberArray[0]}`);

        let wordArray = numberArray.map((number, index) => {
            if (index === 2) {
                const base = bases[index];
                const word = units[parseInt(number)];
                return `${word}-${base}-and`;
            }

            if (index > 2) {
                const base = bases[index];
                const word = units[parseInt(number)];
                return `${word}-${base}`;
            }

            return number;
        });

        wordArray.shift();
        wordArray[0] = tens;
        wordArray.reverse();

        return wordArray.join('-');
    }

    return num;
};

export const getMixedStringAsWords = (string: string): string => {
    const containsNumbers = /\d+/g;
    if (containsNumbers.test(string.trim())) {
        const split = string
            .split(/([a-zA-Z]+|[0-9]+)/)
            .filter((item) => item.length > 0);

        const allWords = split.map((item) => {
            // @ts-ignore
            const isNumber = !isNaN(item);

            if (isNumber) {
                const numberAsWord = getNumberAsWord(item);

                return numberAsWord;
            }

            return item;
        });

        return allWords.join('-');
    }
    return string;
};

export type CaseType = 'camel' | 'kebab' | 'sentence' | 'pascal' | 'snake';

export const getSentenceCase = (array: string[]): string => {
    for (let i = 0; i < array.length; i += 1) {
        const word: string | undefined = array[i]?.toLowerCase();
        array[i] = word || '';
    }

    const string = array.join(' ');

    return string;
};

export const getCamelCase = (array: string[]): string => {
    if (array.length > 0) {
        const firstWord = array[0]!.toLowerCase();
        array[0] = firstWord;

        for (let i = 1; i < array.length; i += 1) {
            const word = array[i]?.toLowerCase();
            if (word && word.length > 0) {
                const splitWord = word.split('');
                splitWord[0] = splitWord[0]!.toUpperCase();
                const newWord = splitWord.join('');
                array[i] = newWord;
            } else if (word) {
                array[i] = word;
            }
        }

        const string: string = array.join('');

        return string;
    }
    return '';
};

export const getKebabCase = (array: string[]): string => {
    for (let i = 0; i < array.length; i += 1) {
        const word: string | undefined = array[i];

        const test = /[0-9]/g;

        if (word && test.test(word)) {
            array[i] = word;
        } else if (word) {
            array[i] = word.trim().toLowerCase();
        }
    }

    const string: string = array.join('-');

    return string;
};

export const getSnakeCase = (array: string[]): string => {
    const string: string = array.join('-');

    return string;
};

export const getPascalCase = (array: string[]): string => {
    for (let i = 0; i < array.length; i += 1) {
        const word: string | undefined = array[i];

        if (word && word.length > 0) {
            const splitWord = word.split('');
            splitWord[0] = splitWord[0]!.toUpperCase();
            const newWord = splitWord.join('');
            array[i] = newWord;
        } else if (word) {
            array[i] = word;
        }
    }

    const string: string = array.join('');

    return string;
};

export const getCase = (item: string, type: CaseType): string => {
    const kebabCaseTest = /-+/;
    const snakeCaseTest = /_+/;
    const camelCaseTest = /^[a-z][A-Za-z]*$/;
    const pascalCaseTest = /^[A-Z][A-Za-z]*$/;
    const sentenceCaseTest = /\s/;
    const containsNumbers = /\d+/g;

    let array: string[] = [];

    if (containsNumbers.test(item.trim())) {
        // Splits the item at the numbers
        array = item
            .trim()
            .split(/(\^\d+|[a-zA-Z]+|\d+)/)
            .filter(function (n) {
                return n != '';
            })
            .filter(function (n) {
                return n != ' ';
            });

        let tempArray: string[] = [];

        array.forEach((string, index, object) => {
            if (string.trim().length === 0) {
                object.splice(index, 1);
            } else if (
                kebabCaseTest.test(string.trim()) &&
                string.trim().endsWith('-')
            ) {
                string = string.slice(0, string.length - 1);
            } else if (
                kebabCaseTest.test(string.trim()) &&
                string.trim().startsWith('-')
            ) {
                string = string.slice(1, string.length);
            }

            if (parseInt(string)) {
                tempArray.push(string);
            } else if (type === 'camel' && index > 0) {
                const formattedString = getCase(string.trim(), 'pascal');
                tempArray.push(formattedString);
            } else {
                const formattedString = getCase(string.trim(), type);
                tempArray.push(formattedString);
            }
        });

        switch (type) {
            case 'camel': {
                return tempArray.join('');
            }
            case 'kebab': {
                return tempArray.join('-');
            }
            case 'sentence': {
                return tempArray.join(' ');
            }
        }
    } else if (sentenceCaseTest.test(item.trim())) {
        array = item.split(' ');
    } else if (kebabCaseTest.test(item.trim())) {
        array = item.split('-');
    } else if (pascalCaseTest.test(item.trim())) {
        array = item.split(/(?=[A-Z])/);
    } else if (camelCaseTest.test(item.trim())) {
        array = item.split(/(?=[A-Z])/);
    } else if (snakeCaseTest.test(item.trim())) {
        array = item.split('_');
    } else {
        array.push(item);
    }

    switch (type) {
        case 'camel':
            return getCamelCase(array);

        case 'kebab':
            return getKebabCase(array);

        case 'pascal':
            return getPascalCase(array);

        case 'sentence':
            return getSentenceCase(array);

        case 'snake':
            return getSnakeCase(array);
    }
};

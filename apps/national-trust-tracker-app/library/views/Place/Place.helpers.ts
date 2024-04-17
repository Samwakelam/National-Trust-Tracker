import { getAmountInPence } from '../../helpers';
import { AdmissionCategory, AdmissionPrice } from '../../types/national-trust';

export const resolveCategoriesFromHTML = (html: string) => {
    const removePTagsRegEx = /(?<=<p>)(.*?)(?=<\/p>)/g;
    const sanitisedHTML = html.match(removePTagsRegEx) || [];

    return sanitisedHTML.flatMap((sanitisedCategory) => {
        if (!sanitisedCategory.includes('&pound;')) return [];

        const splitCategoriesRegEx = /()(.*?)(?<=day.)/g;
        const categories =
            sanitisedCategory
                .replace('&nbsp;', ' ')
                .match(splitCategoriesRegEx) || [];

        return categories.flatMap((category): AdmissionCategory | never[] => {
            if (!category) return [];

            const nameRegex = /()(.*?)(?=:)/g;
            const nameMatchArray = category.match(nameRegex);
            const name = nameMatchArray?.join('').trim() || '';

            const admissionsRegex = /(&pound;)(.*?)(?<=(hours|day))/g;
            const admissions = category.match(admissionsRegex);

            const admissionPrices =
                admissions?.map((admission): AdmissionPrice => {
                    const priceRegEx = /(&pound;)[0-9](.[0-9]{2})?/g;
                    const arr = admission.match(priceRegEx) || [];
                    const price = arr[0]?.replace('&pound;', '');

                    const ticketNameRegEx =
                        /(?<=((&pound;)[0-9](.[0-9]{2}))\s|(for)\s)(.*)/g;
                    const ticketArr = admission.match(ticketNameRegEx) || [];

                    const ticketName = ticketArr[0]?.trim();
                    const pence = getAmountInPence(price || '0');

                    return {
                        name: ticketName || 'undefined',
                        standardAmount: {
                            currency: 'GBP',
                            amount: pence,
                        },
                    };
                }) || [];

            return {
                name,
                admissionPrices,
            };
        });
    });
};

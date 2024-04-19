import React from 'react';

type LoremProps = {
    count?: number;
};

export const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mollis nunc sed id semper risus. Cursus euismod quis viverra nibh cras. Nisl pretium fusce id velit. Dignissim enim sit amet venenatis urna cursus eget.';

export const Lorem = ({ count = 1 }: LoremProps) => {
    const array = Array.from({ length: count }, () => loremIpsum);

    return (
        <div
            data-label='lorem-paragraph'
            className='flex flex-col gap-16'
        >
            {array.map((paragraph, index) => (
                <p key={`lorem-text-${index}-${count}`}>{paragraph}</p>
            ))}
        </div>
    );
};

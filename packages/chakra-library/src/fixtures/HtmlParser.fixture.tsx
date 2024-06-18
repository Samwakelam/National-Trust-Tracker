import React from 'react';

import { FixtureBox, HtmlParser } from '../components';

const HtmlParserFixture = () => {
    return (
        <FixtureBox>
            <HtmlParser
                htmlString={`
                    <p>
                        There&#39;s something for everyone at Parke, found on the outskirts of the small market town of Bovey Tracey, gateway to mystical Dartmoor. You can walk from the town (about one mile) or stop off as you drive to the open moor, where the next stop is the rugged crag of Haytor.
                    </p> 
                    <p>
                        This compact estate was once the home of a wealthy local family and probably enabled them to be self-sufficient for all their day-to-day needs with
                    </p> 
                    <ul> 
                        <li>a vegetable garden, fruit garden and orchard</li> 
                    </ul>
                    <ul> 
                        <li>cold&nbsp;house, fish pond, grazing meadows for livestock and beehives for honey</li> 
                    </ul> 
                    <ul> 
                        <li>and gardens to wander in for spiritual refreshment.</li> 
                    </ul> 
                    <p>
                        So, take a short stroll around the garden, or a longer more strenuous walk through the woodlands and along the river to the medieval weir. Along the way, keep your eyes peeled for a myriad of wildlife and a host of wild flowers.
                    </p>
                `}
            />
        </FixtureBox>
    );
};

export default HtmlParserFixture;

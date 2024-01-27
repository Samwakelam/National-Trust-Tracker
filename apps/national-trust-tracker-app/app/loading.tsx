import { Spinner } from '../library/components';
import { Providers } from './providers';

const Loading = () => {
    return (
        <Providers>
            <Spinner isPageSpinner />
        </Providers>
    );
};

export default Loading;

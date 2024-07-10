import { Spinner } from '../library/components/Spinner/Spinner.component';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className='flex flex-row justify-center items-center w-full h-full'>
            <Spinner
                colorScheme='forest'
                size='xl'
            />
        </div>
    );
}

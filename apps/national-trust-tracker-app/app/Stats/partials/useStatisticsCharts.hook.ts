import { getCase } from '../../../library/helpers';
import { InformationType, useVisits } from '../../../library/hooks/useVisits';
import { Visit } from '../../../library/types/internal';

export const useStatisticsCharts = ({
    visits,
    filterByDate,
}: {
    visits: Visit[];
    filterByDate: string;
}) => {
    const { getByMonth, getAll, getByYear } = useVisits({
        visits,
    });

    const data = getAll(filterByDate).statistics;
    const dataByMonth = getByMonth(filterByDate).statistics;
    const dataByYear = getByYear(filterByDate).statistics;

    const labels = Object.keys(filterByDate ? dataByMonth : dataByYear);

    // const options: ChartProps['options'] = {
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             display: true,
    //             position: 'left',
    //         },
    //     },
    // };

    const getData = (key: InformationType) =>
        labels.flatMap((label): number | Record<string, number> | any[] => {
            const stats = filterByDate ? dataByMonth[label] : dataByYear[label];

            if (stats) {
                return stats[key as keyof typeof stats];
            }

            return [];
        });

    const getDatasets = (information: InformationType) =>
        Object.keys(data[information]).map((key) => {
            const _data = getData(information);
            return {
                label: getCase(key, 'sentence').toCapitalisedCase(),
                data: _data.map((item) => {
                    if (item[key]) {
                        return item[key];
                    }
                    return 0;
                }),
            };
        });

    // const assetsChart: ChartProps = {
    //     type: 'bar',
    //     data: {
    //         labels,
    //         datasets: getDatasets('assets'),
    //     },
    //     options,
    // };

    // const facilitiesChart: ChartProps = {
    //     type: 'bar',
    //     data: {
    //         labels,
    //         datasets: getDatasets('facilities'),
    //     },
    //     options,
    // };

    // const placesChart: ChartProps = {
    //     type: 'bar',
    //     data: {
    //         labels,
    //         datasets: getDatasets('places'),
    //     },
    //     options,
    // };

    // const regionsChart: ChartProps = {
    //     type: 'bar',
    //     data: {
    //         labels,
    //         datasets: getDatasets('regions'),
    //     },
    //     options,
    // };

    // const travelChart: ChartProps = {
    //     type: 'bar',
    //     data: {
    //         labels,
    //         datasets: getDatasets('travel'),
    //     },
    //     options,
    // };

    return {
        // assetsChart,
        // facilitiesChart,
        // placesChart,
        // regionsChart,
        // travelChart,
    };
};

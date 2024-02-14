import { getDateKeyFormat } from '../helpers/getDateKeyFormat.helper';
import { Visit } from '../types/internal';

export type InformationType =
    | 'assets'
    | 'facilities'
    | 'people'
    | 'places'
    | 'regions'
    | 'tickets'
    | 'totalPrice'
    | 'totalTickets'
    | 'travel'
    | 'visits';

export type ReduceMapProps = {
    assets: Record<string, number>;
    facilities: Record<string, number>;
    people: Record<string, number>;
    places: Record<string, number>;
    regions: Record<string, number>;
    tickets: Record<string, number>;
    totalPrice: number;
    totalTickets: number;
    travel: Record<string, number>;
    visits: number;
};

export type GetReducedResponse =
    | number
    | ReduceMapProps
    | Record<string, number>;

export const useVisits = ({ visits }: { visits: Visit[] }) => {
    const getReduced = (
        _visits: Visit[],
        filter?: InformationType
    ): GetReducedResponse => {
        const reduceMap: ReduceMapProps = {
            assets: getReducedAssets(_visits),
            facilities: getReducedFacilities(_visits),
            people: getReducedPeople(_visits),
            places: getReducedPlaces(_visits),
            regions: getReducedRegions(_visits),
            tickets: getReducedTickets(_visits),
            totalPrice: getReducedTotalPrice(_visits),
            totalTickets: getReducedTotalTickets(_visits),
            travel: getReducedTravel(_visits),
            visits: _visits.length,
        };

        if (filter) {
            return reduceMap[filter];
        }

        return reduceMap;
    };

    const getStatistics = ({
        by,
        filter,
    }: {
        by?: 'month' | 'year';
        filter?: InformationType;
    }) => {
        const visitStatistics: Record<string, GetReducedResponse> = {};
        if (by && by === 'month') {
            const _visits = getByMonth();

            Object.keys(_visits).forEach((key) => {
                visitStatistics[key] = getReduced(
                    _visits[key] as Visit[],
                    filter
                );
            });
            return visitStatistics;
        }

        if (by && by === 'year') {
            const _visits = getByYear();

            Object.keys(_visits).forEach((key) => {
                visitStatistics[key] = getReduced(
                    _visits[key] as Visit[],
                    filter
                );
            });
            return visitStatistics;
        }

        return getReduced(visits, filter);
    };

    const getByMonth = () => {
        return visits.reduce((prev: Record<string, Visit[]>, visit: Visit) => {
            const key = getDateKeyFormat(visit.date);

            if (Object.keys(prev).includes(key)) {
                prev[key]!.push(visit);
            } else {
                prev[key] = [visit];
            }

            return prev;
        }, {});
    };

    const getByYear = () => {
        return visits.reduce((prev: Record<string, Visit[]>, visit: Visit) => {
            const date = new Date(visit.date);

            const year = date.getFullYear();
            const key = year.toString();

            if (Object.keys(prev).includes(key)) {
                prev[key]!.push(visit);
            } else {
                prev[key] = [visit];
            }

            return prev;
        }, {});
    };

    return {
        getByMonth,
        getByYear,
        getStatistics,
    };
};

const getReducedAssets = (visits: Visit[]) => {
    return visits.reduce((prev: Record<string, number>, visit: Visit) => {
        visit.assetsUsed.map((asset) => {
            const array = asset.name.toLowerCase().split(' ');
            let key = array.join('-');

            if (key.includes('caf')) {
                key = 'café';
            }

            if (Object.keys(prev).includes(key)) {
                // @ts-ignore
                prev[key] = prev[key] + 1;
            } else {
                prev[key] = 1;
            }
        });

        return prev;
    }, {});
};

const getReducedFacilities = (visits: Visit[]) => {
    return visits.reduce((prev: Record<string, number>, visit: Visit) => {
        visit.facilitiesUsed.map((facility) => {
            const array = facility.name.toLowerCase().split(' ');
            let key = array.join('-');

            if (key.includes('caf')) {
                key = 'café';
            }

            if (Object.keys(prev).includes(key)) {
                // @ts-ignore
                prev[key] = prev[key] + 1;
            } else {
                prev[key] = 1;
            }
        });

        return prev;
    }, {});
};

const getReducedPeople = (visits: Visit[]) => {
    return visits.reduce((prev: Record<string, number>, visit: Visit) => {
        const people = visit.people.map((person) => person.name);
        if (people.includes('Sam') && people.includes('Dave')) {
            if (Object.keys(prev).includes('together')) {
                // @ts-ignore
                prev.together = prev.together + 1;
            } else {
                prev.together = 1;
            }
        }

        people.forEach((person) => {
            const array = person.toLowerCase().split(' ');
            const key = array.join('-');

            if (Object.keys(prev).includes(key)) {
                // @ts-ignore
                prev[key] = prev[key] + 1;
            } else {
                prev[key] = 1;
            }
        });

        return prev;
    }, {});
};

const getReducedPlaces = (visits: Visit[]) => {
    return visits.reduce((prev: Record<string, number>, visit: Visit) => {
        const array = visit.place.name.toLowerCase().split(' ');
        const key = array.join('-');

        if (Object.keys(prev).includes(key)) {
            // @ts-ignore
            prev[key] = prev[key] + 1;
        } else {
            prev[key] = 1;
        }

        return prev;
    }, {});
};

const getReducedRegions = (visits: Visit[]) => {
    return visits.reduce((prev: Record<string, number>, visit: Visit) => {
        const array = visit.place.location.region.toLowerCase().split(' ');
        const key = array.join('-');

        if (Object.keys(prev).includes(key)) {
            // @ts-ignore
            prev[key] + 1;
        } else {
            prev[key] = 1;
        }

        return prev;
    }, {});
};

const getReducedTotalPrice = (visits: Visit[]): number => {
    return visits.reduce((total: number, visit: Visit) => {
        return total + visit.totalPrice;
    }, 0);
};

const getReducedTotalTickets = (visits: Visit[]): number => {
    return visits.reduce((total: number, visit: Visit) => {
        visit.tickets.forEach((ticket) => {
            total = total + ticket.qty;
        });

        return total;
    }, 0);
};

const getReducedTickets = (visits: Visit[]) => {
    return visits.reduce((prev: Record<string, number>, visit: Visit) => {
        visit.tickets.map((ticket) => {
            const array = ticket.name.toLowerCase().split(' ');
            let key = array.join('-');

            if (Object.keys(prev).includes(key)) {
                // @ts-ignore
                prev[key] = prev[key] + ticket.qty;
            } else {
                prev[key] = ticket.qty;
            }
        });

        return prev;
    }, {});
};

const getReducedTravel = (visits: Visit[]) => {
    return visits.reduce((prev: Record<string, number>, visit: Visit) => {
        visit.travel.map((vehicle) => {
            const array = vehicle.toLowerCase().split(' ');
            let key = array.join('-');

            if (Object.keys(prev).includes(key)) {
                // @ts-ignore
                prev[key] = prev[key] + 1;
            } else {
                prev[key] = 1;
            }
        });

        return prev;
    }, {});
};

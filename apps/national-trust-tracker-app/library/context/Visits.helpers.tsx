import { getCase } from '../helpers';
import { getDateKeyFormat } from '../helpers/getDateKeyFormat.helper';
import { Visit } from '../types/internal';

// MARK: Type

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

// MARK: Get Reduced

export const getReduced = (visits: Visit[]): ReduceMapProps => {
    const reduceMap = {
        assets: getReducedAssets(visits),
        facilities: getReducedFacilities(visits),
        people: getReducedPeople(visits),
        places: getReducedPlaces(visits),
        regions: getReducedRegions(visits),
        tickets: getReducedTickets(visits),
        totalPrice: getReducedTotalPrice(visits),
        totalTickets: getReducedTotalTickets(visits),
        travel: getReducedTravel(visits),
        visits: visits.length,
    };

    return reduceMap;
};

// MARK: Month
export const getReducedByMonth = (visits: Visit[]) => {
    return visits
        .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            if (dateA === dateB) return 0;
            if (dateA > dateB) return 1;
            if (dateA < dateB) return -1;
            return 0;
        })
        .reduce((prev: Record<string, Visit[]>, visit: Visit) => {
            const key = getDateKeyFormat(visit.date);

            if (Object.keys(prev).includes(key)) {
                prev[key]!.push(visit);
            } else {
                prev[key] = [visit];
            }

            return prev;
        }, {});
};

// MARK: Year
export const getReducedByYear = (visits: Visit[]) => {
    return visits
        .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            if (dateA === dateB) return 0;
            if (dateA > dateB) return 1;
            if (dateA < dateB) return -1;
            return 0;
        })
        .reduce((prev: Record<string, Visit[]>, visit: Visit) => {
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

// MARK: Specificity
export const getReducedSpecificity = (_visits: Record<string, Visit[]>) => {
    const visitStatistics: Record<string, ReduceMapProps> = {};
    Object.keys(_visits).forEach((key) => {
        visitStatistics[key] = getReduced(_visits[key] as Visit[]);
    });
    return visitStatistics;
};

// MARK: Assets
const getReducedAssets = (visits: Visit[]) => {
    return visits.reduce((prev: Record<string, number>, visit: Visit) => {
        visit.assetsUsed.map((asset) => {
            const name = asset.name.toLowerCase().split('|')[0]!.trim();

            let key: string = getCase(name, 'kebab');

            if (key.includes('caf')) {
                key = 'café';
            }

            if (key.includes('plant-shop')) {
                key = 'plant-shop';
            }

            if (key.includes('coffee-shop')) {
                key = 'coffee-shop';
            }

            if (key.includes('garden')) {
                key = 'garden';
            }

            if (Object.keys(prev).includes(key)) {
                prev[key] = (prev[key] || 0) + 1;
            } else {
                prev[key] = 1;
            }
        });

        return prev;
    }, {});
};

export const getReducedFacilities = (visits: Visit[]) => {
    return visits.reduce((prev: Record<string, number>, visit: Visit) => {
        visit.facilitiesUsed.map((facility) => {
            const name = facility.name.toLowerCase().split('|')[0]!.trim();

            let key: string = getCase(name, 'kebab');

            if (key.includes('caf')) {
                key = 'café';
            }

            if (key.includes('plant-shop')) {
                key = 'plant-shop';
            }

            if (key.includes('coffee-shop')) {
                key = 'coffee-shop';
            }

            if (key.includes('garden')) {
                key = 'garden';
            }

            if (Object.keys(prev).includes(key)) {
                prev[key] = (prev[key] || 0) + 1;
            } else {
                prev[key] = 1;
            }
        });

        return prev;
    }, {});
};

// MARK: People
export const getReducedPeople = (visits: Visit[]) => {
    return visits.reduce((prev: Record<string, number>, visit: Visit) => {
        const people = visit.people.map((person) => person.name);

        if (people.includes('Sam') && people.includes('Dave')) {
            if (Object.keys(prev).includes('together')) {
                prev.together = (prev.together || 0) + 1;
            } else {
                prev.together = 1;
            }
        }

        people.forEach((person) => {
            const key = person.trim().toLowerCase();
            if (!key) return;
            if (Object.keys(prev).includes(key)) {
                prev[key] = (prev[key] || 0) + 1;
            } else {
                prev[key] = 1;
            }
        });

        return prev;
    }, {});
};

// MARK: Places
export const getReducedPlaces = (visits: Visit[]) => {
    return visits.reduce((prev: Record<string, number>, visit: Visit) => {
        const array = visit.place.name.toLowerCase().split(' ');
        const key = array.join('-');

        if (Object.keys(prev).includes(key)) {
            prev[key] = (prev[key] || 0) + 1;
        } else {
            prev[key] = 1;
        }

        return prev;
    }, {});
};

// MARK: Regions
export const getReducedRegions = (visits: Visit[]) => {
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

// MARK: Total Price
export const getReducedTotalPrice = (visits: Visit[]): number => {
    return visits.reduce((total: number, visit: Visit) => {
        return total + visit.totalPrice;
    }, 0);
};

// MARK: Total Tickets
export const getReducedTotalTickets = (visits: Visit[]): number => {
    return visits.reduce((total: number, visit: Visit) => {
        visit.tickets.forEach((ticket) => {
            total = total + ticket.qty;
        });

        return total;
    }, 0);
};

// MARK: Tickets
export const getReducedTickets = (visits: Visit[]) => {
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

// MARK: Travel
export const getReducedTravel = (visits: Visit[]) => {
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

import { IconType } from 'react-icons';
import {
    AccessibilityDogs,
    AccessibilityRamp,
    AccessibleFoodOutlet,
    AccessibleParking,
    AccessibleRoute,
    AccessibleShop,
    AccessibleToilet,
    AccessibleVehicle,
    Bicycle,
    BookShop,
    Braille,
    Bus,
    Cafe,
    CarPark,
    ChargingPoint,
    CoffeeShop,
    Dogs,
    DropOff,
    Ferry,
    Foot,
    GuidedTour,
    InductionLoop,
    Kiosk,
    LargePrint,
    LevelAccess,
    Map,
    NarrowCorridor,
    NationalTrust,
    PhotographAlbum,
    PlantShop,
    Restaurant,
    Road,
    Seating,
    Shop,
    Steps,
    TeaRoom,
    Toilet,
    Train,
    Underground,
    VirtualTour,
    Weddings,
    Wheelchair,
} from '../icons';

export type NationalTrustType =
    | 'nt'
    | 'nt-acc-dogs'
    | 'nt-acc-food-outlet'
    | 'nt-acc-park'
    | 'nt-acc-ramp'
    | 'nt-acc-route'
    | 'nt-acc-shop'
    | 'nt-acc-toilet'
    | 'nt-acc-vehicle'
    | 'nt-bicycle'
    | 'nt-book-shop'
    | 'nt-braille'
    | 'nt-bus'
    | 'nt-cafe'
    | 'nt-car-park'
    | 'nt-charging-point'
    | 'nt-coffee-shop'
    | 'nt-dogs'
    | 'nt-drop-off'
    | 'nt-ferry'
    | 'nt-foot'
    | 'nt-guided-tour'
    | 'nt-induction-loop'
    | 'nt-kiosk'
    | 'nt-large-print'
    | 'nt-level-access'
    | 'nt-map'
    | 'nt-narrow-corridor'
    | 'nt-photograph-album'
    | 'nt-plant-shop'
    | 'nt-restaurant'
    | 'nt-road'
    | 'nt-seating'
    | 'nt-shop'
    | 'nt-steps'
    | 'nt-tea-room'
    | 'nt-toilet'
    | 'nt-train'
    | 'nt-underground'
    | 'nt-virtual-tour'
    | 'nt-weddings'
    | 'nt-wheelchair';

export const nationalTrustMap: { [key in NationalTrustType]: IconType } = {
    'nt': NationalTrust,
    'nt-acc-dogs': AccessibilityDogs,
    'nt-acc-food-outlet': AccessibleFoodOutlet,
    'nt-acc-park': AccessibleParking,
    'nt-acc-ramp': AccessibilityRamp,
    'nt-acc-route': AccessibleRoute,
    'nt-acc-shop': AccessibleShop,
    'nt-acc-toilet': AccessibleToilet,
    'nt-acc-vehicle': AccessibleVehicle,
    'nt-bicycle': Bicycle,
    'nt-book-shop': BookShop,
    'nt-braille': Braille,
    'nt-bus': Bus,
    'nt-cafe': Cafe,
    'nt-car-park': CarPark,
    'nt-charging-point': ChargingPoint,
    'nt-coffee-shop': CoffeeShop,
    'nt-dogs': Dogs,
    'nt-drop-off': DropOff,
    'nt-ferry': Ferry,
    'nt-foot': Foot,
    'nt-guided-tour': GuidedTour,
    'nt-induction-loop': InductionLoop,
    'nt-kiosk': Kiosk,
    'nt-large-print': LargePrint,
    'nt-level-access': LevelAccess,
    'nt-map': Map,
    'nt-narrow-corridor': NarrowCorridor,
    'nt-photograph-album': PhotographAlbum,
    'nt-plant-shop': PlantShop,
    'nt-restaurant': Restaurant,
    'nt-road': Road,
    'nt-seating': Seating,
    'nt-shop': Shop,
    'nt-steps': Steps,
    'nt-tea-room': TeaRoom,
    'nt-toilet': Toilet,
    'nt-train': Train,
    'nt-underground': Underground,
    'nt-virtual-tour': VirtualTour,
    'nt-weddings': Weddings,
    'nt-wheelchair': Wheelchair,
};

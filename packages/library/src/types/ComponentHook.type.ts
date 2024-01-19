type EventHandler<
    E extends React.SyntheticEvent<any, Event>,
    D extends Record<string, unknown>,
> = (data: D, event: E, callback: () => void) => void;

export interface ComponentHook<
    S extends Record<string, unknown>,
    H extends Record<string, EventHandler<any, any>>,
> {
    state: S;
    handlers: H;
}

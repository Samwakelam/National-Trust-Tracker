type ActionError = {
    status: number;
    message: 'Error';
    error: any;
};

type ActionSuccess = {
    status: number;
    message: 'Success';
    data: any;
};

export type ActionResponse = ActionError | ActionSuccess;

import { NextResponse } from 'next/server';

import { getMembership } from '../../../../actions/Membership.actions';

type ParametersProps = { params: { groupName: string } };

export async function GET(request: Request, { params }: ParametersProps) {
    const groupName = params.groupName;

    const action = await getMembership(groupName);

    return action;
}

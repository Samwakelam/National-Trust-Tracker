import { NextResponse } from 'next/server';

import { postMemberships } from '../../../actions/Membership.actions';

export async function POST(request: Request) {
    const body = await request.json();

    const action = await postMemberships(body);

    return action;
}

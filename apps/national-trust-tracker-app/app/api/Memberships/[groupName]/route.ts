import { NextResponse } from 'next/server';
import { getDatabaseConnection } from '../../../../library/helpers';
import MembershipsModel from '../../../../library/models/Memberships.model';

type ParametersProps = { params: { groupName: string } };

export const getMembership = async (groupName: string) => {
    await getDatabaseConnection();

    try {
        //@ts-ignore - unsure
        const data = await MembershipsModel.findOne({ groupName });

        return NextResponse.json({
            status: 200,
            message: 'Success',
            data,
        });
    } catch (error) {
        console.log('Membership By GroupName route GET error:', error);
        return NextResponse.json({
            status: 404,
            message: 'Error',
            error,
        });
    }
};

export async function GET(request: Request, { params }: ParametersProps) {
    const groupName = params.groupName;
    return await getMembership(groupName);
}

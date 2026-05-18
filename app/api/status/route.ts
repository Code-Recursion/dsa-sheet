import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            message: `Server is up ${new Date()}`,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "server is down",
            },
            {
                status: 500,
            }
        );
    }
}
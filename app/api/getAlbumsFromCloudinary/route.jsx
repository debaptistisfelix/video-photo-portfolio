import cloudinary from 'cloudinary';
export const dynamic = 'force-dynamic';

export async function GET(request) {
        try {
            const albums = await cloudinary.v2.api.root_folders();

            return new Response(JSON.stringify(albums), {status: 200})
        } catch (error) {
            console.log(error);
            return new Response(JSON.stringify("Error while fetching Albums"), {status: 500})
        }
};
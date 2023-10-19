import {PrismaClient} from '@prisma/client'
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request){
    try{
        const allPlaylists = await prisma.playlist.findMany({
            include: {
                youtubeVideos: true
            }
        });
        console.log(allPlaylists);
    
        request.headers.set('Cache-Control', 'no-store');

        return new Response(JSON.stringify(allPlaylists), {status: 200})
    } catch(error){
        console.log(error)
        return new Response(JSON.stringify("Error while fetching Playlists"), {status: 500})
    }
}

export async function POST(request){
    const body = await request.json();
    const {title, bannerImg, instagramUrl, youtubeUrl, tiktokUrl, youtubeVideos} = body;
 
    if(!title || !bannerImg || !youtubeUrl ){
        return new Response(JSON.stringify("Please provide all details"), {status: 400})
     }
 
     try{
         const newPlaylist = await prisma.playlist.create({
             data: {
                 title,
                 bannerImg,
                instagramUrl,
                 youtubeUrl,
                 tiktokUrl,
               }
         });
        
 
         request.headers.set('Cache-Control', 'no-store');
 
         return new Response(JSON.stringify(newPlaylist), {status: 200})
     } catch(error){
         console.log(error)
         return new Response(JSON.stringify("Error while creating Playlists"), {status: 500})
     }
}
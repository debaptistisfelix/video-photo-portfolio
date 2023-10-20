import { PrismaClient } from "@prisma/client";
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request, {params}) {
    const {playlistId} = params;

    console.log(playlistId)

    if(!playlistId){
        return new Response(JSON.stringify("Please provide all details"), {status: 400})
    }

    try{
        const youtubeVideos = await prisma.youtubeVideo.findMany({
            where: {
                playlistId
            }   
        })
        return new Response(JSON.stringify(youtubeVideos), {status: 200})
    }
    catch(error){
        return new Response(JSON.stringify("Error while fetching Playlist Videos"), {status: 500})
    }
}

export async function POST(request, {params}) {
    const {playlistId} = params;
    const body = await request.json();
    const {youtubeVideoId, title, duration, thumbnail, link} = body;
    console.log("body: ", body)
    console.log("playlistId: ", playlistId)
   
    if(!playlistId){
        return new Response(JSON.stringify("Please provide all details"), {status: 400})
    }

    try{
        const createdYoutubeVideo = await prisma.youtubeVideo.create({
            data: {
              youtubeVideoId,
              title,
              duration,
              thumbnail,
              link,
              playlist: {
                connect: {
                  id: playlistId,
                },
              },
            },
          });

          console.log("createdYoutubeVideo: ", createdYoutubeVideo)

          request.headers.set('Cache-Control', 'no-store');

        return new Response(JSON.stringify(createdYoutubeVideo), {status: 200})
    }
    catch(error){
        console.log(error)
        return new Response(JSON.stringify("Error while creating Playlist Videos"), {status: 500})
    }
}
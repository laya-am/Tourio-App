import Place from "../../../db/models/Place";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();
  if(request.method === "GET"){
    const places= await Place.find();
    return response.status(200).json(places);
  }
  if(request.method === "POST"){
    try {
      const placeData= request.body;
      const newPlace= new Place(placeData);
      await newPlace.save();
      return response.status(201).json({status: "data posted"})
    } catch (error) {
      console.log(error);
      return response.status(400).json({error: error.message})
    }
  }
  return response.status(405).json({ message: "Method not allowed" });
}

import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  const { id } = request.query;
  if (request.method === "GET"){
    const place= await Place.findById(id);
    return response.status(200).json(place);
  }
  if(request.method === "PATCH"){
    const placeToEdit = await Place.findByIdAndUpdate(id, {$set: request.body,});
    return response.status(200).json(placeToEdit);
  }
  if(request.method === "DELETE"){
    const placeToDelete = await Place.findByIdAndDelete(id, {$set: request.body,});
    return response.status(200).json(placeToDelete);
  }
  // if (!id) {
  //   return ;
  // }
  return response.status(404).json({ status: 'Not found' });
};
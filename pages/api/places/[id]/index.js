import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  const { id } = request.query;
  const place= await Place.findById(id);

  if (!id) {
    return ;
  }

  if (!place) {
    return response.status(404).json({ status: 'Not found' });
  }

  response.status(200).json(place);
}

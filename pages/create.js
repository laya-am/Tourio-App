import Link from 'next/link.js';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Form from '../components/Form.js';
import { StyledLink } from '../components/StyledLink.js';
import useSWR from "swr";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const places = useSWR("/api/places");

  const router = useRouter();

  async function addPlace(newPlace) {
    const response = await fetch("/api/places", {
      method: "POST",
      body: JSON.stringify(newPlace),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log({response});

    if(response.ok){
      await response.json();
      places.mutate();
      // event.target.reset();
    }else{
      console.error(`Error: ${response.status}`)
    }
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={addPlace} formName={'add-place'} />
    </>
  );
}

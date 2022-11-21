import { memo } from "..";

export async function getStaticProps() {
  // Call an external API endpoint to get data.
  // You can use any data fetching library
  console.log("we retrieved JSON file from REST API at build time");
  const data = memo(
    "countries",
    "https://raw.githubusercontent.com/alan-ws/random-json-store/main/country_iso.json"
  );

  // By returning { props: { countries } }, the Home component
  // will receive `countries` as a prop at build time
  return {
    props: {
      data,
    },
  };
}

export default function Home({
  countries,
}: {
  countries: { name: string; code: string }[];
}) {
  return (
    <div>
      {countries.map((value: { name: string; code: string }, index: number) => {
        return (
          <div key={index}>
            <h1>{value.name}</h1>
            <h2>{value.code}</h2>
          </div>
        );
      })}
    </div>
  );
}

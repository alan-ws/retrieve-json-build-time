export async function memo(key: string, url: string) {
  let cache: Record<string, any> = {};

  console.log(cache)

  if (key in cache) {
    console.log("it was cached");
    return JSON.parse(cache[key]);
  }

  console.log("fetched first time");
  const res = await fetch(url);
  const data = await res.json();
  cache[key] = JSON.stringify(data);

  return data;
}

export async function getStaticProps() {
  // Call an external API endpoint to get data.
  // You can use any data fetching library
  const data = await memo(
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
  data,
}: {
  data: { name: string; code: string }[];
}) {
  return (
    <div>
      {data.map((value: { name: string; code: string }, index: number) => {
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

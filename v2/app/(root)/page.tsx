import SearchForm from "../../components/SearchForm";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  return (
    <div>
      <div>
        <section className="pink_container pattern">
          <h1 className="heading">
            Pitch Your Startup, <br /> Connect with Entreprenuers
          </h1>
          <p className="sub-heading !max-w-3xl">
            Submit Innovations, Vote on Pitches, and get Noticed
          </p>

          <SearchForm query={query} />
        </section>
      </div>
    </div>
  );
};

export default Home;

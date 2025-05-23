import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";
import { client } from "@/sanity/lib/client";
import { StartupTypeCard } from "@/components/StartupCard";
import { auth } from "@/auth";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;

  const params = { search: query || null };

  const session = await auth();

  console.log(session?.id);

  const posts = await client.fetch(STARTUPS_QUERY, params);

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

        <section className="section_container">
          <p className="text-30-semibold">
            {query ? `Search results for "${query}"` : `All Startups`}
          </p>

          <ul className="mt-7 card_grid">
            {posts?.length > 0 ? (
              posts.map((post: StartupTypeCard) => (
                <StartupCard key={post?._id} post={post} />
              ))
            ) : (
              <p className="no-results">No startups found</p>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;

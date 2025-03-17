import SearchForm from "@/components/SearchForm";
//import StartupCard from "@/components/StartupCard";

/*interface StartupCardType {
  _createdAt: Date;
  views: number;
  author: { _id: number; name: string };
  _id: number;
  description: string;
  image: string;
  category: string;
  title: string;
}*/

/*const posts = [
  {
    _createdAt: new Date(),
    views: 100,
    author: { _id: 1, name: "John Doe" },
    _id: 1,
    description: "This is a startup idea",
    image:
      "https://ausmed-images.s3.ap-southeast-2.amazonaws.com/ausmed.com/ausmed-articles/20191127_cover_v2.1.jpg",
    category: "robotss",
    title: "Startup Idea",
  },
];*/

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semi-bold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>
        {/*<ul className="mt-7 class_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>*/}
      </section>
    </>
  );
}

import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;

  const posts = [
    {
      _id: "post_661fae4a123abc", // Example unique ID for the post
      title: "Exploring the Maasai Mara",
      category: "Travel",
      description:
        "A detailed guide to planning your safari adventure in Kenya's famous Maasai Mara National Reserve.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMMp6wpigyp3jhVkW6RHNiHMzuca9-B3BMuQ&s", // Example image path/URL
      views: 1250,
      author: {
        _id: "author_1a2b3c",
        name: "Shadi", // Example unique ID for the author
      },
      _createdAt: new Date(), // Example ISO 8601 timestamp
    },
    {
      _id: "post_661fae4a456def",
      title: "Nairobi's Tech Scene: A Deep Dive",
      category: "Technology",
      description:
        "An overview of the rapidly growing technology and startup ecosystem in Nairobi, Kenya.",
      image:
        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F852192569%2F272798929277%2F1%2Foriginal.20240917-115010?crop=focalpoint&fit=crop&w=450&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=2e4c7a28e0291c711cf7883521a848cd",
      views: 875,
      author: {
        _id: "author_4d5e6f",
        name: "Shadi",
      },
      _createdAt: new Date(),
    },
    {
      _id: "post_661fae4a789ghi",
      title: "Best Coffee Shops in Nairobi",
      category: "Food & Drink",
      description:
        "Discover the top spots to enjoy Kenyan coffee and relax in Nairobi.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTubl60h8T8hecgYsKY1_YWeijQALuAZMjeuQ&s",
      views: 2130,
      author: {
        _id: "author_1a2b3c",
        name: "Shadi", // Same author as the first post, for example
      },
      _createdAt: new Date(),
    },
  ];

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
              posts.map((post: StartupCardType) => (
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

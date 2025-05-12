// app/(root)/startup/[id]/page.tsx

import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Markdownit from "markdown-it";
import { parse } from "path";

type PageProps = {
  params: {
    id: string;
  };
};

const md = new Markdownit();
const Page = async ({ params }: PageProps) => {
  const { id } = params;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  const {
    title,
    description,
    image,
    author,
    views,
    pitch,
    _createdAt,
    category,
  } = post;

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(_createdAt)}</p>
        <h1 className="heading">{title}</h1>
        <p className="sub-heading !max-w-5xl">{description}</p>
      </section>

      <section className="section_container">
        <img src={image} alt={title} className="w-full h-auto rounded-xl" />
      </section>

      <div className="space-y-5 mt-10 max-w-4xl mx-auto">
        <div className="flex-between gap-5">
          <Link
            href={`/user/${author?._id}`}
            className="flex gap-2 items-center mb-3"
          >
            <Image
              src={author?.image}
              alt="avatar"
              width={64}
              height={64}
              className="rounded-full drop-shadow-lg"
            />

            <div>
              <p className="text-20-medium">{author?.name}</p>
              <p className="text-16-medium !text-black-300">
                @{author?.username}
              </p>
            </div>
          </Link>
          <p className="category-tag">{category}</p>
        </div>
        <h3 className="text-30-bold">Pitch Details</h3>
        {parsedContent ? (
          <article
            className="prose max-w-4xl font-work-sans break-all"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        ) : (
          <p className="no-result">No details provided</p>
        )}
      </div>
    </>
  );
};

export default Page;

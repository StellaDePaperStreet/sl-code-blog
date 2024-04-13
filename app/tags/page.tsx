import { cn, getAllTags, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";
import { posts } from "#site/content";
import { Tag } from "@/components/tag";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tags",
  description: "Les sujets que j'ai abordé sur mon blog",
};

export default async function TagsPage() {
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block titre text-4xl lg:text-5xl">Tags</h1>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-3">
        {sortedTags?.map((tag) => (
          <Tag tag={tag} count={tags[tag]} key={tag} />
        ))}
      </div>
      {/*BOUTON A SUPPRIMER - UNIQUEMENT POUR TEST LE REVEAL*/}
      <div className="pt-8 flex flex-col gap-4 justify-center sm:flex-row">
        <Link
          href="/reveal"
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full sm:w-fit font-bold dark:hover:bg-[#FFFCDB] cursor-[url(/star-yellow.cur), _pointer]"
          )}
        >
          Voir le reveal
        </Link>
      </div>
      {/*BOUTON A SUPPRIMER - UNIQUEMENT POUR TEST LE REVEAL*/}
    </div>
  );
}

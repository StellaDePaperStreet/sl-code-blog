import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/post-item";
import PostImage from "@/components/post-image";
import { ProfileForm } from "@/components/newsletter-form";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:pt-32">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="titre pb-8 text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            La comptable qui voulait devenir developpeuse
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl">
            Sois le témoin de l&apos;odyssée palpitante d&apos;une comptable qui
            se lance le défi de devenir développeuse Freelance.
          </p>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl">
            Suis mes aventures, depuis l&apos;apprentissage des langages et des
            outils, jusqu&apos;à la création de ma première application, en
            passant par tous les questionnements qui vont se présenter à moi sur
            le chemin de l&apos;entrepreneuriat.
          </p>

          <div className="pt-8 flex flex-col gap-4 justify-center sm:flex-row">
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-fit font-bold dark:hover:bg-[#FFFCDB]"
              )}
            >
              Voir mon blog
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-fit"
              )}
            >
              {" "}
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section className="flex justify-center container max-w-4xl">
        <div className="flex fit-content px-12 border-b">
          <PostImage
            imageUrl={"/img/stellaNB-lucy.png"}
            altText={`Image d'illustration`}
            width={480}
            height={480}
          />
        </div>
      </section>
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-30">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl titre text-center ">
          Derniers posts
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => (
            <li key={post.slug} className="first:border-t first:border-border">
              <PostItem
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                image={post.image as string}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-30">
        <ProfileForm></ProfileForm>
      </section>
    </>
  );
}

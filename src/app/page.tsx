import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CoinsIcon,
  FileTextIcon,
  ImageIcon,
  ShieldIcon,
  WalletIcon,
  ReceiptIcon,
  AirVentIcon,
  Spline,PersonStanding
} from "lucide-react";

const actionCards: Array<{
  title: string;
  href: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}> = [
  {
    title: "Transfer BTC",
    href: "/transfer-btc",
    description: "Easily transfer BTC to any other BTC wallet.",
    icon: <WalletIcon className="size-12" />,
  },
  {
    title: "Transfer Note Tokens",
    href: "/transfer-note",
    description: "Easily transfer Note N20 tokens to any other Note wallet.",
    icon: <ReceiptIcon className="size-12" />,
  },
  {
    title: "Mint an NFT",
    href: "/mint-nft",
    description:
      "Allow anyone to claim a digital collectible from a Collection.",
    icon: <ImageIcon className="size-12" />,
  },
  {
    title: "Get Drops",
    href: "/airdrop",
    description:
      "Allow anyone to claim a Free Airdrop N20 Tokens.",
    icon: <AirVentIcon className="size-12" />,
  },
  {
    title: "Buy Note Assets on DEX",
    href: "/buy-assets",
    description:
      "Allow anyone to buy Note Assets on DEX via onclick.",
    icon: <Spline className="size-12" />,
  },
  {
    title: "Join SNS and Game",
    href: "/account",
    description:
      "Join Social network and game, pay and get items",
    icon: <PersonStanding className="size-12" />,
  },
];

export default async function Pages() {
  return (
    <>
      <section
        id="features"
        className={
          "container space-y-12 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        }
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Example Bitcoin/Note Actions
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project contains examples code snippets for creating Note
            Actions.
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {actionCards.map((item, key) => (
            <Link key={key} href={item.href} className="group">
              <Card className="group-hover:border-primary">
                <CardHeader>
                  <CardTitle className="space-y-3">
                    {item.icon}
                    <span className="block font-bold group-hover:text-pretty">
                      {item.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            You can find the{" "}
            <Button variant={"link"} asChild>
              <Link href={siteConfig.links.github} target="_blank">
                full source code
              </Link>
            </Button>{" "}
            for this entire repo on GitHub.
          </p>
        </div>
      </section>

      {/* <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Taxonomy is open source and powered by open source software. <br />{" "}
            The code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{" "}
          </p>
        </div>
      </section> */}
    </>
  );
}

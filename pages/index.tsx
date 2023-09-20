import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="italic opacity-75">Click the link below</h1>
      <Link href="/photos" className="text-xl">
        Photos
      </Link>
      <Link href="/news" className="text-xl">
        News
      </Link>
      <Link href="/events" className="text-xl">
        Events
      </Link>
    </div>
  );
}

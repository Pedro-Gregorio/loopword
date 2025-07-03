import ExternalLink from "@/components/ExternalLink";
import GameSection from "@/components/GameSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-1 flex flex-col items-center justify-center max-md:min-h-screen py-12">
        <h1 className="text-4xl font-black">LoopWord</h1>
        <p className="mt-2 text-sm">
          It&apos;s like Wordle, but you can play{" "}
          <span className="font-bold italic">forever</span>.
        </p>
        <GameSection />
      </main>
      <footer className="py-6 md:py-12 border-t border-gray-700 max-md:text-center">
        <div className="px-12 md:px-24 flex flex-col items-center space-y-6 md:flex-row md:justify-between md:items-start md:space-y-0">
          <div className="flex flex-col space-y-2">
            <p className="font-bold">LoopWord</p>
            <p className="text-sm">
              Made with love and curiosity by{" "}
              <ExternalLink
                href="https://pedrogregor.io"
                text="Pedro Gregório"
              />{" "}
              ❤️
            </p>
            <p className="text-sm">
              Want the sauce?{" "}
              <ExternalLink
                href="https://github.com/Pedro-Gregorio/loopword"
                text="GitHub"
              />
            </p>
          </div>
          <div className="flex flex-col space-y-2 md:text-right">
            <p className="text-sm">Other projects by me:</p>
            <ExternalLink
              href="https://loopcost.app?ref=loopword"
              text="LoopCost"
            />
            <ExternalLink
              href="https://tubemod.dev?ref=loopword"
              text="TubeMod"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

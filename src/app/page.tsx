import Title from "@/components/title";
import GetPersonButton from "@/components/getPersonButton";

export default function Home() {
  return (
    <section className="flex-grow px-4 py-4 text-white rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <Title />
        <div className="mt-24 w-4/5 max-w-4xl">
          <h1 className="text-2xl font-bold mb-4">
            Welcome!{" "}
            <span className="text-lg text-gray-300 mb-4">
              Here, you can explore and{" "}
              <span className="text-yellow-600">
                learn about remarkable women from history, as well as share
                stories about inspiring women in your own life.{" "}
              </span>
              Our site has three sections:
            </span>
          </h1>

          <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
            <li>
              <strong>Home</strong>: Discover a randomly selected historical
              figure with a short intro generated by Gemini AI. Add her to your{" "}
              <strong>Archive</strong> by marking her.
            </li>
            <li>
              <strong>Archive</strong>: Your personal space for saved figures
              you’d like to learn more about.
            </li>
            <li>
              <strong>Her Nearby</strong>: Browse and share stories about
              everyday women. One story per user per day to keep the quality
              high!
            </li>
          </ul>
        </div>
        <GetPersonButton />
      </div>
    </section>
  );
}

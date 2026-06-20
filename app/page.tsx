import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500">
          CampusConnect
        </h1>

        <div className="flex gap-4">
          <Link href="/login">
            <button className="px-5 py-2 border border-gray-700 rounded-lg hover:bg-gray-900">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
              Register
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-6xl font-bold mb-6">
          Connect With Students.
        </h1>

        <h1 className="text-6xl font-bold text-blue-500 mb-6">
          Build Projects Together.
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mb-10">
          Find teammates, showcase skills, collaborate on real-world
          projects, and grow your professional network inside your campus.
        </p>

        <div className="flex gap-4">
          <Link href="/register">
            <button className="px-8 py-4 bg-blue-600 rounded-xl text-lg hover:bg-blue-700">
              Get Started
            </button>
          </Link>

          <Link href="/students">
            <button className="px-8 py-4 border border-gray-700 rounded-xl text-lg hover:bg-gray-900">
              Explore Students
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-10 pb-20">
        <div className="p-8 border border-gray-800 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Student Profiles
          </h2>

          <p className="text-gray-400">
            Showcase skills, projects, achievements and interests.
          </p>
        </div>

        <div className="p-8 border border-gray-800 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Project Matching
          </h2>

          <p className="text-gray-400">
            Find teammates with skills you need.
          </p>
        </div>

        <div className="p-8 border border-gray-800 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Campus Networking
          </h2>

          <p className="text-gray-400">
            Build connections before internships and placements.
          </p>
        </div>
      </section>
    </main>
  );
}
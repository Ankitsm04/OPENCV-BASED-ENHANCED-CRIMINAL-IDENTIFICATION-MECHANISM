export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900 text-white min-h-screen">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-42 pb-32 text-center">

        <div className="inline-block bg-blue-600/20 text-blue-400 px-4 py-1 rounded-full text-sm mb-6">
          Capstone Research Project
        </div>

        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Robust Face Matching
          <span className="block text-blue-500">
            Under Occlusion & Low Lighting
          </span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          A controlled identity recognition system designed for academic
          research. Supports multi-view dataset training and similarity-based
          facial matching even with partial occlusion and low lighting conditions.
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="/dataset"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium transition shadow-lg"
          >
            Get Started
          </a>

          <a
            href="/ethics"
            className="border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-lg font-medium transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <h2 className="text-3xl font-bold text-center mb-16">
          System Workflow
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-blue-500 transition">
            <h3 className="text-xl font-semibold mb-3">1️⃣ Upload Dataset</h3>
            <p className="text-gray-400 text-sm">
              Provide structured ZIP dataset with 3 images per person:
              Front, Left and Right views.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-blue-500 transition">
            <h3 className="text-xl font-semibold mb-3">2️⃣ Validate Structure</h3>
            <p className="text-gray-400 text-sm">
              System verifies dataset integrity and required image format before training.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-blue-500 transition">
            <h3 className="text-xl font-semibold mb-3">3️⃣ Train Model</h3>
            <p className="text-gray-400 text-sm">
              Deep learning extracts facial embeddings from multi-view data.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-blue-500 transition">
            <h3 className="text-xl font-semibold mb-3">4️⃣ Predict & Match</h3>
            <p className="text-gray-400 text-sm">
              Upload a test image and compute similarity against trained embeddings.
            </p>
          </div>

        </div>
      </section>

      {/* TRAINING REQUIREMENTS SECTION */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-8">
            Training Requirements
          </h2>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <ul className="space-y-4 text-gray-400 text-left">
              <li>✔ Minimum 3 images per person (Front, Left, Right)</li>
              <li>✔ Clear lighting and minimal blur</li>
              <li>✔ Consistent image resolution</li>
              <li>✔ Controlled dataset (Academic use only)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        © 2026 VisionID — Academic Capstone Project
      </footer>

    </div>
  );
}
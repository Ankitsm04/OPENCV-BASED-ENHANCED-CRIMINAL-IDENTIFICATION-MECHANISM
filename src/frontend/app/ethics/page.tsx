export default function EthicsPage() {
  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Ethics & Responsible Use
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            This project demonstrates facial recognition under occlusion
            for academic research purposes. Ethical considerations are
            fundamental in AI-based identity systems.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="space-y-10">

          {/* Privacy */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              🔐 Privacy Protection
            </h2>
            <p className="text-gray-400 leading-relaxed">
              This system operates only on a controlled dataset created for
              academic evaluation. No real-world criminal databases or
              government surveillance data are used. All datasets are
              user-provided and processed locally for research demonstration.
            </p>
          </div>

          {/* Bias Awareness */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              ⚖ Bias & Fairness Awareness
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Facial recognition systems may exhibit bias depending on the
              diversity and distribution of training data. This project does
              not claim demographic fairness and is intended solely as a
              technical proof-of-concept.
            </p>
          </div>

          {/* Responsible Usage */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              🧪 Research Purpose Only
            </h2>
            <p className="text-gray-400 leading-relaxed">
              This capstone project is developed strictly for educational and
              research evaluation. It is not deployed in public environments
              and should not be used for law enforcement, surveillance, or
              real-world identity verification without proper legal and
              ethical authorization.
            </p>
          </div>

          {/* Disclaimer Block */}
          <div className="bg-yellow-600/10 border border-yellow-600/30 p-6 rounded-2xl text-yellow-400 text-center">
            ⚠ Disclaimer: This system demonstrates similarity-based face
            matching under occlusion scenarios for academic learning only.
            It does not identify criminals or perform real-world surveillance.
          </div>

        </div>

      </div>
    </div>
  );
}
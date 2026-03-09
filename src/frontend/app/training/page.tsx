"use client";

import { useState, useEffect } from "react";
import { trainModel } from "../lib/api";

export default function TrainingPage() {

  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Idle");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {

    let interval: ReturnType<typeof setInterval>;

    if (isTraining && progress < 90) {

      interval = setInterval(() => {

        setProgress((prev) => prev + 4);

        if (progress < 30) {
          setStatus("Preparing dataset...");
        } 
        else if (progress < 60) {
          setStatus("Extracting facial embeddings...");
        } 
        else {
          setStatus("Generating identity vectors...");
        }

      }, 800);

    }

    return () => clearInterval(interval);

  }, [isTraining, progress]);


  const startTraining = async () => {

    try {

      setCompleted(false);
      setProgress(0);
      setIsTraining(true);
      setStatus("Starting training...");

      const res = await trainModel();

      setProgress(100);
      setStatus(`Training completed. Identities trained: ${res.identities}`);

      setCompleted(true);

    } catch (error) {

      console.error(error);
      setStatus("Training failed");

    } finally {

      setIsTraining(false);

    }

  };


  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen text-white px-6 py-20">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">

          <h1 className="text-4xl font-bold mb-4">
            Model Training
          </h1>

          <p className="text-gray-400">
            Train the facial recognition model using the uploaded dataset.
          </p>

        </div>


        {/* CARD */}
        <div className="bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-xl text-center">


          {/* STATUS */}
          <p className="text-lg mb-6 text-gray-300">
            {status}
          </p>


          {/* PROGRESS BAR */}
          {(isTraining || completed) && (

            <div className="mb-8">

              <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">

                <div
                  className="h-4 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />

              </div>

              <p className="text-sm text-gray-400 mt-2">
                {progress}% Complete
              </p>

            </div>

          )}


          {/* BUTTON */}
          <button
            onClick={startTraining}
            disabled={isTraining}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg transition disabled:opacity-50 shadow-lg"
          >

            {isTraining ? "Training..." : "Start Training"}

          </button>


          {/* SUCCESS MESSAGE */}
          {completed && (

            <div className="mt-8 p-6 bg-green-600/10 border border-green-600/30 rounded-xl text-green-400">

              ✅ Training completed successfully.  
              You can now proceed to face prediction.

            </div>

          )}

        </div>

      </div>

    </div>
  );
}
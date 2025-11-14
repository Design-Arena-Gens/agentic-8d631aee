'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DeerEcosystem() {
  const [stage, setStage] = useState(0);
  const [seeds, setSeeds] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [plants, setPlants] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isSwimming, setIsSwimming] = useState(false);

  const stages = [
    {
      title: "हिरण: 80 किमी/घंटा की रफ्तार से भागने वाला स्तनपायी",
      description: "हिरण जंगल में सुबह की कोमल रोशनी में घूम रहा है",
      scene: "forest"
    },
    {
      title: "भोजन की तलाश",
      description: "हिरण झाड़ियों से बाहर आकर घास, पत्ते, फूल और फल खाता है",
      scene: "feeding"
    },
    {
      title: "बीज फैलाना",
      description: "पौधों के बीच घूमते समय बीज उसके शरीर से चिपक जाते हैं और जमीन पर गिर जाते हैं",
      scene: "seeds"
    },
    {
      title: "बीज से पौधे",
      description: "ये बीज आगे चलकर नए पौधों का रूप ले लेते हैं",
      scene: "growth"
    },
    {
      title: "तैराकी की कला",
      description: "हिरण तैराकी में बहुत अच्छा है और पानी पार करके जंगल का विस्तार करता है",
      scene: "swimming"
    }
  ];

  useEffect(() => {
    if (stage === 2) {
      const timer = setTimeout(() => {
        const newSeeds = Array.from({ length: 8 }, (_, i) => ({
          id: i,
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20
        }));
        setSeeds(newSeeds);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (stage === 3) {
      const timer = setTimeout(() => {
        setPlants(seeds.map((seed, i) => ({ ...seed, id: i + 100 })));
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (stage === 4) {
      setIsSwimming(true);
    }
  }, [stage, seeds]);

  const nextStage = () => {
    if (stage < stages.length - 1) {
      setStage(stage + 1);
    } else {
      setStage(0);
      setSeeds([]);
      setPlants([]);
      setIsSwimming(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50 overflow-hidden">
      {/* Header */}
      <div className="bg-green-800 text-white py-6 px-8 shadow-lg">
        <h1 className="text-4xl font-bold text-center">🦌 हिरण और पर्यावरण</h1>
        <p className="text-center mt-2 text-green-100">जंगल के विस्तार में हिरण की भूमिका</p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <h2 className="text-3xl font-bold text-green-800 mb-3">{stages[stage].title}</h2>
          <p className="text-xl text-gray-700 mb-6">{stages[stage].description}</p>

          {/* Scene Area */}
          <div className="relative h-[400px] bg-gradient-to-b from-blue-100 to-green-200 rounded-xl overflow-hidden border-4 border-green-600">

            {/* Background Elements */}
            {stage !== 4 && (
              <>
                <div className="absolute bottom-0 w-full h-1/3 bg-green-700 opacity-30" />
                <div className="absolute top-10 left-10 text-6xl">🌳</div>
                <div className="absolute top-20 right-20 text-5xl">🌲</div>
                <div className="absolute top-32 left-1/4 text-4xl">🌿</div>
                <div className="absolute bottom-20 right-1/3 text-5xl">🌳</div>
              </>
            )}

            {/* Swimming Scene */}
            {stage === 4 && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-500 opacity-60" />
                <div className="absolute bottom-0 w-full h-1/2 bg-blue-600 opacity-40" />
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
                    animate={{
                      x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                      y: [Math.random() * 100 + '%', Math.random() * 100 + '%']
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                  >
                    💧
                  </motion.div>
                ))}
                {/* Banks with trees */}
                <div className="absolute left-0 top-0 h-full w-1/5 bg-green-700 opacity-40">
                  <div className="absolute top-10 left-2 text-4xl">🌳</div>
                  <div className="absolute top-32 left-5 text-3xl">🌲</div>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/5 bg-green-700 opacity-40">
                  <div className="absolute top-20 right-2 text-4xl">🌳</div>
                  <div className="absolute top-40 right-5 text-3xl">🌲</div>
                </div>
              </>
            )}

            {/* Sun */}
            <motion.div
              className="absolute top-8 right-8 text-6xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              🌅
            </motion.div>

            {/* Deer Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                className="absolute text-8xl"
                initial={
                  stage === 4
                    ? { left: '10%', top: '50%', scale: 0.8 }
                    : { left: '5%', top: '50%' }
                }
                animate={
                  stage === 0
                    ? {
                        left: ['5%', '30%', '50%', '30%', '5%'],
                        top: ['50%', '45%', '55%', '50%', '50%']
                      }
                    : stage === 1
                    ? { left: '40%', top: '55%', rotate: [0, -10, 0] }
                    : stage === 2
                    ? {
                        left: ['40%', '60%', '80%'],
                        top: ['55%', '50%', '45%']
                      }
                    : stage === 3
                    ? { left: '70%', top: '45%' }
                    : {
                        left: ['10%', '50%', '85%'],
                        top: '50%',
                        scale: [0.8, 0.9, 0.8]
                      }
                }
                transition={{ duration: stage === 0 ? 8 : stage === 4 ? 4 : 3, repeat: stage === 0 ? Infinity : 0 }}
              >
                🦌
              </motion.div>
            </AnimatePresence>

            {/* Food Items for Feeding Stage */}
            {stage === 1 && (
              <div className="absolute left-1/3 top-2/3">
                <motion.div
                  className="flex gap-4 text-4xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span>🌾</span>
                  <span>🍃</span>
                  <span>🌸</span>
                  <span>🍎</span>
                </motion.div>
              </div>
            )}

            {/* Seeds */}
            <AnimatePresence>
              {stage >= 2 && seeds.map((seed) => (
                <motion.div
                  key={seed.id}
                  className="absolute text-3xl"
                  initial={{ opacity: 0, scale: 0, x: '40%', y: '55%' }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    left: `${seed.x}%`,
                    top: `${seed.y}%`
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  🌰
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Plants */}
            <AnimatePresence>
              {stage >= 3 && plants.map((plant) => (
                <motion.div
                  key={plant.id}
                  className="absolute text-5xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    left: `${plant.x}%`,
                    top: `${plant.y}%`
                  }}
                  transition={{ duration: 1.5 }}
                >
                  🌱
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Speed Indicator */}
            {stage === 0 && (
              <motion.div
                className="absolute top-4 left-4 bg-red-600 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                ⚡ 80 किमी/घंटा
              </motion.div>
            )}

            {/* Area Expansion Indicator */}
            {stage === 4 && (
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
              >
                🌳 जंगल का विस्तार हो रहा है 🌳
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => {
                if (stage > 0) {
                  setStage(stage - 1);
                  if (stage === 4) setIsSwimming(false);
                }
              }}
              disabled={stage === 0}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              ⬅️ पीछे
            </button>
            <button
              onClick={nextStage}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              {stage < stages.length - 1 ? 'आगे ➡️' : '🔄 फिर से शुरू करें'}
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {stages.map((_, i) => (
              <div
                key={i}
                className={`h-3 w-12 rounded-full transition-colors ${
                  i === stage ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
            <div className="text-5xl mb-3 text-center">💨</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">तेज रफ्तार</h3>
            <p className="text-gray-600 text-center">हिरण 80 किमी/घंटा की रफ्तार से भाग सकता है</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
            <div className="text-5xl mb-3 text-center">🌱</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">बीज फैलाना</h3>
            <p className="text-gray-600 text-center">हिरण के शरीर से बीज चिपककर नए स्थानों पर फैलते हैं</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
            <div className="text-5xl mb-3 text-center">🏊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">तैराकी</h3>
            <p className="text-gray-600 text-center">हिरण अच्छा तैराक है और पानी पार कर जंगल बढ़ाता है</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-green-800 text-white py-6 px-8 mt-12">
        <p className="text-center text-lg">
          🌍 हिरण प्रकृति का एक महत्वपूर्ण हिस्सा है और पर्यावरण संतुलन में मदद करता है 🌍
        </p>
      </div>
    </div>
  );
}

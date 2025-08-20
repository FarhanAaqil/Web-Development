"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function ResearchPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
          >
            Research & Publications
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Exploring the intersection of artificial intelligence, machine learning, and healthcare through academic
            research and innovation.
          </motion.p>
        </div>
      </section>

      {/* Main Research */}
      <section className="py-24 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Featured Publication
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              My contribution to the field of AI-driven healthcare solutions
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
              <div className="md:flex">
                <div className="md:w-2/5 bg-gradient-to-br from-emerald-600 to-teal-600 p-10 flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-20 bg-pattern-grid"></div>
                  <div className="text-9xl text-white z-10">🩺</div>
                </div>

                <div className="md:w-3/5 p-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 shadow-sm">
                      Machine Learning
                    </Badge>
                    <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 shadow-sm">
                      Healthcare
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 shadow-sm">
                      Data Analysis
                    </Badge>
                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 shadow-sm">
                      Predictive Modeling
                    </Badge>
                  </div>

                  <h3 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                    Diabetes Prediction System Using Machine Learning
                  </h3>

                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <p>Journal of Advancement in Parallel Computing</p>
                    <p>Volume 08, Issue 02, 2025</p>
                    <p>HBRP Publication Pvt. Ltd.</p>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
                    This research paper presents a comprehensive approach to predicting diabetes using machine learning
                    algorithms. The study employs Logistic Regression and Decision Tree models to analyze various health
                    parameters and predict the likelihood of diabetes with 78% accuracy. The research demonstrates the
                    potential of AI-driven healthcare solutions for early disease detection and prevention.
                  </p>

                  <Link href="#abstract">
                    <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-700/20 transition-all duration-300">
                      Read Abstract
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Abstract */}
      <section id="abstract" className="py-24 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                Abstract
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto"></div>
            </div>

            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-900/50 p-8 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
              <p className="mb-4">
                Diabetes is a chronic metabolic disorder characterized by elevated blood glucose levels, affecting
                millions of people worldwide. Early detection and intervention are crucial for managing the disease and
                preventing complications. This research proposes a machine learning-based approach for predicting
                diabetes risk using readily available health parameters.
              </p>

              <p className="mb-4">
                The study utilizes a dataset comprising various health metrics including glucose levels, BMI, age, blood
                pressure, and insulin levels. Two machine learning algorithms, Logistic Regression and Decision Trees,
                were implemented and evaluated for their predictive performance. The models were trained on 70% of the
                dataset and tested on the remaining 30%.
              </p>

              <p className="mb-4">
                The Logistic Regression model achieved an accuracy of 78%, while the Decision Tree model achieved 76%
                accuracy. The models were evaluated using a confusion matrix, precision, recall, and F1-score metrics.
                Feature importance analysis revealed that glucose level, BMI, and age were the most significant
                predictors of diabetes risk.
              </p>

              <p>
                The proposed system demonstrates the potential of machine learning in healthcare for early disease
                detection. The models can be integrated into clinical decision support systems to assist healthcare
                providers in identifying high-risk individuals who may benefit from preventive interventions. Future
                work will focus on improving model accuracy through ensemble methods and incorporating additional health
                parameters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Methodology
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              The approach and techniques used in the research study
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-xl bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-emerald-700 dark:text-emerald-400">
                    <span className="mr-3 text-3xl">📊</span> Data Collection & Preprocessing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3 text-xl">•</span>
                      <span>Dataset of 768 individuals with 8 health parameters</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3 text-xl">•</span>
                      <span>Handling missing values using mean imputation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3 text-xl">•</span>
                      <span>Feature scaling using standardization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3 text-xl">•</span>
                      <span>Train-test split (70:30 ratio)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3 text-xl">•</span>
                      <span>Exploratory data analysis to identify patterns and correlations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-700 dark:text-purple-400">
                    <span className="mr-3 text-3xl">🧠</span> Model Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 text-xl">•</span>
                      <span>Logistic Regression with L2 regularization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 text-xl">•</span>
                      <span>Decision Tree with max depth of 5</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 text-xl">•</span>
                      <span>Hyperparameter tuning using grid search</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 text-xl">•</span>
                      <span>Cross-validation with 5 folds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-3 text-xl">•</span>
                      <span>Implementation using scikit-learn in Python</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-cyan-700 dark:text-cyan-400">
                    <span className="mr-3 text-3xl">📈</span> Evaluation Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 text-xl">•</span>
                      <span>Accuracy: 78% (Logistic Regression), 76% (Decision Tree)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 text-xl">•</span>
                      <span>Precision: 0.75, Recall: 0.72</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 text-xl">•</span>
                      <span>F1-Score: 0.73</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 text-xl">•</span>
                      <span>Confusion Matrix Analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 text-xl">•</span>
                      <span>ROC curve and AUC score evaluation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-700 dark:text-amber-400">
                    <span className="mr-3 text-3xl">🔍</span> Feature Importance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3 text-xl">•</span>
                      <span>Glucose Level: 35% importance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3 text-xl">•</span>
                      <span>BMI: 22% importance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3 text-xl">•</span>
                      <span>Age: 18% importance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3 text-xl">•</span>
                      <span>Blood Pressure: 12% importance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3 text-xl">•</span>
                      <span>Other parameters: 13% combined importance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Future Research */}
      <section className="py-24 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Future Research Directions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Exploring new avenues and improvements for the next phase of research
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 p-8 rounded-xl shadow-xl border border-emerald-100 dark:border-emerald-900/10"
              >
                <h3 className="text-xl font-bold mb-4 text-emerald-700 dark:text-emerald-400 flex items-center">
                  <span className="mr-3 text-3xl">🔬</span> Enhanced Prediction Models
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Exploring ensemble methods and deep learning approaches to improve prediction accuracy beyond the
                  current 78%. Investigating neural networks, random forests, and gradient boosting techniques for more
                  robust models.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-xl shadow-xl border border-purple-100 dark:border-purple-900/10"
              >
                <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-400 flex items-center">
                  <span className="mr-3 text-3xl">📊</span> Expanded Dataset
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Incorporating additional health parameters and lifestyle factors to create a more comprehensive
                  prediction model. Including genetic markers, family history, and environmental factors for a holistic
                  approach.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-8 rounded-xl shadow-xl border border-amber-100 dark:border-amber-900/10"
              >
                <h3 className="text-xl font-bold mb-4 text-amber-700 dark:text-amber-400 flex items-center">
                  <span className="mr-3 text-3xl">⌚</span> Real-time Monitoring
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Developing a system for continuous health monitoring and risk assessment using wearable technology.
                  Creating mobile applications that integrate with fitness trackers and medical devices for real-time
                  data collection and analysis.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl shadow-xl border border-blue-100 dark:border-blue-900/10"
              >
                <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400 flex items-center">
                  <span className="mr-3 text-3xl">🔮</span> Advanced Analytics
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Leveraging advanced analytics techniques to enhance the predictive capabilities of the diabetes
                  prediction system. This includes the use of more sophisticated algorithms and the integration of
                  real-time data feeds for dynamic risk assessment.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

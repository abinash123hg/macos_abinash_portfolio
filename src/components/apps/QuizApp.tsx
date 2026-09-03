import React, { useState, useEffect, useMemo } from 'react';
import { 
  Brain, 
  Sparkles, 
  Network, 
  Database, 
  CheckCircle2, 
  XCircle, 
  RotateCw, 
  Trophy, 
  Award, 
  ChevronRight, 
  ArrowLeft, 
  Share2, 
  BarChart3,
  HelpCircle,
  Zap,
  Check
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';
import confetti from 'canvas-confetti';

export interface RawQuestion {
  id: number;
  section: 'ml' | 'gnn' | 'rag';
  sectionTitle: string;
  question: string;
  correctAnswer: string;
  distractors: string[];
  explanation: string;
}

export const QUIZ_QUESTIONS: RawQuestion[] = [
  // Section 1: Machine Learning (10)
  {
    id: 1,
    section: 'ml',
    sectionTitle: 'Machine Learning',
    question: 'What does ROC-AUC measure?',
    correctAnswer: 'Ability to distinguish between classes',
    distractors: ['Training speed', 'Model complexity', 'Number of features'],
    explanation: 'ROC-AUC evaluates how well a classifier distinguishes between positive and negative classes across all classification thresholds.'
  },
  {
    id: 2,
    section: 'ml',
    sectionTitle: 'Machine Learning',
    question: 'Which technique helps prevent overfitting?',
    correctAnswer: 'Regularization',
    distractors: ['Increasing learning rate', 'Removing validation set', 'Using only training data'],
    explanation: 'Regularization techniques (L1/L2 weight penalties, Dropout) constrain model complexity to improve generalization on unseen data.'
  },
  {
    id: 3,
    section: 'ml',
    sectionTitle: 'Machine Learning',
    question: 'What is data leakage?',
    correctAnswer: 'Using future information in training',
    distractors: ['Losing rows during cleaning', 'Missing values in dataset', 'High variance in features'],
    explanation: 'Data leakage happens when target or future information that is not available at test time is inadvertently included during training.'
  },
  {
    id: 4,
    section: 'ml',
    sectionTitle: 'Machine Learning',
    question: 'Which metric is best for imbalanced classification?',
    correctAnswer: 'Precision-Recall / F1',
    distractors: ['Accuracy', 'Mean Squared Error', 'R-squared'],
    explanation: 'Accuracy is misleading on skewed datasets. Precision-Recall and F1 score give a balanced measure of performance on the minority class.'
  },
  {
    id: 5,
    section: 'ml',
    sectionTitle: 'Machine Learning',
    question: 'What does cross-validation help estimate?',
    correctAnswer: 'Model generalization performance',
    distractors: ['Feature importance only', 'Exact production accuracy', 'Database size'],
    explanation: 'K-Fold cross-validation partitions data to estimate how effectively a machine learning model generalizes to independent unseen datasets.'
  },
  {
    id: 6,
    section: 'ml',
    sectionTitle: 'Machine Learning',
    question: 'Feature scaling is most important for which algorithm?',
    correctAnswer: 'K-Nearest Neighbors / SVM',
    distractors: ['Decision Trees', 'Random Forest', 'Naive Bayes'],
    explanation: 'Distance-based algorithms (KNN, SVM, K-Means) compute Euclidean or geometric distances and are strongly biased if features have unequal scales.'
  },
  {
    id: 7,
    section: 'ml',
    sectionTitle: 'Machine Learning',
    question: 'What is the main goal of feature engineering?',
    correctAnswer: 'Create better input representations',
    distractors: ['Reduce model size', 'Remove all categorical variables', 'Increase training epochs'],
    explanation: 'Feature engineering isolates and creates relevant predictive signals from raw domain data to facilitate model learning.'
  },
  {
    id: 8,
    section: 'ml',
    sectionTitle: 'Machine Learning',
    question: 'Which ensemble method builds trees sequentially?',
    correctAnswer: 'Gradient Boosting',
    distractors: ['Random Forest', 'Bagging', 'Extra Trees'],
    explanation: 'Boosting constructs trees sequentially, where each consecutive tree is fitted to minimize the pseudo-residuals of preceding estimators.'
  },
  {
    id: 9,
    section: 'ml',
    sectionTitle: 'Machine Learning',
    question: 'What does a high bias model usually indicate?',
    correctAnswer: 'Underfitting',
    distractors: ['Overfitting', 'Perfect fit', 'Data leakage'],
    explanation: 'High bias arises from oversimplified assumptions, preventing the algorithm from capturing complex underlying patterns in the training data.'
  },
  {
    id: 10,
    section: 'ml',
    sectionTitle: 'Machine Learning',
    question: 'Which library is most commonly used for classical ML in Python?',
    correctAnswer: 'Scikit-Learn',
    distractors: ['TensorFlow', 'PyTorch', 'Keras'],
    explanation: 'Scikit-learn is the standard Python package for classical supervised/unsupervised machine learning, preprocessing, and model evaluation.'
  },

  // Section 2: GNN – Graph Neural Networks (10)
  {
    id: 11,
    section: 'gnn',
    sectionTitle: 'Graph Neural Networks (GNN)',
    question: 'What is the core idea of a Graph Neural Network?',
    correctAnswer: 'Learn from graph structure and node features',
    distractors: ['Process sequential text only', 'Replace all CNNs', 'Work only on images'],
    explanation: 'GNNs simultaneously leverage graph connectivity (relational topology) and node/edge attributes to learn expressive embeddings.'
  },
  {
    id: 12,
    section: 'gnn',
    sectionTitle: 'Graph Neural Networks (GNN)',
    question: 'In a GNN, what does message passing do?',
    correctAnswer: 'Aggregates information from neighboring nodes',
    distractors: ['Sends emails between users', 'Shuffles the dataset', 'Normalizes labels'],
    explanation: 'Message passing iteratively computes, transmits, and aggregates state representations across connected neighboring graph nodes.'
  },
  {
    id: 13,
    section: 'gnn',
    sectionTitle: 'Graph Neural Networks (GNN)',
    question: 'Which of these is a popular GNN architecture?',
    correctAnswer: 'Graph Convolutional Network (GCN)',
    distractors: ['ResNet-50', 'YOLO', 'BERT'],
    explanation: 'Graph Convolutional Network (GCN) is the seminal architecture that approximates spectral graph convolutions with first-order localized filters.'
  },
  {
    id: 14,
    section: 'gnn',
    sectionTitle: 'Graph Neural Networks (GNN)',
    question: 'What kind of data is best suited for GNNs?',
    correctAnswer: 'Data with relationships (social, molecules, knowledge graphs)',
    distractors: ['Only tabular CSV', 'Only images', 'Only audio'],
    explanation: 'GNNs excel when relational topologies and complex interconnectivities between entities contain valuable predictive signals.'
  },
  {
    id: 15,
    section: 'gnn',
    sectionTitle: 'Graph Neural Networks (GNN)',
    question: 'What is a common aggregation function in GNNs?',
    correctAnswer: 'Mean, Sum, or Max of neighbor features',
    distractors: ['Softmax only', 'Random sampling', 'One-hot encoding'],
    explanation: 'Permutation-invariant functions such as Sum, Mean, and Max aggregate neighbor node features without depending on arbitrary neighbor ordering.'
  },
  {
    id: 16,
    section: 'gnn',
    sectionTitle: 'Graph Neural Networks (GNN)',
    question: 'Over-smoothing in deep GNNs means:',
    correctAnswer: 'Node representations become too similar',
    distractors: ['Model becomes too accurate', 'Training becomes faster', 'Graph becomes denser'],
    explanation: 'Over-smoothing occurs when stacking many GNN layers leads to repeated feature averaging, making node representations collapse into identical vectors.'
  },
  {
    id: 17,
    section: 'gnn',
    sectionTitle: 'Graph Neural Networks (GNN)',
    question: 'Which library is widely used for Graph Neural Networks?',
    correctAnswer: 'PyTorch Geometric / DGL',
    distractors: ['Scikit-Learn only', 'OpenCV', 'NLTK'],
    explanation: 'PyTorch Geometric (PyG) and Deep Graph Library (DGL) provide high-performance sparse GPU operations and standard layers for GNN research.'
  },
  {
    id: 18,
    section: 'gnn',
    sectionTitle: 'Graph Neural Networks (GNN)',
    question: 'Node classification is a common GNN task. What does it predict?',
    correctAnswer: 'Labels for individual nodes',
    distractors: ['Edges only', 'Image pixels', 'Time series values'],
    explanation: 'Node classification predicts semantic categories or target variables for individual nodes given a partially annotated graph.'
  },
  {
    id: 19,
    section: 'gnn',
    sectionTitle: 'Graph Neural Networks (GNN)',
    question: 'What is a knowledge graph?',
    correctAnswer: 'A graph of entities and their relationships',
    distractors: ['A type of decision tree', 'A neural network layer', 'A database index'],
    explanation: 'Knowledge graphs store structured collections of real-world entities (nodes) and their directed semantic relationships (edges).'
  },
  {
    id: 20,
    section: 'gnn',
    sectionTitle: 'Graph Neural Networks (GNN)',
    question: 'Graph Attention Networks (GATs) improve GCNs by:',
    correctAnswer: 'Learning attention weights for neighbors',
    distractors: ['Removing all neighbors', 'Using only random features', 'Ignoring node features'],
    explanation: 'GATs incorporate self-attention layers so that nodes dynamically assign higher weights to more relevant neighbors during message aggregation.'
  },

  // Section 3: RAG – Retrieval-Augmented Generation (10)
  {
    id: 21,
    section: 'rag',
    sectionTitle: 'Retrieval-Augmented Generation (RAG)',
    question: 'What is the main purpose of RAG?',
    correctAnswer: 'Combine retrieval of external knowledge with generation',
    distractors: ['Train models from scratch faster', 'Replace all embeddings', 'Only do classification'],
    explanation: 'RAG bridges parametric generative models with authoritative, up-to-date external non-parametric retrieval stores.'
  },
  {
    id: 22,
    section: 'rag',
    sectionTitle: 'Retrieval-Augmented Generation (RAG)',
    question: 'In RAG, what is usually stored in the vector database?',
    correctAnswer: 'Embeddings of document chunks',
    distractors: ['Raw PDF files only', 'Model weights', 'User passwords'],
    explanation: 'Vector databases store semantic high-dimensional embeddings generated from chunked document text alongside source metadata.'
  },
  {
    id: 23,
    section: 'rag',
    sectionTitle: 'Retrieval-Augmented Generation (RAG)',
    question: 'What problem does RAG help reduce in LLMs?',
    correctAnswer: 'Hallucinations by grounding answers in retrieved documents',
    distractors: ['Training time', 'GPU memory', 'Dataset size'],
    explanation: 'Grounding LLM generation in verified, retrieved source excerpts dramatically curbs hallucinations and enables factual citations.'
  },
  {
    id: 24,
    section: 'rag',
    sectionTitle: 'Retrieval-Augmented Generation (RAG)',
    question: 'What is chunking in RAG?',
    correctAnswer: 'Splitting documents into smaller pieces for embedding',
    distractors: ['Deleting documents', 'Merging all texts into one', 'Encrypting data'],
    explanation: 'Chunking breaks long documents into semantically coherent, manageable pieces that fit within embedding models and LLM context windows.'
  },
  {
    id: 25,
    section: 'rag',
    sectionTitle: 'Retrieval-Augmented Generation (RAG)',
    question: 'Which of these is a common embedding model use-case in RAG?',
    correctAnswer: 'Converting text into dense vectors',
    distractors: ['Training CNNs', 'Compressing images', 'Generating random numbers'],
    explanation: 'Embedding models map textual content to dense coordinate spaces where cosine proximity reflects semantic similarity.'
  },
  {
    id: 26,
    section: 'rag',
    sectionTitle: 'Retrieval-Augmented Generation (RAG)',
    question: 'Hybrid retrieval in RAG usually means:',
    correctAnswer: 'Combining dense (vector) + sparse (keyword) retrieval',
    distractors: ['Using only keyword search', 'Using only one document', 'Ignoring embeddings'],
    explanation: 'Hybrid retrieval combines semantic dense embeddings (vector cosine distance) with keyword-exact sparse representations (BM25).'
  },
  {
    id: 27,
    section: 'rag',
    sectionTitle: 'Retrieval-Augmented Generation (RAG)',
    question: 'What is the role of the retriever in RAG?',
    correctAnswer: 'Find relevant documents/chunks',
    distractors: ['Generate the final answer', 'Fine-tune the LLM', 'Clean the dataset'],
    explanation: 'The retriever queries indexed databases to identify and fetch the top-k most pertinent knowledge passages for a user query.'
  },
  {
    id: 28,
    section: 'rag',
    sectionTitle: 'Retrieval-Augmented Generation (RAG)',
    question: 'Grounding in RAG means:',
    correctAnswer: 'Connecting the generated answer to retrieved sources',
    distractors: ['Training on more GPUs', 'Removing all context', 'Using random documents'],
    explanation: 'Grounding validates that generative assertions directly reflect and reference evidence from verified retrieval context passages.'
  },
  {
    id: 29,
    section: 'rag',
    sectionTitle: 'Retrieval-Augmented Generation (RAG)',
    question: 'Which of these is a typical RAG pipeline step order?',
    correctAnswer: 'Chunk → Embed → Store → Retrieve → Generate',
    distractors: ['Generate → Retrieve → Embed', 'Train → Deploy → Delete', 'Only Generate'],
    explanation: 'The standard RAG lifecycle partitions documents into chunks, embeds them, indexes into a vector store, retrieves matches on query, and generates answers.'
  },
  {
    id: 30,
    section: 'rag',
    sectionTitle: 'Retrieval-Augmented Generation (RAG)',
    question: 'Why is citation important in RAG systems?',
    correctAnswer: 'It shows the source of information and builds trust',
    distractors: ['It looks nice', 'It increases model size', 'It reduces latency only'],
    explanation: 'Source citations provide transparent attribution, allowing users and domain experts to verify accuracy against original documents.'
  }
];

// Helper to shuffle options deterministically or per session
interface FormattedQuestion {
  id: number;
  section: 'ml' | 'gnn' | 'rag';
  sectionTitle: string;
  question: string;
  options: { label: 'A' | 'B' | 'C' | 'D'; text: string; isCorrect: boolean }[];
  correctAnswer: string;
  explanation: string;
}

export const QuizApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'all' | 'ml' | 'gnn' | 'rag'>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [answeredHistory, setAnsweredHistory] = useState<Record<number, { selected: string; isCorrect: boolean }>>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [seed, setSeed] = useState(0);

  // Filter and randomize options
  const questions: FormattedQuestion[] = useMemo(() => {
    const subset = activeSection === 'all' 
      ? QUIZ_QUESTIONS 
      : QUIZ_QUESTIONS.filter(q => q.section === activeSection);

    return subset.map(q => {
      // Create options with correct answer + distractors shuffled
      const allTexts = [q.correctAnswer, ...q.distractors];
      // Pseudo-random shuffle seeded by question id + seed
      const shuffled = [...allTexts].sort(() => Math.sin(q.id * 100 + seed) - 0.5);
      const labels: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
      
      const options = shuffled.map((text, idx) => ({
        label: labels[idx],
        text,
        isCorrect: text === q.correctAnswer
      }));

      return {
        id: q.id,
        section: q.section,
        sectionTitle: q.sectionTitle,
        question: q.question,
        options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      };
    });
  }, [activeSection, seed]);

  const currentQ = questions[currentIdx] || questions[0];

  // Milestone triggers
  useEffect(() => {
    if (correctAnswersCount > 0 && correctAnswersCount % 5 === 0 && isAnswered && selectedOption) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  }, [correctAnswersCount, isAnswered, selectedOption]);

  const handleSelectOption = (text: string, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedOption(text);
    setIsAnswered(true);

    const newHistory = { ...answeredHistory, [currentQ.id]: { selected: text, isCorrect } };
    setAnsweredHistory(newHistory);

    if (isCorrect) {
      sound.unlock();
      setScore(s => s + 10);
      setCorrectAnswersCount(c => c + 1);
    } else {
      sound.error();
    }
  };

  const handleNextQuestion = () => {
    sound.tap();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizCompleted(true);
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIdx > 0) {
      sound.tap();
      setCurrentIdx(i => i - 1);
      const prevAnswer = answeredHistory[questions[currentIdx - 1]?.id];
      if (prevAnswer) {
        setSelectedOption(prevAnswer.selected);
        setIsAnswered(true);
      } else {
        setSelectedOption(null);
        setIsAnswered(false);
      }
    }
  };

  const handleRestartQuiz = () => {
    sound.tap();
    setSeed(s => s + 1);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCorrectAnswersCount(0);
    setAnsweredHistory({});
    setIsQuizCompleted(false);
  };

  const handleSectionSwitch = (sec: 'all' | 'ml' | 'gnn' | 'rag') => {
    sound.tap();
    setActiveSection(sec);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setAnsweredHistory({});
    setIsQuizCompleted(false);
  };

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answeredHistory).length;
  const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);
  const correctPercent = answeredCount > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0;
  const earnedMilestones = Math.floor(correctAnswersCount / 5);

  return (
    <div className="h-full w-full flex flex-col bg-neutral-950 text-neutral-100 select-text overflow-y-auto">
      {/* Header Bar */}
      <div className="p-3 sm:p-4 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight">AI & ML Knowledge Quiz</h1>
              <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-semibold">
                30 Questions
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">Machine Learning • GNN • RAG Systems</p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800 text-xs">
          <button
            onClick={() => handleSectionSwitch('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              activeSection === 'all' ? 'bg-[#007AFF] text-white font-semibold shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            All (30)
          </button>
          <button
            onClick={() => handleSectionSwitch('ml')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              activeSection === 'ml' ? 'bg-[#007AFF] text-white font-semibold shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            1. ML (10)
          </button>
          <button
            onClick={() => handleSectionSwitch('gnn')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              activeSection === 'gnn' ? 'bg-[#007AFF] text-white font-semibold shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            2. GNN (10)
          </button>
          <button
            onClick={() => handleSectionSwitch('rag')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              activeSection === 'rag' ? 'bg-[#007AFF] text-white font-semibold shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            3. RAG (10)
          </button>
        </div>
      </div>

      {/* Progress & Live Score Ribbon */}
      <div className="px-4 py-2.5 bg-neutral-900/40 border-b border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
        <div className="flex items-center gap-3">
          <span>Question <strong className="text-white font-mono">{currentIdx + 1}</strong> of <strong className="text-white font-mono">{totalQuestions}</strong></span>
          <span className="h-3 w-px bg-neutral-700" />
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {correctAnswersCount} Correct
          </span>
        </div>

        {/* Milestone Badges Indicator */}
        <div className="flex items-center gap-1.5">
          {earnedMilestones > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold text-[11px] animate-pulse">
              <Award className="w-3.5 h-3.5" />
              <span>{earnedMilestones * 5} Streak Badge</span>
            </div>
          )}
          <span className="font-mono text-cyan-400 font-semibold">{score} pts</span>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full h-1 bg-neutral-900">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-[#007AFF] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Quiz Area */}
      <div className="flex-1 p-4 sm:p-6 max-w-3xl mx-auto w-full flex flex-col justify-between">
        {!isQuizCompleted ? (
          <div className="space-y-5">
            {/* Section Tag */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center gap-1.5">
                {currentQ.section === 'ml' && <Brain className="w-3 h-3 text-cyan-400" />}
                {currentQ.section === 'gnn' && <Network className="w-3 h-3 text-purple-400" />}
                {currentQ.section === 'rag' && <Database className="w-3 h-3 text-emerald-400" />}
                {currentQ.sectionTitle}
              </span>
              <span className="text-xs font-mono text-neutral-500">
                Q#{currentQ.id}
              </span>
            </div>

            {/* Question Text */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 shadow-md">
              <h2 className="text-base sm:text-lg font-semibold text-white leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* 4 Options Grid (A, B, C, D with Random Placement) */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.text;
                const showSuccess = isAnswered && opt.isCorrect;
                const showError = isAnswered && isSelected && !opt.isCorrect;

                return (
                  <button
                    key={opt.label}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt.text, opt.isCorrect)}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer select-none ${
                      showSuccess
                        ? 'bg-emerald-950/50 border-emerald-500/80 text-emerald-100 ring-1 ring-emerald-500/40 shadow-sm'
                        : showError
                        ? 'bg-red-950/50 border-red-500/80 text-red-100 ring-1 ring-red-500/40'
                        : isSelected
                        ? 'bg-[#007AFF]/20 border-[#007AFF] text-white'
                        : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/60 text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors shrink-0 ${
                        showSuccess
                          ? 'bg-emerald-500 text-white'
                          : showError
                          ? 'bg-red-500 text-white'
                          : 'bg-neutral-800 text-neutral-400 group-hover:text-white'
                      }`}>
                        {opt.label}
                      </span>
                      <span className="text-sm font-medium">{opt.text}</span>
                    </div>

                    {showSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />}
                    {showError && <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback & Explanation Card */}
            {isAnswered && (
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedOption === currentQ.correctAnswer ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correct Answer! (+10 pts)
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    Correct: <strong>{currentQ.correctAnswer}</strong>
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Completion Screen */
          <div className="py-8 px-4 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-neutral-950 shadow-xl shadow-amber-500/20 animate-bounce">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Quiz Completed!
              </h2>
              <p className="text-sm text-neutral-400 max-w-md">
                You've mastered questions across Machine Learning, Graph Neural Networks, and RAG Architectures.
              </p>
            </div>

            {/* Final Performance Metrics */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md">
              <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center">
                <span className="text-xs text-neutral-400">Score</span>
                <span className="text-xl font-bold text-cyan-400 font-mono mt-1">{score} pts</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center">
                <span className="text-xs text-neutral-400">Accuracy</span>
                <span className="text-xl font-bold text-emerald-400 font-mono mt-1">{correctPercent}%</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center">
                <span className="text-xs text-neutral-400">Badges</span>
                <span className="text-xl font-bold text-amber-400 font-mono mt-1">{earnedMilestones} 🏅</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleRestartQuiz}
                className="px-6 py-2.5 rounded-xl bg-[#007AFF] hover:bg-[#0062cc] text-white text-sm font-semibold flex items-center gap-2 shadow-lg cursor-pointer active:scale-95 transition-all"
              >
                <RotateCw className="w-4 h-4" />
                <span>Retake Quiz (Shuffled)</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Actions Bar */}
        {!isQuizCompleted && (
          <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentIdx === 0}
              className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${
                currentIdx === 0 ? 'opacity-40 cursor-not-allowed text-neutral-600' : 'hover:bg-neutral-800 text-neutral-300 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
                isAnswered
                  ? 'bg-[#007AFF] hover:bg-[#0062cc] text-white cursor-pointer active:scale-95'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <span>{currentIdx + 1 === totalQuestions ? 'Finish Quiz' : 'Next Question'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

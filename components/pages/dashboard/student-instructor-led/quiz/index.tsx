/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import { useParams, useRouter } from "next/navigation";
import {
  useGetOneQuizQuery,
 
  useSubmitQuizMutation,
} from "../../../../../feature/api/dashboardApi";
import { useGetUserQuery} from "../../../../../feature/api/authApi"
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

export default function Quiz() {
  const router = useRouter();
  const params = useParams();
  const { courseId, quiz } = params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [
    submitQuiz,
    {
      error,
      data: quizData,
      isLoading: quizLoading,
      isSuccess: quizSuccess,
      isError: quizError,
    },
  ] = useSubmitQuizMutation();
  const { data, isSuccess, isError, isLoading } = useGetOneQuizQuery(quiz);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const calculateScore = (userAnswers: any[]) => {
    let correctAnswers = 0;
    data.data.quiz.questions.forEach((question: any) => {
      const userAnswer = userAnswers.find((ans) => ans.question === question._id);
      if (userAnswer) {
        const correctOption = question.answers.find((ans: any) => ans.checked);
        if (correctOption && userAnswer.answer === correctOption.value) {
          correctAnswers++;
        }
      }
    });
    return correctAnswers;
  };

  const handleNext = () => {
    const currentQuestion = data.data.quiz.questions[currentQuestionIndex];

    if (!selectedAnswers[currentQuestion._id]) {
      toast.error("Please select an option");
      return;
    }

    const answerObject = {
      question: currentQuestion._id,
      answer: selectedAnswers[currentQuestion._id],
    };

    const existingAnswerIndex = answers.findIndex(
      (ans) => ans.question === currentQuestion._id
    );

    if (existingAnswerIndex >= 0) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = answerObject;
      setAnswers(updatedAnswers);
    } else {
      setAnswers([...answers, answerObject]);
    }

    if (currentQuestionIndex < data.data.quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (questionId: string, answerValue: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerValue,
    });
  };
  const { data:userData } = useGetUserQuery({});
console.log(userData)

  const submitBtn = () => {
    const currentQuestion = data?.data.quiz.questions[currentQuestionIndex];

    if (!selectedAnswers[currentQuestion._id]) {
      toast.error("Please select an option");
      return;
    }

    const answerObject = {
      question: currentQuestion._id,
      answer: selectedAnswers[currentQuestion._id],
    };

    const existingAnswerIndex = answers.findIndex(
      (ans) => ans.question === currentQuestion._id
    );

    let finalAnswers = [...answers];
    if (existingAnswerIndex >= 0) {
      finalAnswers[existingAnswerIndex] = answerObject;
    } else {
      finalAnswers = [...answers, answerObject];
    }

    const calculatedScore = calculateScore(finalAnswers);
    setScore(calculatedScore);
    setTotalQuestions(data.data.quiz.questions.length);
    setShowResults(true);
    
// console.log( 
//   {
//     "quiz": quiz,
//     "course": courseId,
//     "answers": finalAnswers,
//     "score": calculatedScore,
//     "totalQuestions": data.data.quiz.questions.length,
//     "submittedBy":{name:userData?.data?.name?.firstName+data?.data?.name?.lastName, email:userData?.data?.email}
//   })
    submitQuiz({
      quiz: quiz,
      course: courseId,
      answers: finalAnswers,
      score: calculatedScore,
      totalQuestions: data.data.quiz.questions.length,
      submittedBy:{name:userData?.data?.name?.firstName+data?.data?.name?.lastName, email:userData?.data?.email}
    });
  };

  useEffect(() => {
    if (quizError) {
      toast.error("Quiz submission failed");
      console.error(error);
    } else if (quizSuccess) {
      toast.success("Quiz submitted successfully!");
      setTimeout(() => {
        router.push(`/dashboard/quiz/submit-result/${quizData.data.subQuiz._id}`);
      }, 3000);
    }
  }, [quizError, quizSuccess]);

  useEffect(() => {
    if (isSuccess && data.data.quiz.questions.length > 0) {
      const initialSelectedAnswers: Record<string, string> = {};
      setSelectedAnswers(initialSelectedAnswers);
    }
  }, [isSuccess, data]);

  if (showResults) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-bg">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <p className="text-lg mb-2">You scored:</p>
          <p className="text-4xl font-bold text-[#3A57E8] mb-6">
            {score} out of {totalQuestions}
          </p>
          <p className="text-gray-600">
            {quizSuccess ? "Redirecting to results page..." : "Submitting results..."}
          </p>
          {quizLoading && <Spinner className="mt-4" />}
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : isSuccess && data.data.quiz.questions.length > 0 ? (
        <div className="grid grid-cols-12 gap-8 font-nunito bg-gray-bg">
          <div className="col-span-12 xl:col-span-8">
            <div>
              <div>
                <h2
                  className="md:mb-3 xsm:md-1"
                  style={{
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "22px",
                    lineHeight: " 130%",
                    letterSpacing: " 0.02em",
                    color: " #232D42",
                  }}
                >
                  {data?.data?.quiz?.title}
                </h2>
                <h5 className="text-[#3A57E8] font-semibold">
                  Question {currentQuestionIndex + 1} of {data.data.quiz.questions.length}
                </h5>
              </div>

              <div>
                <div>
                  <p
                    className="font-medium text-[20px] mt-3 mb-3 font-sans"
                    dangerouslySetInnerHTML={{
                      __html: data?.data.quiz.questions[currentQuestionIndex].question,
                    }}
                  ></p>
                </div>
                {data.data.quiz.questions[currentQuestionIndex].answers.map(
                  (val: any, id: any) => (
                    <div key={id}>
                      <div className="flex gap-3 items-center bg-[#E9ECEF] p-5 rounded mb-2">
                        <input
                          type="radio"
                          name={`question-${data.data.quiz.questions[currentQuestionIndex]._id}`}
                          value={val.value}
                          onChange={() =>
                            handleAnswerChange(
                              data.data.quiz.questions[currentQuestionIndex]._id,
                              val.value
                            )
                          }
                          checked={
                            selectedAnswers[
                              data.data.quiz.questions[currentQuestionIndex]._id
                            ] === val.value
                          }
                        />
                        <label>{val.value}</label>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="flex justify-between mt-4">
                <div>
                  {currentQuestionIndex > 0 && (
                    <button
                      className="bg-gray-500 py-2 px-3 text-[#fff] mr-2"
                      onClick={handlePrevious}
                    >
                      Previous Question
                    </button>
                  )}
                </div>
                <div>
                  {currentQuestionIndex < data.data.quiz.questions.length - 1 ? (
                    <button
                      className="bg-[#3A57E8] py-2 px-3 text-[#fff]"
                      onClick={handleNext}
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      className="bg-[#3A57E8] py-2 px-3 text-[#fff]"
                      onClick={submitBtn}
                      disabled={quizLoading || quizSuccess}
                    >
                      {quizLoading || quizSuccess ? (
                        <div className="flex justify-center items-center gap-1">
                          <Spinner />
                          Loading
                        </div>
                      ) : (
                        "Submit Quiz"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No Question Found</div>
      )}
    </>
  );
}

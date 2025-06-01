import { useState } from "react";
import Image from "next/image";
import responsiveStyle from "../../../../../styles/ContactStyle.module.css";
import { useGetAllReviewUnPublishQuery } from "../../../../../feature/api/dashboardApi";
import DeleteReviewModal from "./DeleteReview";
import AccpectReview from "./AccpectReview";
import { useRouter } from "next/router";

interface IStudentProps {
  student: any;
  id: string;
  review: string;
  rating: string;
  createdAt: Date;
}

function Table(props: IStudentProps) {
  const { student, id, review, rating, createdAt } = props;

  const [showAcceptStudentModal, setShowAcceptStudentModal] = useState(false);
  const [showRejectStudentModal, setShowRejectStudentModal] = useState(false);

  const handleCloseAcceptStudentModal = () => setShowAcceptStudentModal(false);
  const handleCloseRejectStudentModal = () => setShowRejectStudentModal(false);

  return (
    <tr className="border-b">
      {showAcceptStudentModal && (
        <AccpectReview
          id={id}
          show={showAcceptStudentModal}
          handleClose={handleCloseAcceptStudentModal}
          title="Are you sure you want to accept this review course?"
          successMessage="Review accepted Successfully!"
          sureButtonColor="success"
          cancelButtonColor="failure"
          isPublished={true}
        />
      )}
      {showRejectStudentModal && (
        <DeleteReviewModal
          id={id}
          show={showRejectStudentModal}
          handleClose={handleCloseRejectStudentModal}
          title="Are you sure you want to reject this review?"
          successMessage="Review reject Successfully!"
        />
      )}
      <td scope="row" className="py-4 px-6">
        <div className="flex space-x-2">
          <div className="lg:w-[60px] relative w-[40px] lg:h-[60px] h-[40px] ">
            <Image
              // className="w-[15px] h-[15px] rounded-md"
              src={student.avatar}
              alt="avatar"
              width={40}
              height={40}
            />
          </div>
          <div>
            <h2 className="text-[16px] md:text-[18px] text-[#232D42] font-medium">
              {student.firstName} {student.lastName}
            </h2>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">{student.email}</td>
      <td className="py-4 px-6">{review}</td>
      <td className="py-4 px-6">{rating} Star</td>
      <td className="py-4 px-6">
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => setShowAcceptStudentModal(true)}
            className="bg-[#3A57E8] rounded text-white px-3 lg:px-5 py-1 lg:py-2 "
          >
            Accept
          </button>
          <button
            onClick={() => setShowRejectStudentModal(true)}
            className="bg-[#C03221] rounded text-white px-3 lg:px-5 py-1 lg:py-2 "
          >
            Reject
          </button>
          {/* <button className="text-[16px] text-white px-4 py-1.5 rounded bg-[#3A57E8] ">
            View
          </button> */}
        </div>
      </td>
    </tr>
  );
}

function Review() {
  const router = useRouter();
  const id = router.query;
  //console.log(id)
  const { data, isLoading, isError, isSuccess, error } =
    useGetAllReviewUnPublishQuery({});

  //console.log(data)
  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error...</div>
      ) : isSuccess && data?.data?.reviews && data.data.reviews.length > 0 ? (
        <div
          className={` ${responsiveStyle.responsiveTable} overflow-x-scroll lg:overflow-x-auto md:w-full mx-auto shadow-md sm:rounded-lg mt-12 font-nunito `}
        >
          <table className="w-full text-[16px] md:text-[18px] text-left">
            <thead className="text-[#ADB5BD] font-normal">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Profiles
                </th>
                <th scope="col" className="py-3 px-6 ">
                  Email
                </th>
                <th scope="col" className="py-3 px-6 ">
                  Review
                </th>
                <th scope="col" className="py-3 px-6">
                  Rating
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-[#232D42]">
              {data.data.reviews.map(
                ({
                  _id,
                  review,
                  rating,
                  student,
                  createdAt,
                }: {
                  _id: string;
                  student: any;
                  review: string;
                  rating: string;
                  createdAt: Date;
                }) => (
                  <Table
                    key={_id}
                    id={_id}
                    student={student}
                    createdAt={createdAt}
                    rating={rating}
                    review={review}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No Review Found</div>
      )}
    </div>
  );
}

export default Review;

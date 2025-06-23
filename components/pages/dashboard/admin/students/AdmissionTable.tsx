"use client"
import { useState, useEffect } from "react";
import responsiveStyle from "../../../../../styles/ContactStyle.module.css";
import {
  useAcceptStudentAdmissionRequestMutation,
  useDeleteUserMutation,
  useGetAdmissionRequestQuery,
} from "../../../../../feature/api/dashboardApi";
import ActionConfirmModal from "../../../../utils/modals/ActionConfirmModal";

interface IStudentProps {
  id: string;
  email: string;
  status: string;
  refetch: () => void;
  onStatusChange: (id: string, newStatus: string) => void;
}

function Table({ id, email, status, refetch, onStatusChange }: IStudentProps) {
  const [showAcceptStudentModal, setShowAcceptStudentModal] = useState(false);
  const [showRejectStudentModal, setShowRejectStudentModal] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useState<string | null>(null);

  const handleCloseAcceptStudentModal = () => setShowAcceptStudentModal(false);
  const handleCloseRejectStudentModal = () => setShowRejectStudentModal(false);

  const handleAcceptSuccess = () => {
    setOptimisticStatus(null);
    onStatusChange(id, "accepted");
    refetch();
  };

  const handleRejectSuccess = () => {
    setOptimisticStatus(null);
    onStatusChange(id, "rejected");
    refetch();
  };

  const displayStatus = optimisticStatus || status;

  return (
    <tr className="border-b">
      {showAcceptStudentModal && (
        <ActionConfirmModal
          id={id}
          show={showAcceptStudentModal}
          handleClose={handleCloseAcceptStudentModal}
          title="Are you sure you want to accept this student admission?"
          successMessage="Student admission accepted Successfully!"
          mutationHook={useAcceptStudentAdmissionRequestMutation}
          sureButtonColor="success"
          cancelButtonColor="failure"
          setOptimisticStatus={(status) => setOptimisticStatus(status)}
          onSuccess={handleAcceptSuccess}
        />
      )}
      {showRejectStudentModal && (
        <ActionConfirmModal
          id={id}
          show={showRejectStudentModal}
          handleClose={handleCloseRejectStudentModal}
          title="Are you sure you want to reject this student admission?"
          successMessage="Student admission rejected Successfully!"
          mutationHook={useDeleteUserMutation}
          setOptimisticStatus={(status) => setOptimisticStatus(status)}
          onSuccess={handleRejectSuccess}
        />
      )}
      <td scope="row" className="py-4 px-6">
        <div className="flex space-x-2">
          <div className="lg:w-[60px] relative w-[40px] lg:h-[60px] h-[40px]">
            {/* Placeholder for avatar image */}
          </div>
          <div>
            {/* Placeholder for student name */}
          </div>
        </div>
      </td>
      <td className="py-4 px-6">{email}</td>
      <td className="py-4 px-6">
        {displayStatus === "accepted" ? (
          <span className="text-[#1AA053]">Accepted</span>
        ) : displayStatus === "rejected" ? (
          <span className="text-[#C03221]">Rejected</span>
        ) : (
          <span className="text-[#ADB5BD]">Pending</span>
        )}
      </td>
      <td className="py-4 px-6">
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => setShowAcceptStudentModal(true)}
            className={`text-[16px] px-4 py-1.5 rounded text-white bg-[#1AA053] hover:bg-[#168a48] transition-colors`}
            disabled={displayStatus === "accepted"}
          >
            Accept
          </button>
          <button
            onClick={() => setShowRejectStudentModal(true)}
            className={`text-[16px] px-4 py-1.5 rounded text-white bg-[#C03221] hover:bg-[#a82b1d] transition-colors`}
            disabled={displayStatus === "rejected"}
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
}

function AdmissionTable() {
  const { 
    data, 
    isLoading, 
    isError, 
    isSuccess, 
    error, 
    refetch 
  } = useGetAdmissionRequestQuery({});

  const [localData, setLocalData] = useState(data?.data || []);

  useEffect(() => {
    if (isSuccess && data?.data) {
      setLocalData(data.data);
    }
  }, [isSuccess, data]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setLocalData(prevData => 
      prevData.map(item => 
        item._id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : isError ? (
        <div className="text-red-500 text-center p-4">
          Error loading admission requests: {(error as any)?.data?.message || "Unknown error"}
        </div>
      ) : isSuccess && localData?.length > 0 ? (
        <div
          className={`${responsiveStyle.responsiveTable} overflow-x-scroll lg:overflow-x-auto md:w-full mx-auto shadow-md sm:rounded-lg mt-4 font-nunito`}
        >
          <table className="w-full text-[16px] md:text-[18px] text-left">
            <thead className="text-[#ADB5BD] font-normal bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Profiles
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-[#232D42]">
              {localData.map((user: {id: string, _id: string, email: string, status: string}) => (
                <Table
                  key={user._id}
                  id={user._id}
                  email={user.email}
                  status={user.status}
                  refetch={refetch}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 text-gray-500">
          No admission requests found
        </div>
      )}
    </div>
  );
}

export default AdmissionTable;
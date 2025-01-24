import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { useGetAllAnnouncementQuery } from "../../../feature/api/dashboardApi";
import { useDeleteOneAnnouncementMutation } from "../../../feature/api/dashboardApi";
import Image from "next/image";
import Delete from "../../../Icon/Delete";
import ActionConfirmModal from "../../utils/modals/ActionConfirmModal";
import { useAppSelector } from "../../../app/hooks";

interface IModalProps {
  show: boolean;
  handleClose: () => void;
}

const AnnouncementModal = ({ show, handleClose }: IModalProps) => {
  const { data, isSuccess, isError, isLoading } = useGetAllAnnouncementQuery(
    {}
  );

  const [showEnrollConfirmModal, setShowEnrollConfirmModal] = useState(false);
  const handleCloseEnrollConfirmModal = () => setShowEnrollConfirmModal(false);
  const {
    user: { roles },
  } = useAppSelector((state) => state.auth);
  return (
    <>
      <div className="font-nunito">
        <Modal
          show={show}
          popup={true}
          onClose={handleClose}
          size="4xl"
          className="overflow-auto "
        >
          <Modal.Header />
          <Modal.Body>
            <div className="max-h-[500px] md:max-h-[400px] md:max-w-[900px] max-w-[800px] overflow-auto">
              <div className="flex justify-around">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="py-2 rounded px-4 w-full"
                  />
                  <BsSearch className="absolute right-2 top-3 font-bold text-lg" />
                </div>
                {roles.includes("admin" || "instructor") && (
                  <Link href="dashboard/announcement/create-announcement">
                    <button className="px-4 py-1 rounded-lg flex gap-x-1 items-center text-white bg-blue-700 ">
                      <span className="text-[24px]">+</span>{" "}
                      <span>Announcements</span>
                    </button>
                  </Link>
                )}
              </div>
              <div className="flex flex-col ">
                <div className="">
                  {isLoading ? (
                    <div>Loading....</div>
                  ) : isError ? (
                    <div>Error....</div>
                  ) : isSuccess &&
                    data?.data?.announcements &&
                    data?.data?.announcements?.length > 0 ? (
                    data?.data?.announcements.map(
                      ({
                        title,
                        description,
                        id,
                        createdBy,
                        createdAt,
                      }: {
                        title: string;
                        description: string;
                        id: string;
                        createdBy: any;
                        createdAt: any;
                      }) => (
                        <div
                          key={id}
                          className="flex items-start flex-col md:flex-row justify-between py-[10px] my-[10px] border-t-2 border-gray-300 border-b-2"
                        >
                          <div className="flex items-start flex-col md:flex-row">
                            <Image
                              src={createdBy?.avatar}
                              alt=""
                              width={"40px"}
                              height={"40px"}
                            />

                            <div className="mx-[10px] max-w-full md:max-w-[400px] max-h-[400px] overflow-auto">
                              <h1 className="font-bold font-nunito">{title}</h1>

                              <p
                                className="font-nunito"
                                dangerouslySetInnerHTML={{
                                  __html: description,
                                }}
                              ></p>
                            </div>
                          </div>
                          <div className="font-nunito">
                            <h1 className="font-bold ">Posted on</h1>
                            <p>
                              {new Date(createdAt).toLocaleDateString()}
                              <span className="mx-[5px]">at</span>
                              {new Date(createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                          {roles.includes("admin" || "instructor") && (
                            <div>
                              <ActionConfirmModal
                                show={showEnrollConfirmModal}
                                handleClose={handleCloseEnrollConfirmModal}
                                title="Are you sure you want to delete this announcement?"
                                id={id}
                                mutationHook={useDeleteOneAnnouncementMutation}
                                successMessage="Successfully deleted!"
                                sureButtonColor="success"
                              />
                              <button
                                onClick={() => setShowEnrollConfirmModal(true)}
                              >
                                <Delete />
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    )
                  ) : (
                    <div>No announcement Found</div>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AnnouncementModal;

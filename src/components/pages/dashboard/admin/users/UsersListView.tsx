import React from "react";
import TableController from "../common/TableController";
import UsersTable from "./UsersTable";

type UsersListViewProps = {
  users: any[];
  title?: string;
};

const UsersListView = (props: UsersListViewProps) => {
  const { users, title } = props;
  return (
    <div className="py-[40px] bg-[#ffffff] px-4 mt-6">
      {/* Nav */}
      {title && (
        <div className="pb-[40px] flex items-center gap-6">
          <h3>{title}</h3>
        </div>
      )}
      {/* table controller  */}
      <TableController />
      {/* table  */}
      <UsersTable users={users} />
    </div>
  );
};

export default UsersListView;

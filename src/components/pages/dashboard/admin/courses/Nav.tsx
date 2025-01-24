import { useRouter } from "next/router";
import { ActiveTab } from ".";
import { useAppSelector } from "../../../../../app/hooks";
import Link from "next/link";

//@ts-ignore
type TabLinkProps = {
  btnText: string;
  active: any;
  tabLink: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
};

type NavProps = {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  Modal: boolean;
  setShowModal: any;
};

const TabLink = (props: TabLinkProps) => {
  const { btnText, active, tabLink, setActiveTab } = props;
  return (
    <button
      className={`border-b-2 pb-2 text-[${
        active ? "#232D42" : "#8A92A6"
      }] font-semibold text-lg inline-block ${
        active ? "border-[#3A57E8]" : ""
      }`}
      onClick={() => setActiveTab(tabLink)}
    >
      {btnText}
    </button>
  );
};

const Nav = (props: NavProps) => {
  const { activeTab, setActiveTab, Modal, setShowModal } = props;
  const router = useRouter();
  const {
    user: { roles },
  } = useAppSelector((state) => state.auth);
  const handleSelectTab = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (
      value === "courses-list" ||
      value === "courses-request" ||
      value === "courses-categories"
    ) {
      setActiveTab(value);
    }
  };
  return (
    <nav className="pb-[40px] flex items-center gap-6 font-nunito">
      <div className="relative border-b-2 h-[30px] w-[470px] hidden md:inline-block">
        <div className="flex absolute bottom-[-2px] gap-4">
          <TabLink
            btnText="Courses List"
            active={activeTab === "courses-list"}
            tabLink="courses-list"
            setActiveTab={setActiveTab}
          />
          {roles.includes("admin") && (
            <>
              <span className="text-[#8A92A6] font-bold text-[20px] pb-3">
                |
              </span>
              <TabLink
                btnText="Courses Request"
                active={activeTab === "courses-request"}
                tabLink="courses-request"
                setActiveTab={setActiveTab}
              />
              <span className="text-[#8A92A6] font-bold text-[20px] pb-3">
                |
              </span>
              <TabLink
                btnText="Courses Categories"
                active={activeTab === "courses-categories"}
                tabLink="courses-categories"
                setActiveTab={setActiveTab}
              />
            </>
          )}
        </div>
      </div>

      <select
        className="bg-[#EBEEFD] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 md:hidden font-nunito"
        onChange={handleSelectTab}
      >
        <option
          value="courses-list"
          defaultValue={activeTab === "courses-list"}
        >
          Courses List
        </option>
        <option
          value="courses-request"
          defaultValue={activeTab === "courses-request"}
        >
          Courses Request
        </option>
        <option
          value="courses-categories"
          defaultValue={activeTab === "courses-categories"}
        >
          Courses Categories
        </option>
      </select>
      {activeTab === "courses-list" && (
        <Link href="/dashboard/course/creation">
            <button className="bg-[#3A57E8] rounded text-white px-3 lg:px-5 py-1.5 lg:py-2 md:mb-[20px] font-nunito ml-auto">
                     Create New Course
            </button>
        </Link>
      )}

      {activeTab === "courses-categories" && (
        <button
          onClick={() => setShowModal(!Modal)}
          className="bg-[#3A57E8] rounded text-white px-3 lg:px-5 py-1.5 lg:py-2 md:mb-[20px] font-nunito ml-auto"
        >
          Create Category
        </button>
      )}
    </nav>
  );
};

export default Nav;

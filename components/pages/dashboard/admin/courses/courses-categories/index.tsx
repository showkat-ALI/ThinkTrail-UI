import CoursesCategories from "./CoursesCategories";
import PopularCourses from "./PopularCourses";
import TopTeachers from "./TopTeachers";
import CreateCategoryModal from "./CreateCategoryModal";

type props = {
    Modal:boolean;
    setShowModal:any
}

const CoursesCategoriesSection = ({Modal,setShowModal}:props) => {
    return (
        <div className="grid grid-cols-12 gap-6 mt-12">
            <div className="col-span-12 xl:col-span-8">
               {
                 Modal && <CreateCategoryModal Modal={Modal} setShowModal={setShowModal}/>
               }
               
            </div>
            <div className="col-span-12 xl:col-span-4 space-y-10">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6 xl:col-span-12">
                        <PopularCourses />
                    </div>
                    <div className="col-span-12 md:col-span-6 xl:col-span-12">
                        <TopTeachers />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoursesCategoriesSection;

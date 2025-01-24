import CoursesCategories from "./CoursesCategories";
import PopularCourses from "./PopularCourses";
import TopTeachers from "./TopTeachers";
import {useGetCategoriesQuery} from '../../../../../../feature/api/dashboardApi';
import CreateCategoryModal from "./CreateCategoryModal";

type props = {
    Modal:boolean;
    setShowModal:any
}

const CoursesCategoriesSection = ({Modal,setShowModal}:props) => {
    const { data, isSuccess, isError, isLoading } = useGetCategoriesQuery({});
    console.log(data)
    return (
        <div className="grid grid-cols-12 gap-6 mt-12">
            <div className="col-span-12 xl:col-span-8">
               {
                 Modal && <CreateCategoryModal Modal={Modal} setShowModal={setShowModal}/>
               }
               {isLoading ? 
                      <div>Loading....</div> 
                      :isError ? 
                           <div>Error....</div>
                          :isSuccess && data?.data?.categories && data.data.categories.length > 0 ?
                 <>
                    <CoursesCategories categories={data.data.categories}/>
                 </>  :<div>No categories found</div> 
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

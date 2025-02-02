import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: [
    "users",
    "instructors",
    "courses",
    "categories",
    "assignment",
    "courseModule",
    "quiz",
    "enrollment",
    "faqs",
    "lesson",
    "msg",
    "msgUser",
    "grpUser",
    "review",
    "page",
    "announcement",
    "popularCourses",
    "mentoring",
    "optimization",
    "allfile",
    "liveclass",
    "semester",
    "department",
    "academicFaculty",
    "academicDepartment",
  ],

  endpoints: (builder) => ({
    // GET ALL USERS
    getAllUsers: builder.query({
      query: () => ({ url: "/api/v1/users" }),
      providesTags: ["users"],
    }),
    // DELETE A USER BY USER ID
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/api/v1/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users", "instructors"],
    }),
    // UPDATE A USER BY ID
    updateUser: builder.mutation({
      query: (body: { id: string; user: {} }) => ({
        url: `/api/v1/users/${body.id}`,
        method: "PATCH",
        body: body.user,
      }),
      invalidatesTags: ["users", "instructors"],
    }),
    // ADD A USER
    addUser: builder.mutation({
      query: (body: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        roles: string;
        password: string;
      }) => ({
        url: `/api/v1/users`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["users"],
    }),
    // GET ALL INSTRUCTORS
    getAllInstructors: builder.query({
      query: () => ({ url: "/api/v1/users?roles=instructor" }),
      providesTags: ["instructors"],
    }),
    //get all course
    getAllCourse: builder.query({
      query: () => ({ url: "/api/v1/courses" }),
      providesTags: ["courses"],
    }),
    // DELETE A Course
    deleteCourse: builder.mutation({
      query: (id: string) => ({
        url: `/api/v1/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["courses"],
    }),
    // ACCEPT A Course
    acceptCourse: builder.mutation({
      query: (id: string) => ({
        url: `/api/v1/courses/${id}`,
        method: "PATCH",
        body: { status: "active" },
      }),
      invalidatesTags: ["courses"],
    }),
    // update a course status
    updateCourseStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/api/v1/courses/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["courses"],
    }),
    //Get all categories
    getCategories: builder.query({
      query: () => ({
        url: `/api/v1/categories`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
    // DELETE A Course Categories
    deleteCourseCategories: builder.mutation({
      query: (id: string) => ({
        url: `/api/v1/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
    //create Category
    createCategory: builder.mutation({
      query: (body: { name: string }) => ({
        url: "/api/v1/categories",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["categories"],
    }),
    // UPDATE A CATEGORY BY ID
    updateCategory: builder.mutation({
      query: (body: {
        id: string;
        data: {
          name: string;
          description: string;
        };
      }) => ({
        url: `/api/v1/categories/${body.id}`,
        method: "PATCH",
        body: body.data,
      }),
      invalidatesTags: ["categories"],
    }),
    // GET ALL STUDENTS
    getAllStudents: builder.query({
      query: () => ({
        url: `/api/v1/users?roles=student`,
      }),
      providesTags: ["users"],
    }),
    //create a quiz
    createQuiz: builder.mutation({
      query: (body) => ({
        url: "/api/v1/quiz/create-quiz",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["quiz"],
    }),
    // GET ALL ADMISSION REQUEST
    getAllAdmissionRequest: builder.query({
      query: () => ({
        url: `/api/v1/users?isActive=false&roles=student`,
      }),
      providesTags: ["users"],
    }),
    // ACCEPT STUDENT ADMISSION REQUEST
    acceptStudentAdmissionRequest: builder.mutation({
      query: (id: string) => ({
        url: `/api/v1/users/acceptStudent/${id}`,
        method: "PATCH",
        body: {
          isActive: true,
          status: "active",
        },
      }),
      invalidatesTags: ["users"],
    }),
    //create course
    createCourse: builder.mutation({
      query: (body: {
        title: string;
        shortDescription: string;
        category: string;
        language: string;
        durationInMinutes: number;
        price: number;
        level: string;
        featured?: boolean;
        numberOfLectures: number;
        discountPrice: number;
        isDiscount?: boolean;
        description: string;
        courseImage: string;
        videoUrl: string;
      }) => ({
        url: "/api/v1/courses",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["courses"],
    }),

    // UPDATE A course BY ID
    updateCourse: builder.mutation({
      query: (body: {
        id: string;
        isPublished: boolean;
        messageToReviewer: string;
        tags: string[];
        title: string;
        shortDescription: string;
        category: string;
        language: string;
        durationInMinutes: number;
        price: number;
        level: string;
        featured?: boolean;
        numberOfLectures: number;
        discountPrice: number;
        isDiscount?: boolean;
        description: string;
        courseImage: string;
        videoUrl: string;
      }) => ({
        url: `/api/v1/courses/${body.id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["courses"],
    }),
    // GET ALL COURSE REQUEST
    getAllCourseRequest: builder.query({
      query: () => ({
        url: "/api/v1/courses?status=pending",
        method: "GET",
      }),
      providesTags: ["courses"],
    }),
    // GET ALL ACTIVE COURSE
    getAllActiveCourse: builder.query({
      query: () => ({
        url: "/api/v1/courses?status=active",
        method: "GET",
      }),
    }),
    //create assignment
    createAssignment: builder.mutation({
      query: (body) => ({
        url: "/api/v1/assignment/create-assignment",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["assignment"],
    }),
    //Get all assignment
    getAllAssignmentsofAInstructor: builder.query({
      query: (ID) => ({
        url: `api/v1/assignment/all-assignments?createdBy=${ID}`,
        method: "GET",
      }),
      providesTags: ["assignment"],
    }),
    //create course Module
    createModuleCourse: builder.mutation({
      query: (body: { name: string; course: string }) => ({
        url: "/api/v1/modules",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["courseModule"],
    }),
    //Get  course module
    getCourseModule: builder.query({
      query: (id: string) => ({
        url: `/api/v1/modules?course=${id}`,
        method: "GET",
      }),
      providesTags: ["courseModule"],
    }),
    // UPDATE A module BY ID
    updateModule: builder.mutation({
      query: (body: { id: string; assignments: any }) => {
        console.log(body);
        return {
          url: `/api/v1/modules/${body.id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["courseModule"],
    }),
    // UPDATE A module BY ID
    updateModuleName: builder.mutation({
      query: (body: { id: string; name: any }) => {
        console.log(body);
        return {
          url: `/api/v1/modules/${body.id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["courseModule"],
    }),
    // UPDATE A module BY ID
    updateModulePage: builder.mutation({
      query: (body: { id: string; pages: any }) => {
        console.log(body);
        return {
          url: `/api/v1/modules/${body.id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["courseModule"],
    }),
    // DELETE A Module
    deleteModule: builder.mutation({
      query: (id: string) => ({
        url: `/api/v1/modules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["courseModule"],
    }),
    // UPDATE A module BY ID Video
    updateVideoModule: builder.mutation({
      query: (body: {
        module: string;
        topicName: string;
        localVideo: string;
        youtubeVideo: string;
        minutes: number;
        second: number;
        key: string;
      }) => {
        console.log(body);
        return {
          url: `/api/v1/videos`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["courseModule"],
    }),
    //Get all assignment
    getQuiz: builder.query({
      query: () => ({
        url: `/api/v1/quiz`,
        method: "GET",
      }),
    }),
    // UPDATE A module BY ID
    updateModuleQuiz: builder.mutation({
      query: (body: { id: string; quizzes: any }) => {
        console.log(body);
        return {
          url: `/api/v1/modules/${body.id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["courseModule"],
    }),
    //create slide
    createSlide: builder.mutation({
      query: (body: {
        title: string;
        fileUrl: string;
        key: string;
        module: string;
      }) => ({
        url: "/api/v1/slides",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["courseModule"],
    }),

    // ENROLL IN COURSE
    enroll: builder.mutation({
      query: (id: string) => ({
        url: "/api/v1/enrollments",
        method: "POST",
        body: { course: id },
      }),
    }),
    //Get my enrollmentsall course
    getMyEnrollmentAll: builder.query({
      query: () => ({
        url: `/api/v1/enrollments/myEnroll/mine`,
        method: "GET",
      }),
      providesTags: ["enrollment"],
    }),
    //Get  course enrollment
    getEnrollment: builder.query({
      query: (id: string) => ({
        url: `/api/v1/enrollments/${id}`,
        method: "GET",
      }),
      providesTags: ["enrollment"],
    }),

    //create course querstion
    createQuestionCourse: builder.mutation({
      query: (body: {
        name: string;
        email: string;
        question: string;
        course: string;
      }) => ({
        url: "/api/v1/courseQuestions",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["enrollment"],
    }),
    //create course faqs
    createFaqs: builder.mutation({
      query: (body: { answer: string; question: string; course: string }) => ({
        url: "/api/v1/faqs",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["faqs"],
    }),
    //Get  faqs
    getFaqs: builder.query({
      query: (id: string) => ({
        url: `/api/v1/faqs?course=${id}`,
        method: "GET",
      }),
      providesTags: ["faqs"],
    }),
    //Get  faqs
    getAllLessonCourse: builder.query({
      query: (id: string) => ({
        url: `/api/v1/videos?course=${id}`,
        method: "GET",
      }),
      providesTags: ["lesson"],
    }),
    //assignment submit
    submitAssignment: builder.mutation({
      query: (body: {
        course: any;
        assignment: any;
        text: string;
        fileUrl: string[];
        comment: string;
      }) => ({
        url: "/api/v1/subAssignments",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["assignment"],
    }),
    //Get  all submit assignment
    getAllSubmitAssignment: builder.query({
      query: () => ({
        url: `/api/v1/subAssignments`,
        method: "GET",
      }),
      providesTags: ["assignment"],
    }),
    //Get  one submit assignment
    getOneSubmitAssignment: builder.query({
      query: (body: any) => ({
        url: `/api/v1/subAssignments/?student=${body.id}&assignment=${body.assignmentId}`,
        method: "GET",
      }),
      providesTags: ["assignment"],
    }),
    //create quiz querstion
    createQuizQuestion: builder.mutation({
      query: (body) => ({
        url: "/api/v1/quiz/create-question",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [],
    }),
    //Get one quiz
    getOneQuiz: builder.query({
      query: (quiz: any) => ({
        url: `/api/v1/quiz/${quiz}`,
        method: "GET",
      }),
      providesTags: ["quiz"],
    }),
    //create quiz querstion
    submitQuiz: builder.mutation({
      query: (body: { quiz: any; course: any; answers: string[] }) => ({
        url: "/api/v1/subQuizzes",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["quiz"],
    }),
    // GET ALL active course by gatecory
    getCourseByCategory: builder.query({
      query: (id: any) => ({
        url: `/api/v1/courses?status=active${id}`,
        method: "GET",
      }),
    }),
    // GET single active course by gatecory
    getSingleCourse: builder.query({
      query: (id: any) => ({
        url: `/api/v1/courses/${id}`,
        method: "GET",
      }),
    }),
    // GET popular course
    getPopularCourse: builder.query({
      query: () => ({
        url: `/api/v1/courses?sort=-totalEnroll&limit=3`,
        method: "GET",
      }),
    }),
    // GET popular course
    getOneCourse: builder.query({
      query: (id: string) => ({
        url: `/api/v1/courses/${id}`,
        method: "GET",
      }),
    }),
    //post comment
    submitComment: builder.mutation({
      query: (body: { name: any; email: any; question: any; course: any }) => ({
        url: "/api/v1/courseQuestions",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [],
    }),
    // GET popular course
    getComments: builder.query({
      query: () => ({
        url: `/api/v1/courseQuestions`,
        method: "GET",
      }),
    }),
    //message api
    getChatPeople: builder.query({
      query: () => ({
        url: `api/v1/chat?status=recent&page=1&limit=1000`,
        method: "GET",
      }),
      providesTags: ["msgUser"],
    }),
    //message api
    getChatGroup: builder.query({
      query: () => ({
        url: `api/v1/chat/group?status=recent&page=1&limit=1000`,
        method: "GET",
      }),
      providesTags: ["grpUser"],
    }),
    //message api
    getMsgChat: builder.query({
      query: (id: any) => ({
        url: `api/v1/message/${id}?page=1&limit=10000`,
        method: "GET",
      }),
      providesTags: ["msg"],
    }),
    //message api
    getMessage: builder.query({
      query: (id: any) => ({
        url: `api/v1/message/${id}?page=1&limit=10000`,
        method: "GET",
      }),
      providesTags: ["msg"],
    }),

    //post message
    postMessage: builder.mutation({
      query: (body: any) => ({
        url: "api/v1/message/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["msg"],
    }),
    //post message
    getUser: builder.query({
      query: (id: any) => ({
        url: `api/v1/chat/users?search=${id}&page=1&limit=1000`,
        method: "GET",
      }),
    }),

    //post message
    createChat: builder.mutation({
      query: (body: { userId: string }) => ({
        url: "api/v1/chat/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["msgUser"],
    }),

    //post message
    msgGroupCreate: builder.mutation({
      query: (body: any) => ({
        url: "api/v1/group/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["grpUser"],
    }),
    //post message
    deleteChat: builder.mutation({
      query: (id: string) => ({
        url: `api/v1/chat/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["msgUser", "grpUser"],
    }),

    //post message
    AddGroupMember: builder.mutation({
      query: (body: any) => ({
        url: "api/v1/group/add-to",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["grpUser"],
    }),
    //latest student
    latestStudent: builder.query({
      query: () => ({
        url: `api/v1/users?roles=student&sort=-createdAt`,
        method: "GET",
      }),
    }),
    //review create
    reviewCreate: builder.mutation({
      query: (body: any) => ({
        url: "api/v1/reviews",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["review"],
    }),
    //review all published
    getAllReviewPublish: builder.query({
      query: (id: any) => ({
        url: `api/v1/reviews?course=${id}&isPublished=true`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    //review all unpublished
    getAllReviewUnPublish: builder.query({
      query: () => ({
        url: "api/v1/reviews?isPublished=false",
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    //review update
    UpdateReview: builder.mutation({
      query: ({ id, isPublished }: { id: string; isPublished: boolean }) => ({
        url: `api/v1/reviews/${id}`,
        method: "PATCH",
        body: { isPublished: isPublished },
      }),
      invalidatesTags: ["review"],
    }),
    //review update
    DeleteReview: builder.mutation({
      query: (body: any) => ({
        url: `api/v1/reviews/${body.id}`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["review"],
    }),
    //get all assignment in instructor
    getAllCreatedAssignments: builder.query({
      query: () => ({
        url: `api/v1/assignment/all-assignments`,
        method: "GET",
      }),
      providesTags: ["assignment"],
    }),
    //get single assignment in instructor
    singleAssignment: builder.query({
      query: (id: any) => ({
        url: `api/v1/assignments/${id}`,
        method: "GET",
      }),
      providesTags: ["assignment"],
    }),
    //get all quiz in instructor
    AllQuizInstructor: builder.query({
      query: (id: any) => ({
        url: `/api/v1/quiz/getQuiz/mine`,
        method: "GET",
      }),
      providesTags: ["quiz"],
    }),
    //delete quiz
    DeleteQuiz: builder.mutation({
      query: (id: any) => ({
        url: `api/v1/quiz/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quiz"],
    }),
    //create page
    createPage: builder.mutation({
      query: (body: { title: string; description: string }) => ({
        url: "/api/v1/pages",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [],
    }),
    //get all page
    getAllPage: builder.query({
      query: (id: any) => ({
        url: `/api/v1/pages`,
        method: "GET",
      }),
      providesTags: ["page"],
    }),
    //get all published Review
    getAllPublishedReview: builder.query({
      query: () => ({
        url: `api/v1/reviews?isPublished=true`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    //get all submit quiz in instructor
    getAllSubmitQuizInstructor: builder.query({
      query: (id: string) => ({
        url: `api/v1/subQuizzes?instructors=${id}`,
        method: "GET",
      }),
      providesTags: [],
    }),
    //get all submit assignment in instructor
    getAllSubmitAssignmentInstructor: builder.query({
      query: (id: string) => ({
        url: `api/v1/subAssignments?instructors=${id}`,
        method: "GET",
      }),
      providesTags: [],
    }),
    //get one submit assignment in
    getOneSubmitAssignmentInstructor: builder.query({
      query: (id: any) => ({
        url: `api/v1/subAssignments/${id}`,
        method: "GET",
      }),
      providesTags: [],
    }),
    //    submitAssignmentUdpate:update
    submitAssignmentUdpate: builder.mutation({
      query: ({
        mark,
        grade,
        comment,
        id,
      }: {
        mark: string;
        grade: string;
        comment: string;
        id: any;
      }) => ({
        url: `api/v1/subAssignments/${id}`,
        method: "PATCH",
        body: { mark: mark, grade: grade, comment: comment },
      }),
      invalidatesTags: [],
    }),
    //get all quiz mark of an single student
    getAllSubmittedQuizOfAnStudent: builder.query({
      query: (id: any) => ({
        url: `/api/v1/subQuizzes?student=${id}`,
        method: "GET",
      }),
      providesTags: ["quiz"],
    }),
    //create an announcement
    createAnAnnouncement: builder.mutation({
      query: (body: { title: string; description: string }) => ({
        url: `/api/v1/announcements`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["announcement"],
    }),
    //get all announcement
    GetAllAnnouncement: builder.query({
      query: () => ({
        url: `/api/v1/announcements`,
        method: "GET",
      }),
      providesTags: ["announcement"],
    }),
    //delete one announcement
    deleteOneAnnouncement: builder.mutation({
      query: (id: string) => ({
        url: `/api/v1/announcements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["announcement"],
    }),
    //get all enrollment of an instructor
    GetAllEnrollmentInstructor: builder.query({
      query: (id: any) => ({
        url: `/api/v1/enrollments?instructors=${id}`,
        method: "GET",
      }),
      providesTags: [],
    }),
    // UPDATE A assginment BY ID
    updateAssignement: builder.mutation({
      query: (body: any) => {
        console.log(body);
        return {
          url: `/api/v1/assignments/${body.id}`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["assignment"],
    }),
    //delete one assignment by id
    deleteAssignment: builder.mutation({
      query: (body: any) => ({
        url: `/api/v1/assignments/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["assignment"],
    }),
    //get one page
    getOnePage: builder.query({
      query: (id: any) => ({
        url: `/api/v1/pages/${id}`,
        method: "GET",
      }),
      providesTags: ["page"],
    }),
    //get one submit quiz
    getOneSubQuiz: builder.query({
      query: (id: any) => ({
        url: `/api/v1/subQuizzes/${id}`,
        method: "GET",
      }),
      providesTags: [],
    }),
    getAllPopularCourse: builder.query({
      query: () => ({
        url: "/api/v1/courses?sort=-totalEnroll&limit=5",
        method: "GET",
      }),
      providesTags: ["popularCourses"],
    }),
    getAllInstructorPage: builder.query({
      query: () => ({
        url: "/api/v1/pages/getPage/mine",
        method: "GET",
      }),
      providesTags: ["page"],
    }),
    //delete one page by id
    deletePage: builder.mutation({
      query: (body: any) => ({
        url: `/api/v1/pages/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["page"],
    }),
    //    update page:update
    updatePage: builder.mutation({
      query: ({
        title,
        description,
        id,
      }: {
        title: string;
        description: string;
        id: any;
      }) => ({
        url: `api/v1/pages/${id}`,
        method: "PATCH",
        body: { title: title, description: description },
      }),
      invalidatesTags: ["page"],
    }),
    // mentoring request
    createMentoring: builder.mutation({
      query: (body: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        interest: string;
        currentJob: string;
        message: string;
      }) => ({
        url: `/api/v1/mentorings`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["mentoring"],
    }),
    //create Optimization
    createOptimization: builder.mutation({
      query: (body: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        interest: string;
        currentJob: string;
        message: string;
      }) => ({
        url: `/api/v1/optimizes`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["optimization"],
    }),
    //delete one optimization

    getAllMentorings: builder.query({
      query: () => ({
        url: "/api/v1/mentorings",
        method: "GET",
      }),
      providesTags: ["mentoring"],
    }),
    getAllOptimizes: builder.query({
      query: () => ({
        url: "/api/v1/optimizes",
        method: "GET",
      }),
      providesTags: ["optimization"],
    }),
    getAllInstructorCourse: builder.query({
      query: () => ({
        url: "/api/v1/courses/getMyCourses",
        method: "GET",
      }),
      providesTags: ["courses"],
    }),
    //create an file
    createFile: builder.mutation({
      query: (body: { file: string; key: string }) => ({
        url: `/api/v1/files`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["allfile"],
    }),
    getInstructorFile: builder.query({
      query: (id: any) => ({
        url: `/api/v1/files?createdBy=${id}`,
        method: "GET",
      }),
      providesTags: ["allfile"],
    }),
    allfiles: builder.query({
      query: (id: any) => ({
        url: `/api/v1/files`,
        method: "GET",
      }),
      providesTags: ["allfile"],
    }),
    //send contract us page
    sendContact: builder.mutation({
      query: (body: any) => ({
        url: "/api/v1/uploads/send",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [],
    }),
    getStudentSubAssignment: builder.query({
      query: (id: any) => ({
        url: `/api/v1/subAssignments?student=${id}`,
        method: "GET",
      }),
      providesTags: [],
    }),
    //delete one file by id
    deleteByFile: builder.mutation({
      query: (body: any) => ({
        url: `/api/v1/files/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allfile"],
    }),
    //get one mentoring
    getOneMentoring: builder.query({
      query: (id: string) => ({
        url: `/api/v1/mentorings/${id}`,
        method: "GET",
      }),
      providesTags: ["mentoring"],
    }),
    //get one mentoring
    getOneOptimization: builder.query({
      query: (id: string) => ({
        url: `/api/v1/optimizes/${id}`,
        method: "GET",
      }),
      providesTags: ["optimization"],
    }),
    //delete one mentoring
    deleteOneMentoring: builder.mutation({
      query: (id: string) => ({
        url: `/api/v1/mentorings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["mentoring"],
    }),
    deleteOneOptimization: builder.mutation({
      query: (id: string) => ({
        url: `/api/v1/optimizes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["optimization"],
    }),
    updateOneMetoring: builder.mutation({
      query: ({
        id,
        interest,
        createdAt,
        firstName,
        email,
      }: {
        id: string;
        interest: string;
        createdAt: string;
        firstName: string;
        email: string;
      }) => ({
        url: `/api/v1/mentorings/${id}`,
        method: "PATCH",
        body: {
          id,
          interest,
          createdAt,
          firstName,
          email,
        },
      }),
      invalidatesTags: ["mentoring"],
    }),
    // GET ALL enroll
    allEnrollment: builder.query({
      query: (body: any) => ({
        url: `/api/v1/enrollments`,
      }),
    }),
    //meet create live class
    meetCreate: builder.mutation({
      query: (body: { topic: string; link: string }) => ({
        url: "/api/v1/meets",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["liveclass"],
    }),
    // GET ALL meet
    allMeet: builder.query({
      query: (body: any) => ({
        url: `/api/v1/meets`,
      }),
      providesTags: ["liveclass"],
    }),
    // GET ALL meet
    submitassignmentBystudentBycourse: builder.query({
      query: (body: any) => ({
        url: `/api/v1/subAssignments?student=${body.student}&course=${body.course}`,
      }),
      providesTags: [],
    }),
    // GET ALL meet
    submitquizBystudentBycourse: builder.query({
      query: (body: any) => ({
        url: `/api/v1/subQuizzes?student=${body.student}&course=${body.course}`,
      }),
      providesTags: [],
    }),
    GetAllAcademicSemesters: builder.query({
      query: (body: any) => ({
        url: `/api/v1/academic-semesters/`,
      }),
      providesTags: [],
    }),
    //create academic Semester
    addAcademicSemester: builder.mutation({
      query: (body: any) => ({
        url: "/api/v1/academic-semesters/create-academic-semester",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["semester"],
    }),
    getAllSemesters: builder.query({
      query: () => ({ url: "/api/v1/academic-semesters" }),
      providesTags: [],
    }),
    //create academic Semester
    addAcademicDepartment: builder.mutation({
      query: (body: any) => ({
        url: "/api/v1/academic-departments/create-academic-department",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["academicDepartment"],
    }),
    //get all academic department
    getAllAcademicDepartments: builder.query({
      query: () => ({ url: "/api/v1/academic-departments" }),
      providesTags: [],
    }),
    getAllAdmins: builder.query({
      query: () => ({ url: "/api/v1/admins" }),
      providesTags: [],
    }),
    getAllAcademicFaculties: builder.query({
      query: () => ({ url: "/api/v1/academic-faculties" }),
      providesTags: [],
    }),
    getAllFaculties: builder.query({
      query: () => ({ url: "/api/v1/faculties" }),
      providesTags: [],
    }),
    assignAdmin: builder.mutation({
      query: ({ id, body }: { id: string; body: any }) => ({
        url: `/api/v1/admins/assignDepartment/${id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [],
    }),
    assignAFacultytoAcademicFaculty: builder.mutation({
      query: ({ id, body }: { id: string; body: any }) => ({
        url: `/api/v1/academic-faculties/assign-faculty/${id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [],
    }),
    addAcademicFaculty: builder.mutation({
      query: (body: any) => ({
        url: `api/v1/academic-faculties/create-academic-faculty`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useGetPopularCourseQuery,
  useSubmitquizBystudentBycourseQuery,
  useSubmitassignmentBystudentBycourseQuery,
  useAllMeetQuery,
  useMeetCreateMutation,
  useAllEnrollmentQuery,
  useDeleteByFileMutation,
  useGetStudentSubAssignmentQuery,
  useGetOneOptimizationQuery,
  useSendContactMutation,
  useAllfilesQuery,
  useGetInstructorFileQuery,
  useGetAllInstructorCourseQuery,
  useCreateFileMutation,
  useGetAllInstructorPageQuery,
  useUpdatePageMutation,
  useDeletePageMutation,
  useGetOneSubQuizQuery,
  useGetOnePageQuery,
  useDeleteAssignmentMutation,
  useGetAllEnrollmentInstructorQuery,
  useUpdateAssignementMutation,
  useGetAllSubmitAssignmentInstructorQuery,
  useGetOneSubmitAssignmentInstructorQuery,
  useGetAllSubmitQuizInstructorQuery,
  useSubmitAssignmentUdpateMutation,
  useGetAllPageQuery,
  useCreatePageMutation,
  useUpdateModulePageMutation,
  useDeleteQuizMutation,

  useUpdateReviewMutation,
  useAllQuizInstructorQuery,
  useSingleAssignmentQuery,
  useGetAllReviewUnPublishQuery,
  useDeleteReviewMutation,
  useGetAllReviewPublishQuery,
  useReviewCreateMutation,
  useLatestStudentQuery,
  useAddGroupMemberMutation,
  useDeleteChatMutation,
  useMsgGroupCreateMutation,
  useGetUserQuery,
  useCreateChatMutation,
  usePostMessageMutation,
  useGetMessageQuery,
  useGetMsgChatQuery,
  useGetChatGroupQuery,
  useGetChatPeopleQuery,
  useGetOneCourseQuery,
  useGetAllUsersQuery,
  useGetSingleCourseQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetAllInstructorsQuery,
  useGetAllCourseQuery,
  useGetAllActiveCourseQuery,
  useDeleteCourseMutation,
  useAcceptCourseMutation,
  useUpdateCourseStatusMutation,
  useGetCategoriesQuery,
  useDeleteCourseCategoriesMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllStudentsQuery,
  useCreateCourseMutation,
  useGetAllAdmissionRequestQuery,
  useAcceptStudentAdmissionRequestMutation,
  useCreateQuizMutation,
  useGetAllCourseRequestQuery,
  useCreateAssignmentMutation,
  useCreateModuleCourseMutation,
  useGetCourseModuleQuery,
  useGetAllAssignmentsofAInstructorQuery,
  useUpdateModuleMutation,
  useUpdateVideoModuleMutation,
  useGetQuizQuery,
  useUpdateModuleQuizMutation,
  useCreateSlideMutation,
  useEnrollMutation,
  useUpdateCourseMutation,
  useGetMyEnrollmentAllQuery,
  useGetEnrollmentQuery,
  useCreateQuestionCourseMutation,
  useCreateFaqsMutation,
  useGetFaqsQuery,
  useGetAllLessonCourseQuery,
  useSubmitAssignmentMutation,
  useCreateQuizQuestionMutation,
  useGetAllSubmitAssignmentQuery,
  useGetOneSubmitAssignmentQuery,
  useGetOneQuizQuery,
  useSubmitQuizMutation,
  useUpdateModuleNameMutation,
  useDeleteModuleMutation,
  useGetCourseByCategoryQuery,
  useSubmitCommentMutation,
  useGetCommentsQuery,
  useGetAllPublishedReviewQuery,
  useGetAllSubmittedQuizOfAnStudentQuery,
  useCreateAnAnnouncementMutation,
  useGetAllAnnouncementQuery,
  useDeleteOneAnnouncementMutation,
  useGetAllPopularCourseQuery,
  useCreateMentoringMutation,
  useCreateOptimizationMutation,
  useGetAllMentoringsQuery,
  useGetAllOptimizesQuery,
  useGetOneMentoringQuery,
  useDeleteOneOptimizationMutation,
  useDeleteOneMentoringMutation,
  useUpdateOneMetoringMutation,
  useGetAllAcademicSemestersQuery,
  useAddAcademicSemesterMutation,
  useGetAllSemestersQuery,
  useAddAcademicDepartmentMutation,
  useGetAllAcademicDepartmentsQuery,
  useGetAllAdminsQuery,
  useAssignAdminMutation,
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultiesQuery,
  useAssignAFacultytoAcademicFacultyMutation,
  useGetAllFacultiesQuery,
  useGetAllCreatedAssignmentsQuery,
} = dashboardApi;
export default dashboardApi;

enum Status {
    private = "private",
    public = "public",
    archived = "archived",
}

export const resumeData = {
    title: "Untitled document",
    status: Status.private,
    themeColor: "#7c3aed",
    currentPosition: 1,
    personalInfo: {
        firstName: "Priya",
        lastName: "Sharma",
        jobTitle: "Software Engineer",
        address: "123 Richmond Road, Bangalore 560025",
        phone: "+91-9876543210",
        email: "priya.sharma@example.com",
    },
    summary:
        "Experienced software engineer with expertise in developing robust enterprise applications. Proven track record in building scalable solutions for diverse business needs. Skilled in both frontend and backend development with a focus on microservices architecture and cloud technologies.",
    experiences: [
        {
            title: "Senior Software Engineer",
            companyName: "Infosys",
            city: "Bangalore",
            state: "Karnataka",
            startDate: "Feb 2022",
            endDate: "",
            currentlyWorking: true,
            workSummary: `
            <ul>
            <li>Led development of microservices-based applications using Spring Boot and React.</li>
            <li>Collaborated with global teams across different time zones to deliver enterprise solutions.</li>
            <li>Improved application performance by 40% through optimization techniques.</li>
            <li>Mentored junior developers and conducted knowledge sharing sessions.</li>
            </ul>
            `,
        },
        {
            id: 2,
            title: "Software Developer",
            companyName: "Tata Consultancy Services",
            city: "Hyderabad",
            state: "Telangana",
            startDate: "Aug 2019",
            endDate: "Jan 2022",
            currentlyWorking: false,
            workSummary:
                "• Developed and maintained large-scale web applications using React and Node.js.\n" +
                "• Implemented responsive designs following Material UI guidelines.\n" +
                "• Worked with cross-functional teams to integrate payment gateway solutions.\n" +
                "• Participated in Agile ceremonies and sprint planning sessions.",
        },
    ],
    educations: [
        {
            universityName: "Indian Institute of Technology, Delhi",
            startDate: "Jul 2017",
            endDate: "May 2019",
            degree: "Master's",
            major: "Computer Science",
            description:
                "Specialized in Data Science and Machine Learning with focus on real-world applications. Completed thesis on distributed systems optimization.",
        },
        {
            universityName: "National Institute of Technology, Trichy",
            startDate: "Jul 2013",
            endDate: "May 2017",
            degree: "Bachelor's",
            major: "Computer Science and Engineering",
            description:
                "Completed core computer science courses with distinction. Active member of coding club and technical symposium organizing committee.",
        },
    ],
    skills: [
        {
            name: "React",
            rating: 5,
        },
        {
            name: "Spring Boot",
            rating: 4,
        },
        {
            id: 3,
            name: "TypeScript",
            rating: 4,
        },
        {
            id: 4,
            name: "Java",
            rating: 5,
        },
        {
            id: 5,
            name: "Microservices",
            rating: 3,
        },
    ],
};
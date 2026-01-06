import NavBar from "../components/Navbar";
import Table from "../components/Tables";
export default function User(){
    const tablename = ["Username", "Fullname", "Email", "Role"];
    const tabledata = [
        {
            Username: "johnDoe123",
            Fullname: "John Doe",
            Email: "johndoe@example.com",
            Role: "Admin"
        },
        {
            Username: "janeSmith456",
            Fullname: "Jane Smith",
            Email: "janesmith@example.com",
            Role: "Editor"
        },
        {
            Username: "markBrown789",
            Fullname: "Mark Brown",
            Email: "markbrown@example.com",
            Role: "Viewer"
        },
        {
            Username: "lisaWhite101",
            Fullname: "Lisa White",
            Email: "lisawhite@example.com",
            Role: "Editor"
        }
    ];

    return(
        <div className="h-screen w-screen bg-gray-100 flex">
            <NavBar />
            <div className="flex-1 p-10 md:p-20">
                <h3 className="font-bold text-4xl font-[Open_Sans]">Users</h3>
                <hr className="font-bold mt-2" />
                <div className="overflow-x-auto w-full mb-10 h-[70vh] bg-white rounded-lg shadow-md mt-10">
                    <Table tablename={tablename} tabledata={tabledata} isEventTable={false}/>
                </div>
            </div>
        </div>
    )
}
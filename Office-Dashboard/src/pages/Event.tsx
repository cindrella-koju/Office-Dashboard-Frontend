import NavBar from "../components/Navbar";
import Table from "../components/Tables";

export default function EventPage() {
    const tablename = ["Name", "Status", "Duration"]
    const tabledata = [
        {
            "Name" : "Table Tennis",
            "Discription" : "lordsfsd ks dfsdk fks df ksbfbskd fsk d",
            "Status" : "Completed",
            "StartDate" : "2026-01-11",
            "EndDate" : "2026-01-22",
            "Winner" : "dfdsfsfd",
            "Participants" : ["sdsd","Sds","Sdsdsd"]

        },
        {
            "Name" : "Table Tennis",
            "Discription" : "lordsfsd ks dfsdk fks df ksbfbskd fsk d",
            "Status" : "Completed",
            "StartDate" : "2026-01-11",
            "EndDate" : "2026-01-22",
            "Winner" : "dfdsfsfd",
            "Participants" : ["sdsd","Sds","Sdsdsd"]

        },
        {
            "Name" : "Table Tennis",
            "Discription" : "lordsfsd ks dfsdk fks df ksbfbskd fsk d",
            "Status" : "Completed",
            "StartDate" : "2026-01-11",
            "EndDate" : "2026-01-22",
            "Winner" : "dfdsfsfd",
            "Participants" : ["sdsd","Sds","Sdsdsd"]

        },
        {
            "Name" : "Table Tennis",
            "Discription" : "lordsfsd ks dfsdk fks df ksbfbskd fsk d",
            "Status" : "Completed",
            "StartDate" : "2026-01-11",
            "EndDate" : "2026-01-22",
            "Winner" : "dfdsfsfd",
            "Participants" : ["sdsd","Sds","Sdsdsd"]

        },
    ]
    return (
    <div className="h-screen w-screen bg-gray-100 flex">
      <NavBar />

      <div className="flex-1 p-10 md:p-20 overflow-auto">
        <h3 className="font-bold text-4xl font-[Open_Sans]">All Events</h3>
        <hr className="border-gray-400 mt-2 mb-10" />

        <div className="overflow-x-auto w-full mb-10 h-[70vh] bg-white rounded-lg shadow-md">
            <Table tablename={tablename} tabledata={tabledata} isEventTable={true}/>
        </div>

      </div>
    </div>
  );
}
